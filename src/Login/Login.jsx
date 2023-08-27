import React, {useState} from 'react'

export default function Login() {
  return (
    <form>
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
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}