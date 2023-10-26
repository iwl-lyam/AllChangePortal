import {useEffect, useState} from 'react'
import Login from '../Login/MainForm.jsx'
import Markdown from "react-markdown"
import Stack from "./Stack.jsx"
import {Request} from "../Util.js"

export default function ProjectLeaderDashboard() {
    const [posts, setPosts] = useState([])
    const [notifs, setNotifs] = useState([])
    const [tasks, setTasks] = useState([])
    const [br, setBr] = useState([])
    const [textSetError, setTextSetError] = useState("")
    const [taskRecip, setTaskRecip] = useState("")
    const [taskDate, setTaskDate] = useState("")
    const [taskInfo, setTaskInfo] = useState("")

    const assignTask = async (id) => {
        // await fetch("http://77.68.127.58:8080/rpc/assignTask", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         recipient: taskRecip,
        //         date: taskDate,
        //         info: taskInfo,
        //         id: id
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: sessionStorage.token || localStorage.token
        //     }
        // })
        await Request("rpc/assignTask", "POST", {
                    recipient: taskRecip,
                    date: taskDate,
                    info: taskInfo,
                    id: id
                }, true)
        location.reload()
    }

    const whoIs = id => {
        // <option value="653947bbfbdfe560ae2bb2ab">Jackie (programming)</option>
        // <option value="653945aba66e822aa5c9e8b1">Tiger (blender)</option>
        // <option value="65392288a66e822aa5c9e8ad">Red (programming)</option>
        // <option value="653922eaa66e822aa5c9e8ae">Squid (building)</option>
        // <option value="6539234ba66e822aa5c9e8af">Kylian (blender)</option>
        // <option value="653923c0a66e822aa5c9e8b0">Tom (building)</option>
        // <option value="652866b69e3f09b2723dfd39">Develop (web)</option>

        switch (id) {
            case "653947bbfbdfe560ae2bb2ab":
                return "Jackie"
            case "653945aba66e822aa5c9e8b1":
                return "Tiger"
            case "65392288a66e822aa5c9e8ad":
                return "Red"
            case "653922eaa66e822aa5c9e8ae":
                return "Squid"
            case "6539234ba66e822aa5c9e8af":
                return "Kylian"
            case "653923c0a66e822aa5c9e8b0":
                return "Tom"
            case "652866b69e3f09b2723dfd39":
                return "Develop"
            default:
                return "ID not found"
        }
    }

    useEffect(() => {
        const f = async () => {
            // const req4 = await fetch("http://77.68.127.58:8080/api/bugreports?status=0", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token,
            //     }
            // })
            // setBr(await req4.json())
            const req4 = await Request("api/bugreports?status=0")
            setBr(req4)

            // const req = await fetch("http://77.68.127.58:8080/api/suggestions?status=0", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token,
            //     },
            // })
            // setPosts(await req.json())
            const req = await Request("api/suggestions?status=0")
            setPosts(req)

            // const req2 = await fetch("http://77.68.127.58:8080/api/tasks?status=0", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token,
            //     }
            // })
            // setNotifs(await req2.json())
            const req2 = await Request("api/tasks?status=0")
            setNotifs(req2)

            // const req3 = await fetch("http://77.68.127.58:8080/api/tasks?status=1", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token,
            //     },
            // })
            // setTasks(await req3.json())
            const req3 = await Request("api/tasks?status=1")
            setTasks(req3)
        }
        f().then(r => {})
    }, [])

    const listItems = posts.map(post => (
        <div key={post._id}>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{post.title}</h4>
                            <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <Markdown>{post.description}</Markdown>
                            <p><strong>Department: {post.department}</strong></p>
                            <p><strong>Post ID: {post._id}</strong></p>
                            <div className="btn-group">
                                <button className="btn btn-success" onClick={async () => {
                                    const msg = prompt("Give feedback for user:")
                                    if (msg === null) return
                                    // await fetch("http://77.68.127.58:8080/api/tasks", {
                                    //     method: "POST",
                                    //     body: JSON.stringify({
                                    //         title: post.title,
                                    //         description: post.description,
                                    //         department: post.department,
                                    //         comment: msg,
                                    //         status: 0,
                                    //     }),
                                    //     headers: {
                                    //         Authorization: sessionStorage.token || localStorage.token,
                                    //         "Content-Type": "application/json",
                                    //     }
                                    await Request("api/tasks", "POST", {
                                        title: post.title,
                                        description: post.description,
                                        department: post.department,
                                        comment: msg,
                                        status: 0,
                                    })
                                    // await fetch("http://77.68.127.58:8080/rpc/approve_suggestion", {
                                    //     method: "POST",
                                    //     body: JSON.stringify({
                                    //         comment: msg,
                                    //         postid: post._id,
                                    //     }),
                                    //     headers: {
                                    //         Authorization: sessionStorage.token || localStorage.token,
                                    //         "Content-Type": "application/json",
                                    //     },
                                    // })
                                    await Request("rpc/approve_suggestion", "POST", {
                                        comment: msg,
                                        postid: post._id,
                                    })
                                    alert("Post approved with message: " + msg + "\nAwaiting assignment")
                                    location.reload()
                                }}>Approve
                                </button>
                                <button className="btn btn-warning" onClick={async () => {
                                    const msg = prompt("Give feedback for user:")
                                    if (msg === null) return
                                    // await fetch("http://77.68.127.58:8080/rpc/deny_suggestion", {
                                    //     method: "POST",
                                    //     body: JSON.stringify({
                                    //         comment: msg,
                                    //         postid: post._id,
                                    //     }),
                                    //     headers: {
                                    //         Authorization: sessionStorage.token || localStorage.token,
                                    //         "Content-Type": "application/json",
                                    //     }
                                    // })
                                    await Request("rpc/deny_suggestion", "POST", {comment: msg, postid: post._id})
                                    alert("Post denied with message: " + msg)
                                    location.reload()
                                }}>Deny
                                </button>
                                <button className="btn btn-danger" onClick={async () => {
                                    const msg = prompt("Give reason:")
                                    if (msg === null) return
                                    // await fetch("http://77.68.127.58:8080/rpc/report_suggestion", {
                                    //     method: "POST",
                                    //     body: JSON.stringify({
                                    //         comment: msg,
                                    //         postid: post._id,
                                    //     }),
                                    //     headers: {
                                    //         Authorization: sessionStorage.token || localStorage.token,
                                    //         "Content-Type": "application/json",
                                    //     }
                                    // })
                                    await Request("rpc/report_suggestion", "POST", {comment: msg, postid: post._id})
                                    alert("Post set for review with message: " + msg)
                                }}>Report
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ));

    const brItems = br.map(post => (
        <div key={post._id}>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{post.title}</h4>
                            <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <Markdown>{post.description}</Markdown>
                            <p><strong>Department: {post.department}</strong></p>
                            <p><strong>Post ID: {post._id}</strong></p>
                            <div className="btn-group">
                                <button className="btn btn-success" onClick={async () => {
                                    const msg = prompt("Give feedback for user:")
                                    if (msg === null) return
                                    await Request("api/tasks", "POST", {
                                        title: post.title,
                                        description: post.description,
                                        department: post.department,
                                        comment: msg,
                                        status: 0,
                                    })
                                    await Request("rpc/approve_bugreport", "POST", {
                                        comment: msg,
                                        postid: post._id,
                                    })
                                    alert("Post approved with message: " + msg + "\nAwaiting assignment")
                                    location.reload()
                                }}>CRP
                                </button>
                                <button className="btn btn-warning" onClick={async () => {
                                    const msg = prompt("Give feedback for user:")
                                    if (msg === null) return
                                    await Request("rpc/deny_bugreport", "POST", {
                                        comment: msg,
                                        postid: post._id,
                                    })
                                    alert("Post denied with message: " + msg)
                                    location.reload()
                                }}>CNRP
                                </button>
                                <button className="btn btn-danger" onClick={async () => {
                                    const msg = prompt("Give reason:")
                                    if (msg === null) return
                                    await Request("rpc/report_bugreport", "POST", {
                                        comment: msg,
                                        postid: post._id,
                                    })
                                    alert("Post set for review with message: " + msg)
                                    location.reload()
                                }}>Report
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ))

    const notifItems = notifs.map(post => (
        <div key={post._id}>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{post.title}</h4>
                            <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <Markdown>{post.description}</Markdown>
                            <p><strong>Department: {post.department}</strong></p>
                            <p><strong>Post ID: {post._id}</strong></p>
                            <div className="border p-2 border border-primary rounded">
                                <label className="mr-4" htmlFor="devSelect">Recipient</label>
                                &nbsp;
                                <select id="devSelect" className="custom-select custom-select-sm form-control" onChange={e => setTaskRecip(e.target.value)}>
                                    <option value="653947bbfbdfe560ae2bb2ab">Jackie (programming)</option>
                                    <option value="653945aba66e822aa5c9e8b1">Tiger (blender)</option>
                                    <option value="65392288a66e822aa5c9e8ad">Red (programming)</option>
                                    <option value="653922eaa66e822aa5c9e8ae">Squid (building)</option>
                                    <option value="6539234ba66e822aa5c9e8af">Kylian (blender)</option>
                                    <option value="653923c0a66e822aa5c9e8b0">Tom (building)</option>
                                    <option value="652866b69e3f09b2723dfd39">Develop (web)</option>
                                </select>
                                <br />

                                <label htmlFor="date">Set due date</label>
                                <input placeholder="Select date" type="date" id="date" className="form-control" onChange={e => setTaskDate(e.target.value)} />
                                <p>{textSetError}</p>

                                <label htmlFor="extraText">Any extra info</label>
                                <input placeholder="No extra info" type="text" id="extraText" className="form-control" onChange={e => setTaskInfo(e.target.value)} />

                                <br />
                                <button className="btn btn-primary" onClick={() => assignTask(post._id)}>Assign</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ));

    const taskItems = tasks.map(post => (
        <div key={post._id}>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{post.title}</h4>
                            <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <Markdown>{post.description}</Markdown>
                            <p><strong>Department:</strong> {post.department}</p>
                            <p><strong>Post ID:</strong> {post._id}</p>
                            <p><strong>Notes:</strong> {post.info}</p>
                            <p><strong>Assigned to:</strong> {whoIs(post.recipient)}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ));

    return (
        <div>
            {!localStorage.token && !sessionStorage.token ? <Login/> : (
                <div>
                    <h1 className="text-center p-4">Executive dashboard</h1>
                    <div className="mt-4">
                        <div className="container-fluid">
                            <div className="row justify-content-around mb-4">
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Suggestions awaiting approval</h2>
                                    <Stack>
                                        {listItems}
                                    </Stack>
                                </div>
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Unassigned tasks</h2>
                                    <Stack className="mb-1">
                                        {notifItems}
                                    </Stack>
                                </div>
                            </div>
                            <br/>
                            <div className="row justify-content-around mt-4 mb-4">
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Bug reports awaiting check</h2>
                                    <Stack>
                                        {brItems}
                                    </Stack>
                                </div>
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Incomplete tasks</h2>
                                    <Stack className="mb-1">
                                        {taskItems}
                                    </Stack>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>)}
        </div>
    )
}