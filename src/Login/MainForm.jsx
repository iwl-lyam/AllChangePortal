import React, {useState} from 'react'
import Login from './Login'
import Signup from './Signup'

export default function MainForm() {
  const [mode, setMode] = useState(0)
  const signup = () => setMode(0)
  const login = () => setMode(1)

  return (
    <div>
      {mode == 0 ?<Signup />:<Login />}
      <button type="button" className="btn btn-primary" onClick={signup}>Sign up</button>  
      <button type="button" className="btn btn-secondary" onClick={login}>Log in</button>
    </div>
  )
}