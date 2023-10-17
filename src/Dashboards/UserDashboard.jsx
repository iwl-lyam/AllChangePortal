import {useEffect, useState} from 'react'
import Login from '../Login/MainForm.jsx'
import Markdown from "react-markdown";
import Stack from "./Stack.jsx"

export default function UserDashboard() {
    const [posts, setPosts] = useState([])
    const [notifs, setNotifs] = useState([])

    useEffect(() => {
        const f = async () => {
            const req = await fetch("http://localhost:8080/api/suggestions?user=1", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token
                }
            })
            setPosts(await req.json())

            const req2 = await fetch("http://localhost:8080/api/notifs", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token
                }
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
                <p className="mb-1">Status: {post.status === 0 ? "Awaiting approval" : (post.status === 1 ? "Approved" : "Denied")}</p>
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
                            <p>
                                <strong>Status:</strong> {post.status === 0 ? "Awaiting approval" : (post.status === 1 ? "Approved" : "Denied")}
                            </p>
                            <p><strong>Comment: </strong> {post.comment ? post.comment : "Awaiting approval"}</p>
                            <p><strong>Department:</strong> {post.department}</p>
                            <p><strong>Post ID:</strong> {post._id}</p>
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
                    <h1 className="text-center pb-3">User dashboard</h1>
                    <div className="mt-4">
                        <div className="container-fluid">
                            <div className="row justify-content-around">
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">My posts</h2>
                                    <Stack>
                                        {listItems}
                                    </Stack>
                                </div>
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Notifications</h2>
                                    <Stack>
                                        <h4 id="list-item-1">Item 1</h4>
                                        <p>...</p>
                                        <h4 id="list-item-2">Item 2</h4>
                                        <p>...</p>
                                        <h4 id="list-item-3">Item 3</h4>
                                        <p>...</p>
                                        <h4 id="list-item-4">Item 4</h4>
                                        <p>...</p>
                                        <h4 id="list-item-4">Item 6</h4>
                                        <p>...</p>
                                    </Stack>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>)}
        </div>
    )
}