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
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'grade').length ? 'error' : ''}
            name='grade', id='grade',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'grade').length ? state.form.errors.filter(o => o.field == 'grade')[0]['message'] : 'Job Grade'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'min').length ? 'error' : ''}
            name='min' id='min',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'min').length ? state.form.errors.filter(o => o.field == 'min')[0]['message'] : 'Min Salary'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'max').length ? 'error' : ''}
             name='max' id='max',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'max').length ? state.form.errors.filter(o => o.field == 'max')[0]['message'] : 'Max Salary'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'nssf').length ? 'error' : ''}
             name='nssf' id='nssf',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'nssf').length ? state.form.errors.filter(o => o.field == 'nssf')[0]['message'] : 'NSSF Deductions'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'nhif').length ? 'error' : ''}
             name='nhif' id='nhif',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'nhif').length ? state.form.errors.filter(o => o.field == 'nhif')[0]['message'] : 'NHIF Deductions'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'paye').length ? 'error' : ''}
             name='paye' id='paye',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'paye').length ? state.form.errors.filter(o => o.field == 'paye')[0]['message'] : 'PAYE Deductions'}
            type='text'>
          <input
            class=${state.form.errors && state.form.errors.filter(o => o.field == 'allowances').length ? 'error' : ''}
             name='allowances' id='allowances',
            placeholder=${state.form.errors && state.form.errors.filter(o => o.field == 'allowances').length ? state.form.errors.filter(o => o.field == 'allowances')[0]['message'] : 'Allowances'}
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
