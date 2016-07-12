const choo = require('choo')

const menu = require('./menu')

const page = (params, state, send) => {

  const onSubmit = e => {
    e.preventDefault()
    let formdata = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }
    send('login', { data: formdata })
  }

  const showErrors = () => {
    //console.log(state.auth.error)
    if(state.auth.error && state.auth.error.code == 411) {
      return choo.view`
       <div class="app-title">
         <h1>Can't Login</h1>
       </div>
     `
    }
  }

  return choo.view`
    <article id="panels">
      <div class="container">
        <div class="login">
          <div class="login-screen">
            <div class="app-title">
              <h3>Help</h3>
              <p>
                Follow the instructions bellow:
                <ol>
                  <li> Login to the system </li>
                  <li> Click Plus Button on the Employees page to add an Employee</li>
                  <li> Click Plus Button on the Grades page to add an Grade</li>
                  <li> Go to process payroll and enter a valid Employee ID to load up employee details </li>
                  <li> Click Submit to generate payslip which you can download for printing </li>
                  <li> To issue employee leave, enter a valid Employee ID in the form on Leave Management page </li>
                  <li> To assess an employee's daily work duration, use the page under Assess link with the employee ID</li>
                  <li> The payslip, Employee Leave Report can both  be printed</li>
                  <li> Make sure to Log out!</li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  `
}

module.exports = (params, state, send) => choo.view`
  <div>
    ${menu(params, state, send)}
    ${page(params, state, send)}
  </div>
`
