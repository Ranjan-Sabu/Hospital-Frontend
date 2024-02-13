import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css'


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <body class='logins'>
      <div class="login-container">
          <h2>Login</h2>
          <form class="login-form" onSubmit={loginUser}>
              <input type='email' name='email' placeholder='Enter your email' required/>
              <input type='password' name='password' placeholder='Enter your password' required/>
              <input type='submit'/>
          </form>
      </div>
    </body>
  )
}

export default LoginPage