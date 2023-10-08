import React from 'react'

export default function Contact() {
  return (
      <div>
        <h1>Contact All Change</h1>
        <div className={"m-3 p-3 border"}>
          <h2>Send a suggestion</h2>
          <p>Want something changed or added in game or in the Discord server?
            Send a suggestion and it'll be considered.</p>
          <button type="button" className="btn btn-primary" onClick={() => document.location.href = "/contact/suggestions"}>Send a suggestion</button>
        </div>
        <div className={"m-3 p-3 border"}>
          <h2>Send a bug report</h2>
          <p>Have you found a bug or problem in the game?
            Send a bug report and our developers will fix it as soon as possible.</p>
          <button disabled type="button" className="btn btn-primary" onClick={() => document.location.href = "/contact/bugreports"}>Send a Bug report</button>
        </div>
      </div>
  )

}