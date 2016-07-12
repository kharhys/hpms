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
              <h1>Login</h1>
            </div>
            ${showErrors()}

            <form class="login-form" onsubmit=${onSubmit}>
              <div class="control-group">
              <input type="text" class="login-field" value="" placeholder="username" id="email">
              <label class="login-field-icon fui-user" for="login-name"></label>
              </div>

              <div class="control-group">
              <input type="password" class="login-field" value="" placeholder="password" id="password">
              <label class="login-field-icon fui-lock" for="login-pass"></label>
              </div>

              <button class="btn btn-primary btn-large btn-block" type="submit" >login</button>
              <a class="login-link" href="#">Lost your password?</a>
            </form>
          </div>
        </div>
      </div>
    </article>
  `
}

module.exports = (params, state, send) => choo.view`
  <div>
    ${page(params, state, send)}
  </div>
`
