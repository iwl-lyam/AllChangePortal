import {useEffect, useState} from 'react'
import Login from '../Login/MainForm.jsx'
import Markdown from "react-markdown"
import Stack from "./Stack.jsx"

export default function ProjectLeaderDashboard() {
    const [posts, setPosts] = useState([])
    const [notifs, setNotifs] = useState([])

    useEffect(() => {
        const f = async () => {
            const req = await fetch("http://localhost:8080/api/suggestions", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token,
                },
            })
            setPosts(await req.json())

            const req2 = await fetch("http://localhost:8080/api/suggestions", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token,
                },
            })
            setNotifs(await req2.json())
        }
        f().then(r => {
        })
    }, [])

    const listItems = posts.map(post => (
        <div>
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
                                    await fetch("http://localhost:8080/rpc/approve_suggestion", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            comment: msg,
                                            postid: post._id,
                                        }),
                                        headers: {
                                            Authorization: sessionStorage.token || localStorage.token,
                                            "Content-Type": "application/json",
                                        },
                                    })
                                    alert("Post approved with message: " + msg + "\nAwaiting assignment")
                                }}>Approve
                                </button>
                                <button className="btn btn-warning" onClick={async () => {
                                    const msg = prompt("Give feedback for user:")
                                    if (msg === null) return
                                    await fetch("http://localhost:8080/rpc/deny_suggestion", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            comment: msg,
                                            postid: post._id,
                                        }),
                                        headers: {
                                            Authorization: sessionStorage.token || localStorage.token,
                                            "Content-Type": "application/json",
                                        },
                                    })
                                    alert("Post denied with message: " + msg)
                                }}>Deny
                                </button>
                                <button className="btn btn-danger" onClick={async () => {
                                    const msg = prompt("Give reason:")
                                    if (msg === null) return
                                    await fetch("http://localhost:8080/rpc/report_suggestion", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            comment: msg,
                                            postid: post._id,
                                        }),
                                        headers: {
                                            Authorization: sessionStorage.token || localStorage.token,
                                            "Content-Type": "application/json",
                                        },
                                    })
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

    const notifItems = notifs.map(post => (
        <div>
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
                            {/*TODO Add dropdown box for which developer to assign to*/}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ))

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
                                        {listItems}
                                    </Stack>
                                </div>
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Incomplete tasks</h2>
                                    <Stack className="mb-1">
                                        {notifItems}
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