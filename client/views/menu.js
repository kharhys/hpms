const choo = require('choo')

module.exports = (params, state, send) => {
  //console.log(state)
  return choo.view`
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
                  <li><a href="/employees">Employees</a></li>
                  <li><a href="/paygrades">Grades</a></li>
                  <li><a href="/payrolls">PayRoll</a></li>
                  <li><a href="/leave">Leave</a></li>
                  <li><a href="/assess">Assessment</a></li>
                  <li><a href="/help">Help</a></li>
                  <li><a href="/">Logout</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  `
}
