import React, {useState} from 'react'
import Login from './Login/MainForm'

export default async function Contact() {
  const [data,setData] = useState([])
  const [count, setCount] = useState(0)

  if (count === 0) {
    const d = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: `
          GetSuggestionMany(aid:"${localStorage.id || sessionStorage.id}")
        `
      })
    })
    setData(await d.json())
    console.log(data)
    setCount(1)
  }

  return (
    <div>
      {!localStorage.token || !sessionStorage.token ? <Login />: (
      <div>
        <h1>Contact</h1>
        <div>
          {data.map((post) => (
              <div key={post._id}>
                <h2>Title: {post.title}</h2>
                <p>Likes: {post.likes}</p>
              </div>
          ))}
        </div>
      </div>
      )}
      
    </div>
  )
}