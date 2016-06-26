const xtend = require('xtend')

const io = require('socket.io-client')
const hooks = require('feathers-hooks')
const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client')

const socket = io('http://localhost:3030')

const app = feathers()
    .configure(hooks())
    .configure(socketio(socket))

const employeeService = app.service('employees')
const paygradeService = app.service('paygrades')

const employeeSubscription = send => {
  employeeService.find()
    .then(res => send('loadEmployees', { data: res.data }) )
  employeeService.on('created', message => {
    console.log('employee added', message)
    send('addEmployee', { data: message })
    send('app:location', { location: '/' })
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


module.exports = {
  state: {
    payslip: {},
    employee: {},
    employees: [],
    paygrades: [],
    error: undefined,
  },
  subscriptions: [ employeeSubscription, paygradeSubscription ],
  effects: {
    findEmployee: fetchEmployee,
    createEmployee: (action, state, send) => employeeService.create(action.data),
    createPaygrade: (action, state, send) => paygradeService.create(action.data)
  },
  reducers: {
    loadEmployees: (action, state) => ({ employees: action.data  }),
    addEmployee: (action, state) => ({ employees: state.employees.concat([action.data]) }),
    loadPaygrades: (action, state) => ({ paygrades: action.data  }),
    addPaygrade: (action, state) => ({ paygrades: state.paygrades.concat([action.data]) }),
    setEmployee: (action, state) => ({ employee: action.data  }),
    reportError: (action, state) => ({ error: action.data  }),
    cachePayslip: (action, state) => ({ payslip: action.data  })
  },
}
