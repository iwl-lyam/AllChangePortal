import React from 'react'
import Login from './Login/MainForm'

export default function Contact() {
  return (
    <div>
      {localStorage.token != "" || sessionStorage.token != ""? <Login />: (
      <div>
        <h1>Contact</h1>
      </div>
      )}
      
    </div>
  )
}