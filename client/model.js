const xtend = require('xtend')
const http = require('choo/http')
const io = require('socket.io-client')
const hooks = require('feathers-hooks')
const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')
const authentication = require('feathers-authentication/client')

const socket = io('http://localhost:3030')

const app = feathers()
    .configure(hooks())
    .configure(socketio(socket))
    .configure(authentication({ storage: window.localStorage }))

//console.log('window.jsPDF', window.jsPDF)

const exportPDF = data => {
  const doc = new jsPDF()
  const node = document.getElementById(data.selector)

  doc.fromHTML(node, 20, 20, {
    'width': 500
  })
  doc.save(`payslip-${Date.now()}.pdf`)
}


const login = (action, state, send) => {
  app.authenticate(Object.assign(action.data, { type: 'local' }))
    .then(result => {
      console.log('Authenticated: ', result)
      send('setAuth', { data: { user: result.data, token: result.token } })
      send('app:location', { location: '/employees' })
    })
    .catch(result => console.log('Error Authenticating: ', result))
}

const employeeService = app.service('employees')
const paygradeService = app.service('paygrades')

const employeeSubscription = send => {
  employeeService.find()
    .then(res => send('loadEmployees', { data: res.data }) )
  employeeService.on('created', message => {
    console.log('employee added', message)
    send('addEmployee', { data: message })
    send('app:location', { location: '/employees' })
  })
}

const paygradeSubscription = send => {
  paygradeService.find()
    .then(res => send('loadPaygrades', { data: res.data }) )
  paygradeService.on('created', message => {
    console.log('paygrade added', message)
    send('addPaygrade', { data: message })
    send('app:location', { location: '/paygrades' })
  })
}

const fetchEmployee = (action, state, send) => {
  employeeService.find({ query: { eid: action.data } })
    .then(res => {
      if(res.total ==  0) send('reportError', { data: "Employee Not Found!" })
      else {
        const salary = res.data[0].salary
        const ceil = Math.ceil(salary / 10000)
        const floor = Math.floor(salary / 10000)
        const max = (ceil == floor) ? salary : (ceil * 10000)
        paygradeService.find({ query: { max: max } })
          .then(resp => {
            if(res.total == 0) send('reportError', { data: "Paygrade Not Found!"})
            else send('setEmployee', { data:  Object.assign({}, res.data[0], resp.data[0]) })
          })
      }
    })
}

const removeEmployee = (action, state, send) => {
  employeeService.remove(action.data )
    .then(res => {
      //console.log('removed employee: ', res)
      send('spliceEmployee', { data: action.data })
      send('app:location', { location: '/' })
    })
}


module.exports = {
  state: {
    auth: {},
    form: {},
    payslip: {},
    employee: {},
    employees: [],
    paygrades: [],
    error: undefined,
  },
  subscriptions: [ employeeSubscription, paygradeSubscription ],
  effects: {
    login: login,
    exportPDF: exportPDF,
    findEmployee: fetchEmployee,
    removeEmployee: removeEmployee,
    createEmployee: (action, state, send) => employeeService.create(action.data),
    createPaygrade: (action, state, send) => paygradeService.create(action.data)
  },
  reducers: {
    authError: (action, state) => Object.assign(state, { auth: { error: action.data  } }),
    formError: (action, state) => Object.assign(state, { form: { errors: action.data.errors, data: action.data.formdata } }),
    setAuth: (action, state) => Object.assign(state, { auth: action.data }),
    loadEmployees: (action, state) => Object.assign(state, { employees: action.data  }),
    addEmployee: (action, state) => Object.assign(state, { employees: state.employees.concat([action.data]) }),
    loadPaygrades: (action, state) => Object.assign(state, { paygrades: action.data  }),
    addPaygrade: (action, state) => Object.assign(state, { paygrades: state.paygrades.concat([action.data]) }),
    setEmployee: (action, state) => Object.assign(state, { employee: action.data  }),
    reportError: (action, state) => Object.assign(state, { error: action.data  }),
    cachePayslip: (action, state) => Object.assign(state, { payslip: action.data  }),
    spliceEmployee: (action, state) => Object.assign(state, { employees: state.employees.filter(it => it._id !== action.data ) })
  },
}
