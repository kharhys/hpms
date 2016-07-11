const choo = require('choo')

const menu = require('./menu')

const form = (params, state, send) => {
  console.log('state.payslip', state.payslip)
  const onSubmit = event => {
    event.preventDefault()
    send('exportPDF', { selector: "payroll-page" })
  }
  return choo.view`
    <section id="payroll-page" class="page">
      <header>
        <h1>View Payslip</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
        </div>
      </header>
      <main>
        <form id="payroll" onsubmit=${onSubmit}>
          <fieldset class="this-page-only">
            <legend>Payslip Details </legend>
            ${Object.keys(state.payslip).map(key => {
              return choo.view`
                <dl class="table">
                    <dt class="cell label"> <label for="${key}">${key.toUpperCase()}</label> </dt>
                    <dd class="cell input"> ${state.payslip[key]}  </dd>
                </dl>
              `
            })}
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
