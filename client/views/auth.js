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
      <header>
        <a href="#" id="logo"> </a>
      </header>
      <section id="hero1" class="hero">
        <div class="inner">
          <div class="copy">
            <div class="login-screen">
              ${showErrors()}
              <div class="form_container">
                <form onsubmit=${onSubmit}>
                  <h1>Login</h1>
                  <div class="fields">
                    <div class="field half">
                      <label for="surname">User name</label>
                      <input type="email" id="email"/>
                    </div>
                    <div class="field half last">
                      <label for="name">Password</label>
                      <input type="password" id="password"/>
                    </div>
                  </div>
                  <div class="button login">
                     <button type="submit"><span>SUBMIT</span> <i class="fa fa-check"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  `
}

module.exports = (params, state, send) => choo.view`
  <div>
    ${page(params, state, send)}
  </div>
`
