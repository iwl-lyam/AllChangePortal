import React, {useState} from 'react'
import {Request} from '../Util.js'

export default function MainForm() {
  const [mode, setMode] = useState(0)
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState("")
  const [pword, setPword] = useState("")
  const [news, setNews] = useState("false")

  const [msg, setMsg] = useState("")

  const signup = () => setMode(0)
  const login = () => setMode(1)

  const signUpHandle = async () => {
    let res = await Request("api/users", "POST", {
      password: pword,
      email: email,
      uname: uname,
      news: news
    }, true)

    if (res.code) {
      setMsg(res.msg)
    } else {
      login()
      setMsg("")
    }
  }

  const loginHandle = async () => {
    let res = await Request("api/users/login", "POST", {
      password: pword,
      email: email,
      uname: uname,
      news: news
    }, true)

    if (res.code) {
      setMsg(res.msg)
    } else {
      setMsg("")
      localStorage.token = res.token
      window.location.reload()
    }

  }

  return (
    <div>
      {mode === 0 ? (
          <div>
      <h1>Signup</h1>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" id="email"
               aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" onChange={e => setUname(e.target.value)} className="form-control" id="username"
               aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">This is your unique identifier across the platform.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" onChange={e => setPword(e.target.value)} className="form-control"
               id="exampleInputPassword1"/>
      </div>
      <div className="mb-3 form-check">
        <input onChange={e => setNews(e.target.value)} type="checkbox" className="form-check-input" id="news"/>
        <label className="form-check-label" htmlFor="news">Allow us to send news to your email</label>
      </div>
            <button type="button" className="btn btn-primary" onClick={signUpHandle}>Submit</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={login}>Log in</button>
            <p>{msg}</p>
          </div>
      ) : (
          <div>
      <h1>Login</h1>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" onChange={e => setUname(e.target.value)} className="form-control" id="username"
               aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" onChange={e => setPword(e.target.value)} className="form-control"
               id="exampleInputPassword1"/>
      </div>

      <div className="grid gap-0 column-gap-3">

        <button type="button" className="btn btn-primary" onClick={loginHandle}>Submit</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={signup}>Sign up</button>
      </div>
            <p>{msg}</p>

          </div>
  )}
    </div>
  )
}