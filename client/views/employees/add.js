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
    console.log(formdata)
    let errors = []
    Object.keys(formdata).map(key => {
      if (formdata[key] == "") { errors.push({ field: key, message: `${document.getElementById(`${key}`).placeholder} is required`})  }
    })
    console.log(errors.length)
    if (errors.length > 0)
      send('formError', { data: { formdata: formdata, errors: errors } })
    else
      //console.log(errors)
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

  console.log('state change >> rerendering...', state)
  return choo.view`
    <section id="panel-1" class="page">
      <header>
        <h1>New Employee</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
          <div class="cd-single-point">
            <div class="circle"> <a href="/employees"> <span class="close thick"></a> </span> </div>
          </div>
        </div>
      </header>
      <main>
        <form class='login' onsubmit=${onSubmit}>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'eid').length ? 'error' : ''}
            name='eid', id='eid',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'eid').length ? state.form.errors.filter(o => o.field == 'eid')[0]['message'] : 'Employee Id'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'name').length ? 'error' : ''}
            name='name' id='name',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'name').length ? state.form.errors.filter(o => o.field == 'name')[0]['message'] : 'Employee Name'}
            type='text'>
          <div class=${state.form.errors && state.form.errors.filter(o => o.field == 'jobtype').length ? "select-style error" : "select-style"}>
            <select name='jobtype' id='jobtype' onchange=${appendInput}>
              <option value="" disabled selected>
              ${state.form.errors && state.form.errors.filter(o => o.field == 'jobtype').length ? 'Job Type is required' : 'Job Type'}
              </option>
              <option value="Salary">Salary</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'salary').length ? 'error' : ''}
            name='salary' id='salary',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'salary').length ? state.form.errors.filter(o => o.field == 'salary')[0]['message'] : 'Salary Amount'}
            type='text' style="display: none">
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'hourlyrate').length ? 'error' : ''}
            name='hourlyrate' id='hourlyrate',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'hourlyrate').length ? state.form.errors.filter(o => o.field == 'hourlyrate')[0]['message'] : 'Hourly Rate'}
            type='text' style="display: none">
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'bankaccount').length ? 'error' : ''}
            name='bankaccount' id='bankaccount',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'bankaccount').length ? state.form.errors.filter(o => o.field == 'bankaccount')[0]['message'] : 'Bank Account'}
            type='text'>
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
