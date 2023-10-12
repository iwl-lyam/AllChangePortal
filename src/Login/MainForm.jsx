import React, {useState} from 'react'

export default function MainForm() {
  const [mode, setMode] = useState(0)
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState("")
  const [pword, setPword] = useState("")
  const [stay, setStay] = useState("false")
  const [news, setNews] = useState("false")

  const [msg, setMsg] = useState("")

  const signup = () => setMode(0)
  const login = () => setMode(1)

  const signUpHandle = async () => {
    let res = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      body: JSON.stringify({
        password: pword,
        email: email,
        uname: uname,
        news: news
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (res.status === 200) {
      login()
      setMsg("")
    } else {
      const err = await res.json()
      setMsg(err.msg)
    }
  }

  const loginHandle = async () => {
    const d = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        password: pword,
        uname: uname
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (d.ok) {
      setMsg("")
      const data = await d.json()
      sessionStorage.token = data.token
      window.location.reload()
    } else {
      const data = await d.json()
      setMsg(data.msg)
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
        <input type="checkbox" onChange={e => setStay(e.target.value)} className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Stay logged in</label>
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
      <div className="mb-3 form-check">
        <input type="checkbox" onChange={e => setStay(e.target.value)} className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" htmlFor="exampleCheck1">Stay logged in</label>
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