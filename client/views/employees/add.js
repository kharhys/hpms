const choo = require('choo')

const menu = require('../menu')

const form = (params, state, send) => {

  const onSubmit = event => {
    event.preventDefault()
    let formdata = {
      eid: document.getElementById('eid').value,
      name: document.getElementById('name').value,
      jobtype: document.getElementById('jobtype').value,
      bankaccount: document.getElementById('bankaccount').value
    }
    if(document.getElementById('jobtype').value == 'Salary') {
      formdata = Object.assign(formdata, {
        salary: document.getElementById('salary').value
      })
    }
    if(document.getElementById('jobtype').value == 'Hourly') {
      formdata = Object.assign(formdata, {
        hourlyrate: document.getElementById('hourlyrate').value
      })
    }
    //console.log(formdata)
    send('createEmployee', { data: formdata })
  }

  const appendInput = event => {
    if(event.target.value == 'Salary') {
      document.getElementById('salary').style.display = 'block'
      document.getElementById('hourlyrate').style.display = 'none'
    }
    if(event.target.value == 'Hourly') {
      document.getElementById('salary').style.display = 'none'
      document.getElementById('hourlyrate').style.display = 'block'
    }
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
          <div class="select-style">
            <select name='jobtype' id='jobtype' onchange=${appendInput}>
              <option value="" disabled selected>Job Type</option>
              <option value="Salary">Salary</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>
          <input name='salary' id='salary', placeholder='Salary Amount' type='text' style="display: none">
          <input name='hourlyrate' id='hourlyrate', placeholder='Hourly Rate' type='text' style="display: none">
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
