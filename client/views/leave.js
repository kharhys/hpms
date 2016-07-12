const choo = require('choo')

const menu = require('./menu')

const form = (params, state, send) => {
  const onSubmit = event => {
    event.preventDefault()
    let formdata = {
      workstatus: 'ON_LEAVE',
      leave: {
        enddate: document.getElementById('enddate').value,
        startdate: document.getElementById('startdate').value
      }
    }
    let data = Object.assign(formdata, state.employee)
    console.log('state :: employee ', state.employees)
    send('updateEmployee', { data: data })
  }
  return choo.view`
    <section id="payroll-page" class="page">
      <header>
        <h1>Leave Management</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
        </div>
      </header>
      <main>
        <form id="payroll" onsubmit=${onSubmit}>
          ${Object.keys(state.employee).length ? (choo.view`
            <fieldset class="this-page-only">
              <legend>Leave Period</legend>
              <div class="table">
                  <div class="cell label"> <label for="startdate">Start Date</label> </div>
                  <div class="cell input"> <input type="date" id="startdate"/>  </div>
              </div>
              <div class="table">
                  <div class="cell label"> <label for="enddate">End Date</label> </div>
                  <div class="cell input"> <input type="date" id="enddate"/>  </div>
              </div>
            </fieldset>
          `) : (undefined)}
          <fieldset class="this-page-only">
            <legend>Employee Details</legend>
            <div class="table">
                <div class="cell label">
                  <label for="allowances" style="text-transform: uppercase; font-size: 0.9em;">EMPLOYEE ID</label>
                </div>
                <div class="cell input">
                  <input type="text" id="allowances"
                    onblur=${e => send('getEmployee', { data: e.target.value })} />
                </div>
            </div>
            ${Object.keys(state.employee)
              .filter(key =>key !== 'eid' && key !== '_id' && key !== 'min' && key !== 'max')
              .map(key => choo.view`
              <div class="table">
                <div class="cell label">
                  <label for=${key} style="text-transform: uppercase; font-size: 0.9em;"> ${key} </label>
                </div>
                <div class="cell input">
                  <input type="text" disabled id=${key}
                    value=${(state.employee[key] ? state.employee[key] : '')} />
                </div>
              </div>
            `)}
          </fieldset>
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

module.exports = (params, state, send) => {
  return choo.view`
  <div>
    ${menu(params, state, send)}
    ${page(params, state, send)}
  </div>
  `
}
