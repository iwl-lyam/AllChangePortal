import React from 'react'
import Login from './Login/MainForm'

export default function Verification() {
  return (
    <div>
      {!localStorage.token && !sessionStorage.token ? <Login/> : (
          <div>
            <h1>Verification</h1>
            <h2>Coming soon to replace the legacy ACV bot</h2>
          </div>
      )}
      
    </div>
  )
}