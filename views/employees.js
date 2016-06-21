const choo = require('choo')

module.exports = (params, state, send) => choo.view`
  <section id="panel-1">
    <main>
      <div class='login'>
        <h2>Register</h2>
        <input name='username' placeholder='Username' type='text'>
        <input id='pw' name='password' placeholder='Password' type='password'>
        <input name='email' placeholder='E-Mail Address' type='text'>
        <div class='agree'>
          <input id='agree' name='agree' type='checkbox'>
          <label for='agree'></label>Accept rules and conditions
        </div>
        <input class='animated' type='submit' value='Register'>
        <a class='forgot' href='#'>Already have an account?</a>
      </div>
    </main>
  </section>
`
