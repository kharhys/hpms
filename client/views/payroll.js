const choo = require('choo')

const menu = require('./menu')


const salary = (params, state, send) =>  choo.view`
  <div>
    <div class="table">
        <div class="cell label"> <label for="grosspay">Gross Pay</label> </div>
        <div class="cell input">
          <input type="text" id="grosspay" disabled value=${(state.employee.salary ? state.employee.salary : '')} />
        </div>
    </div>
    <div class="table">
        <div class="cell label"> <label for="jobgrade">Job Grade</label> </div>
        <div class="cell input">
          <input type="text" id="jobgrade" disabled value=${(state.employee.grade ? state.employee.grade : '')} />
        </div>
    </div>
  </div>
`

const hourly = (params, state, send) =>  choo.view`
  <div>
    <div class="table">
      <div class="cell label"> <label for="hourlyrate">Hourly Rate</label> </div>
      <div class="cell input"> <input type="text" id="hourlyrate" disabled value=${Math.floor(500)} />  </div>
    </div>
    <div class="table">
        <div class="cell label"> <label for="regularhours">Regular Hours</label> </div>
        <div class="cell input"> <input type="text" id="regularhours" />  </div>
    </div>
    <div class="table">
        <div class="cell label"> <label for="overtimehours">Overtime Hours</label> </div>
        <div class="cell input"> <input type="text" id="overtimehours" />  </div>
    </div>
  </div>
`

const allowances = (params, state, send) =>  {
  if(state.employee.jobtype == 'Salary') {
    const rate = Math.floor(state.employee.allowances.split('%')[0]) / 100
    return choo.view`
      <fieldset class="this-page-only">
        <legend>Allowances</legend>
        <div class="table">
            <div class="cell label"> <label for="allowances">Allowances</label> </div>
            <div class="cell input">
              <input type="text" id="allowances"
                value=${(state.employee.allowances ? (rate * state.employee.salary) : '')} />
            </div>
        </div>
      </fieldset>
    `
  }
}

const employee = (params, state, send) => {
  if(state.employee.jobtype == 'Salary') return choo.view`${salary(params, state, send)}`
  if(state.employee.jobtype == 'Hourly') return choo.view`${hourly(params, state, send)}`
}

const deductions = (params, state, send) => {
  const deduct = type => {
    if (!state.employee[type]) return ''
    else {
      const rate = Math.floor(state.employee[type].split('%')[0])
      return (rate / 100) * state.employee.salary
    }
  }
  if(state.employee.jobtype == 'Salary') {
    return choo.view`
      <fieldset class="this-page-only">
        <legend>Deductions</legend>
        <div class="table">
            <div class="cell label"> <label for="nhif">NHIF</label> </div>
            <div class="cell input"> <input type="text" id="nhif" disabled value=${deduct('nhif')} /> </div>
        </div>
        <div class="table">
            <div class="cell label"> <label for="nssf">NSSF</label> </div>
            <div class="cell input"> <input type="text" id="nssf" disabled value=${deduct('nssf')} /> </div>
        </div>
        <div class="table">
            <div class="cell label"> <label for="paye">PAYE</label> </div>
            <div class="cell input"> <input type="text" id="paye" disabled value=${deduct('paye')} /> </div>
        </div>
      </fieldset>
    `
  }
}

const form = (params, state, send) => {

  const onSubmit = event => {
    event.preventDefault()
    let formdata = {
      enddate: document.getElementById('enddate').value,
      startdate: document.getElementById('startdate').value,
      employeeid: document.getElementById('employeeid').value
    }
    if(state.employee.jobtype =='Salary') {
      formdata = Object.assign(formdata, {
        nhif: document.getElementById('nhif').value,
        nssf: document.getElementById('nssf').value,
        paye: document.getElementById('paye').value,
        grosspay: document.getElementById('grosspay').value,
        jobgrade: document.getElementById('jobgrade').value,
        allowances: document.getElementById('allowances').value,
      })
      const netearnings = parseInt(formdata.grosspay) + parseInt(formdata.allowances)
      const netdeductions = parseInt(formdata.nhif) + parseInt(formdata.nssf) + parseInt(formdata.paye)
      const netpay = parseInt(netearnings) - parseInt(netdeductions)
      formdata = Object.assign(formdata, { netpay: netpay  })
    }
    if(state.employee.jobtype =='Hourly') {
      formdata = Object.assign(formdata, {
        hourlyrate: document.getElementById('hourlyrate').value,
        regularhours: document.getElementById('regularhours').value,
        overtimehours: document.getElementById('overtimehours').value,
      })
      const hours = parseInt(formdata.regularhours) + parseInt(formdata.overtimehours)
      const netpay = parseInt(formdata.hourlyrate) * hours
      formdata = Object.assign(formdata, {  netpay: netpay   })
    }

    console.log(formdata)
    send('cachePayslip', { data: formdata })
    send('app:location', { location: '/payslip' })
  }

  return choo.view`
    <section id="payroll-page" class="page">
      <header>
        <h1>Process Payroll</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
        </div>
      </header>
      <main>
        <form id="payroll" onsubmit=${onSubmit}>
          <fieldset class="this-page-only">
            <legend>Pay Period</legend>
            <div class="table">
                <div class="cell label"> <label for="startdate">Start Date</label> </div>
                <div class="cell input"> <input type="date" id="startdate"/>  </div>
            </div>
            <div class="table">
                <div class="cell label"> <label for="enddate">End Date</label> </div>
                <div class="cell input"> <input type="date" id="enddate"/>  </div>
            </div>
          </fieldset>
          <fieldset class="this-page-only">
            <legend>Employee</legend>
            <div class="table">
                <div class="cell label"> <label for="employeeid">Employee ID</label> </div>
                <div class="cell input">
                  <input type="text" id="employeeid" onblur=${e => send('findEmployee', { data: e.target.value })} />
                </div>
            </div>
            <div class="table">
                <div class="cell label"> <label for="employeename">Employee Name</label> </div>
                <div class="cell input">
                  <input type="text" id="employeename" disabled value=${(state.employee.name ? state.employee.name : '')} />
                </div>
            </div>
            ${employee(params, state, send)}
          </fieldset>
          ${deductions(params, state, send)}
          ${allowances(params, state, send)}
          <input class='animated mt' type='submit' value='Submit'>
        </form>
      </main>
    </section>
  `
}

const page = (params, state, send) => choo.view`
  <article id="panels">
    <div class="container">
      ${form(params, state, send)}
    </div>
  </article>
`

module.exports = (params, state, send) => choo.view`
  <div>
    ${menu(params, state, send)}
    ${page(params, state, send)}
  </div>
`
