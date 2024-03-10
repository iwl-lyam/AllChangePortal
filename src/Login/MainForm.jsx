import React, {useState} from 'react'
import {Request} from '../Util.js'
import {useOAuth2} from "@tasoskakour/react-use-oauth2";

export default function MainForm() {
  const [mode, setMode] = useState(1)
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState("")
  const [pword, setPword] = useState("")
  const [news, setNews] = useState("false")

  const [msg, setMsg] = useState("")

  const {data, loading, error, getAuth, logout} = useOAuth2({
    authorizeUrl: "https://authorize.roblox.com",
    clientId: "3309736173071815916",
    redirectUri: `${document.location.origin}/callback`,
    scope: "openid profile",
    responseType: "code",
    // exchangeCodeForTokenServerURL: "https://allchange.xyz/oauth/token", // TODO reset
    exchangeCodeForTokenServerURL: "http://localhost:8080/oauth/token",
    exchangeCodeForTokenMethod: "POST",
    onSuccess: (payload) => console.log("Success", payload),
    onError: (error_) => console.log("Error", error_)
  });

  if (loading) {
    return (
        <h1>Please continue authentication in separate OAuth window...</h1>
    )
  }

  const isLoggedIn = Boolean(data?.access_token)
  if (isLoggedIn) {
    if (data.token) {
      localStorage.token = data.token
      window.location.reload()
    }

    return (
      <div>
        <h1>Setting up your account, please wait...</h1>
      </div>
    )
  }

  // const signup = () => setMode(0) // TEMP DISABLED DUE TO BETA

  const signup = () => alert("Text based account registration is currently closed off in lieu of the Roblox signup system.")
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
    <div className="text-white">
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
            <br />

            <button type="button" className="btn btn-danger" onClick={() => getAuth()}>Sign in with Roblox</button>


          </div>
      ) : (
          <div>
      <h1>Login</h1>
      <pre>TEXT BASED LOGINS ARE CURRENTLY DEPRECATED, PLEASE USE OAUTH LOGIN</pre>
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
            <br />

            <button type="button" className="btn btn-danger" onClick={() => getAuth()}>Sign up with Roblox</button>
          </div>
  )}
    </div>
  )
}
