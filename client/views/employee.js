const choo = require('choo')

const menu = require('./menu')

const form = (params, state, send) => {
  const onSubmit = event => {
    event.preventDefault()
    send('exportPDF', { selector: "payroll-page" })
  }
  return choo.view`
    <section id="payroll-page" class="page">
      <header>
        <h1>View Employee</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
          <div class="cd-single-point">
            <div class="circle"> <a href="/employees"> <span class="close thick"></a> </span> </div>
          </div>
        </div>
      </header>
      <main>
        <form id="payroll" onsubmit=${onSubmit}>
          <fieldset class="this-page-only">
            <legend>Employee Details </legend>
            ${Object.keys(state.employee)
              .filter(k => k !== 'assessment' && k !== '_id' && k !== 'leave')
              .map(key => choo.view`
                <dl class="table">
                    <dt class="cell label"> <label for="${key}">${key.toUpperCase()}</label> </dt>
                    <dd class="cell input"> ${state.employee[key]}  </dd>
                </dl>
              `)}
          </fieldset>
          ${state.employee.assessment ? (choo.view`
            <fieldset class="this-page-only">
              <legend>Last Assessment</legend>
              ${Object.keys(state.employee.assessment).map(key => {
                return choo.view`
                  <dl class="table">
                      <dt class="cell label"> <label for="${key}">${key.toUpperCase()}</label> </dt>
                      <dd class="cell input"> ${state.employee.assessment[key]}  </dd>
                  </dl>
                `
              })}
            </fieldset>
          `) : (undefined)}
          ${state.employee.leave ? (choo.view`
            <fieldset class="this-page-only">
              <legend>Last Leave</legend>
              ${Object.keys(state.employee.leave).map(key => {
                return choo.view`
                  <dl class="table">
                      <dt class="cell label"> <label for="${key}">${key.toUpperCase()}</label> </dt>
                      <dd class="cell input"> ${state.employee.leave[key]}  </dd>
                  </dl>
                `
              })}
            </fieldset>
          `) : (undefined)}
          <input class='animated mt' type='submit' value='Download'>
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
