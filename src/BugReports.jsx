import React, {useState} from 'react'
import Login from './Login/MainForm'
import Markdown from 'react-markdown'
import {Request} from './Util.js'

export default function BugReports() {

  const [title,setTitle] = useState("Example title")
  const [desc, setDesc] = useState("Description. **woo _markdown_**")
  const [dept, setDept] = useState("Web department")

  // const [posts, setPosts] = useState(null)
  //
  // if (posts == null) {
  //   console.log("SETTING POSTS")
  //   fetch("http://77.68.127.58:8080/api/suggestions", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": localStorage.token || sessionStorage.token
  //     }
  //   }).then(res => res.json()).then(payload => {
  //     setPosts(payload)
  //     console.log("set")
  //   })
  // }

  const handleForm = async () => {
    // await fetch("http://77.68.127.58:8080/api/bugreports", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": localStorage.token || sessionStorage.token,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: desc,
    //     department: dept
    //   })
    // }).then(() => {
    //   alert("Thank you! Your bug report has been submitted for approval. Please check your dashboard later to find any updates.")
    //   document.location.href = "/contact"
    // })
    await Request("api/bugreports", "POST", {title: title, description: desc, department: dept})
    alert("Thank you! Your bug report has been submitted for approval. Please check your dashboard later to find any updates.")
    document.location.href = "/contact"
  }

  return (
    <div className="">
      {!localStorage.token && !sessionStorage.token ? <Login/> : (
        <div className={"row"}>
          {/*{posts == null ? (<div>loading</div>) : (*/}
          {/*    <div>*/}
          {/*      <h1>contact</h1>*/}
          {/*      <div> {posts.map((p) => (*/}
          {/*          <div key={p._id}>*/}
          {/*            <div style={{"borderStyle": "solid", textAlign: "center"}}>*/}
          {/*              <h1>{p.title}</h1>*/}
          {/*              <p>{p.description}</p>*/}
          {/*            </div>*/}
          {/*            <br/>*/}
          {/*          </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*    </div>*/}
          {/*)}*/}
          <div className={"col"}>
            <h1>Create bug report</h1>
            <div className="form-group my-3">
              <label htmlFor="formGroupExampleInput">Bug report title</label>
              <input type="text" className="form-control" id="formGroupExampleInput" onChange={e => setTitle(e.target.value)} placeholder="Fix trains derailing at..." />
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleFormControlTextarea1">Description (please give as much detail as possible so that we can fully understand your problem)</label>
              <textarea className="form-control"  onChange={e => setDesc(e.target.value)} id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleFormControlSelect2">Relevant department</label>
              <select multiple className="form-control" onChange={e => setDept(e.target.value)} id="exampleFormControlSelect2">
                <option>Web department</option>
                <option>Scripting department</option>
                <option>Modelling department</option>
                <option>Chassis testing team</option>
                <option>Piccadilly line team</option>
                <option>Supervisor/Discord department</option>
                <option>Miscellaneous</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleForm}>Submit bug report</button>
          </div>
          <div className="col border p-3">
            <h1>{title}</h1>
            <p><Markdown>{desc}</Markdown></p>
            <p>Target department: {dept}</p>
          </div>
        </div>

      )}

    </div>
  )
}