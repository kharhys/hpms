const choo = require('choo')

module.exports = (params, state, send) => choo.view`
  <div id="menu">
    <header id="introduction">
      <h2>Tudor District Hospital</h2>
      <h1>Payroll Management System</h1>
    </header>
    <header>
      <div id="navigation">
        <div class="dark-color">
          <div class="light-color">
            <nav>
              <ul>
                <li><a href="#" class="active-menu">Home</a></li>
                <li><a href="/">Employees</a></li>
                <li><a href="/paygrades">Pay Grades</a></li>
                <li><a href="/payrolls">Pay Roll</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
`
