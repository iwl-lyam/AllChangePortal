import React, {useEffect, useState} from 'react'
import Login from './Login/MainForm'

export default function Contact() {

  const [posts, setPosts] = useState(null)

  if (posts == null) {
    console.log("SETTING POSTS")
    fetch("http://localhost:8080/api/suggestions", {
      method: "GET",
      headers: {
        "Authorization": localStorage.token || sessionStorage.token
      }
    }).then(res => res.json()).then(payload => {
      setPosts(payload)
      console.log("set")
    })
  }

  return (
    <div>
      {!localStorage.token && !sessionStorage.token ? <Login/> : (
        <div>
          {posts == null ? (<div>loading</div>) : (
              <div>
                <h1>contact</h1>
                <div> {posts.map((p) => (
                    <div key={p._id}>
                      <div style={{"borderStyle": "solid", textAlign: "center"}}>
                        <h1>{p.title}</h1>
                        <p>{p.description}</p>
                      </div>
                      <br/>
                    </div>
                ))}
              </div>
              </div>
          )}
        </div>
      )}

    </div>
  )
}