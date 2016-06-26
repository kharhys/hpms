const choo = require('choo')

const menu = require('../menu')

const form = (params, state, send) => {

  const onSubmit = event => {
    event.preventDefault()
    const formdata = {
      eid: document.getElementById('eid').value,
      name: document.getElementById('name').value,
      salary: document.getElementById('salary').value,
      jobtype: document.getElementById('jobtype').value,
      bankaccount: document.getElementById('bankaccount').value
    }
    send('createEmployee', { data: formdata })
  }

  return choo.view`
    <section id="panel-1" class="page">
      <header>
        <h1>New Employee</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
          <div class="cd-single-point">
            <div class="circle"> <a href="/"> <span class="close thick"></a> </span> </div>
          </div>
        </div>
      </header>
      <main>
        <form class='login' onsubmit=${onSubmit}>
          <input name='eid', id='eid', placeholder='Employee Id' type='text'>
          <input name='name' id='name', placeholder='Employee Name' type='text'>
          <input name='salary' id='salary', placeholder='Salary Amount' type='text'>
          <input name='jobtype' id='jobtype', placeholder='Job Type' type='text'>
          <input name='bankaccount' id='bankaccount', placeholder='Bank Account' type='text'>
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
