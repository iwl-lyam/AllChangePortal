import React, {useState} from 'react'

export default function Signup() {
  return (
    <form>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}