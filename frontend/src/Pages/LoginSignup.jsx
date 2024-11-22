import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login");

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-field">
          {state==="Sign Up"?<input type="text" placeholder="Your Name" />:<></>}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login Here!</span></p>:<p className="loginsignup-login">Create an account? <span onClick={() => {setState("Sign Up")}}>Sign Up Here!</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
