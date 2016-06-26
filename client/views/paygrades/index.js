const choo = require('choo')

const menu = require('../menu')

const datapoints = [
  "Grade", "Min",  "Max", "Allowances", "PAYE", "NHIF", "NSSF"
]

const toggleMenu = event => {
  const cn = event.target.parentNode.className
  if (cn.indexOf("open") > -1) event.target.parentNode.className = "toolbox"
  else event.target.parentNode.className = "toolbox open"
}

const closeMenu = e => e.target.parentNode.parentNode.className = "toolbox"

const employees = (params, state, send) => choo.view`
  <div id="employees-list">
    <table>
      <caption>All Records</caption>
      <thead>
        <tr>
          ${datapoints.map(key => choo.view`<th scope="col">${key}</th>`)}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        ${state.paygrades.map(item => choo.view`
          <tr class="grow">
            ${datapoints.map(k => choo.view`
              <td scope="row" data-label="${item[k.toLowerCase()]}">${item[k.toLowerCase()]}</td>
            `)}
            <td class="list-item">
              <div class="toolbox">
                <div class="context-menu-btn ellipsis-v" onclick=${toggleMenu}></div>
                <ul class="context-menu" onclick=${closeMenu}>
                  <li>Edit</li>
                  <li>View</li>
                  <li>Delete</li>
                </ul>
              </div>
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  </div>
`

const page = (params, state, send) => choo.view`
  <article id="panels">
    <div class="container">
      <section id="employees-page" class="page">
        <header>
          <h1>Pay Grades</h1>
          <div class="btn-multi">
            <input type="checkbox" id="multi-btn" name="multi-btn" />
            <div class="cd-single-point">
              <a class="cd-img-replace" href="/addpaygrade">Add Paygrade</a>
            </div>
          </div>
        </header>
        <main>	${employees(params, state, send)} </main>
      </section>
    </div>
  </article>
`

module.exports = (params, state, send) => choo.view`
  <div>
    ${menu(params, state, send)}
    ${page(params, state, send)}
  </div>
`
