import React, {useState} from 'react'
import Login from './Login'
import Signup from './Signup'

export default function MainForm() {
  const [mode, setMode] = useState(0)
  const signup = () => setMode(0)
  const login = () => setMode(1)

  return (
    <div>
      {mode == 0 ?(
      <form>
      <h1>Signup</h1>
      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label for="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">This is your unique identifier across the platform.</div>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">Stay logged in</label>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="news" />
        <label className="form-check-label" for="news">Allow us to send news to your email</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={login}>Log in</button>
    </form>
      ):(
    <form>
      <h1>Login</h1>
      <div className="mb-3">
        <label for="username" className="form-label">Username</label>
        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">Stay logged in</label>
      </div>
      <div class="grid gap-0 column-gap-3">

      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={signup}>Sign up</button>
      </div>        
    </form>
      
  )}
    </div>
  )
}