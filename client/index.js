const choo = require('choo')
const sf = require('sheetify')

sf('./index.css', { global: true })

const app = choo()

app.model(require('./model'))

app.router((route) => [
  route('/payrolls', require('./views/payroll')),
  route('/', require('./views/employees')),
  route('/payslip', require('./views/payslip')),
  route('/paygrades', require('./views/paygrades')),
  route('/addpaygrade', require('./views/paygrades/add')),
  route('/addemployee', require('./views/employees/add')),
])

const tree = app.start();

document.body.appendChild(tree);
