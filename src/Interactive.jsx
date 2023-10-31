import React from 'react'
import Login from './Login/MainForm'

export default function Interactives() {
  return (
    <div>
      {localStorage.token !== ""? <Login />: (
      <div>
        <h1>Interactive features</h1>
      </div>
      )}
      
    </div>
  )
}