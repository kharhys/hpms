const choo = require('choo')
const sf = require('sheetify')

//sf('./index.css', { global: true })

const app = choo()

app.model(require('./model'))

app.router((route) => [
  route('/', require('./views/auth')),
  route('/payslip', require('./views/payslip')),
  route('/payrolls', require('./views/payroll')),
  route('/employees', require('./views/employees')),
  route('/paygrades', require('./views/paygrades')),
  route('/addpaygrade', require('./views/paygrades/add')),
  route('/addemployee', require('./views/employees/add')),
  route('/leave', require('./views/leave')),
  route('/assess', require('./views/assess')),
  route('/employee', require('./views/employee')),
  route('/help', require('./views/help')),
])

const tree = app.start();

document.body.appendChild(tree);
