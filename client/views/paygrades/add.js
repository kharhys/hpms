const choo = require('choo')

const menu = require('../menu')

const form = (params, state, send) => {

  const onSubmit = event => {
    event.preventDefault()
    const formdata = {
      min: document.getElementById('min').value,
      max: document.getElementById('max').value,
      paye: document.getElementById('paye').value,
      nssf: document.getElementById('nssf').value,
      nhif: document.getElementById('nhif').value,
      grade: document.getElementById('grade').value,
      allowances: document.getElementById('allowances').value
    }
    send('createPaygrade', { data: formdata })
  }

  return choo.view`
    <section id="panel-1" class="page">
      <header>
        <h1>New Pay Grade</h1>
        <div class="btn-multi">
          <input type="checkbox" id="multi-btn" name="multi-btn" />
          <div class="cd-single-point">
            <div class="circle"> <a href="/paygrades"> <span class="close thick"></a> </span> </div>
          </div>
        </div>
      </header>
      <main>
        <form class='login' onsubmit=${onSubmit}>
          <input name='grade', id='grade', placeholder='Job Grade' type='text'>
          <input name='min' id='min', placeholder='Min Salary' type='text'>
          <input name='max' id='max', placeholder='Max Salary' type='text'>
          <input name='nssf' id='nssf', placeholder='NSSF Deductions' type='text'>
          <input name='nhif' id='nhif', placeholder='NHIF Deductions' type='text'>
          <input name='paye' id='paye', placeholder='PAYE Deductions' type='text'>
          <input name='allowances' id='allowances', placeholder='Allowances' type='text'>
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
