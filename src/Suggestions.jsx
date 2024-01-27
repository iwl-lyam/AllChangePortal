import React, {useState,useEffect} from 'react'
import Login from './Login/MainForm.jsx'
// import Markdown from 'react-markdown'
import {Request} from './Util.js'
import {marked} from 'marked'

export default function Suggestions() {

  const [title,setTitle] = useState("Example title")
  const [description, setDescription] = useState("Description. **woo _markdown_**")
  const [department, setDepartment] = useState("Web department")

  useEffect(() => {
    document.getElementById("mk").innerHTML = marked.parse(description)
  }, [description])

  const handleForm = async () => {
    // await fetch("http://77.68.127.58:8080/api/suggestions", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": localStorage.token || sessionStorage.token,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     department: department
    //   })
    // }).then(() => {
    //   alert("Thank you! Your suggestion has been submitted for approval. Please check your dashboard later to find any updates.")
    //   document.location.href = "/contact"
    // })
    await Request('api/suggestions', 'POST', {title:title, description:description, department:department})
    alert("Thank you! Your suggestion has been submitted for approval. Please check your dashboard later to find any updates.")
    document.location.href = "/contact"
  }


  return (
    <div className="text-light">
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
            <h1>Create suggestion</h1>
            <div className="form-group my-3">
              <label htmlFor="formGroupExampleInput">Suggestion title</label>
              <input type="text" className="form-control" id="formGroupExampleInput" onChange={e => setTitle(e.target.value)} placeholder="Add flying trains..." />
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleFormControlTextarea1">Description (please give as much detail as possible so that we can fully understand your ideas)</label>
              <textarea className="form-control" placeholder="Description (markdown enabled)" onChange={e => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleFormControlSelect2">Relevant department</label>
              <select multiple className="form-control" onChange={e => setDepartment(e.target.value)} id="exampleFormControlSelect2">
                <option>Web department</option>
                <option>Scripting department</option>
                <option>Modelling department</option>
                <option>Chassis testing team</option>
                <option>Piccadilly line team</option>
                <option>Supervisor/Discord department</option>
                <option>Miscellaneous</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleForm}>Submit suggestion</button>
          </div>
          <div className="col border p-3 rounded">
            <h1>{title}</h1>
            <div id="mk"></div>
            <p>Target department: {department}</p>
          </div>
        </div>

      )}

    </div>
  )
}