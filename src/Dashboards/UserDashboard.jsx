import {useEffect, useState} from 'react'
import Login from '../Login/MainForm.jsx'
import Markdown from "react-markdown";
import Stack from "./Stack.jsx"
import {Request} from "../Util.js"

export default function UserDashboard() {
    const [posts, setPosts] = useState([])
    const [notifications, setNotifications] = useState([])

    {/* Reset password hooks */}
    const [RPOldPass, setRPOldPass] = useState("")
    const [RPNewPass, setRPNewPass] = useState("")
    const [RPNewPass2, setRPNewPass2] = useState("")

    useEffect(() => {
        const f = async () => {
            // const req = await fetch("http://77.68.127.58:8080/api/suggestions?user=1", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token
            //     }
            // })
            let req = await Request("api/suggestions?user=1", "GET", {}, true)
            setPosts(req)

            // const req2 = await fetch("http://77.68.127.58:8080/api/notifs", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token
            //     }
            // })
            req = await Request("api/notifs", "GET", {}, true)
            setNotifications(req)
        }
        f().then(r => {})
    }, [])

    const RPHandle = () => {
        const RPSuccess = ((RPOldPass !== RPNewPass) && (RPNewPass===RPNewPass2))

        alert("Old: "+RPOldPass)
        alert("New: "+RPNewPass)
        alert("New2: "+RPNewPass2)

        alert("Match: "+(RPNewPass===RPNewPass2))
        alert("Success: "+RPSuccess)

        {/* TODO: Implement reset password */}
    }


    const listItems = posts.map(post => (
        <div>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">Status: {post.status === 0 ? "Awaiting approval" : (post.status === 1 ? "Approved" : "Denied")}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog text-dark">
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

    const notifItems = notifications.map(notif => (
        <div>
            <button data-toggle="modal" data-target={`#modal-${notif._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{notif.title}</h3>
                <p className="mb-1">{notif.desc}</p>
            </button>

            <div className="modal fade" id={`modal-${notif._id}`} role="dialog">
                <div className="modal-dialog text-dark">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{notif.title}</h4>
                            <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>{notif.desc}</p>
                            <p><strong>ID: </strong>{notif._id}</p>
                            <button className="btn btn-danger" onClick={async () => {
                                // await fetch("http://77.68.127.58:8080/rpc/dismissNotif?id="+notif._id, {method: "POST", headers: {
                                //         Authorization: sessionStorage.token || localStorage.token
                                //     }})
                                await Request("rpc/dismissNotif?id="+notif._id, "POST")
                                location.reload()
                            }}>Dismiss</button>
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
                                        {notifItems}
                                    </Stack>
                                </div>
                            </div>
                            <div className="text-center">
                                {/* Reset password modal */}
                                <div className="modal fade text-left" id={`modal-rp`} role="dialog">
                                    <div className="modal-dialog text-dark">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Reset password</h4>
                                                <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body text-left container">
                                                <div className="row">
                                                    <div className="col">
                                                        <p>Existing password</p>
                                                    </div>
                                                    <div className={"col"}>
                                                        <input type="password" id="reset-pass-old-pass" onChange={e => setRPOldPass(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-right">New password</p>
                                                    </div>
                                                    <div className={"col"}>
                                                        <input type="password" id="reset-pass-new-pass" onChange={e => setRPNewPass(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="text-right">Confirm new password</p>
                                                    </div>
                                                    <div className={"col"}>
                                                        <input type="password" id="reset-pass-new-pass2" onChange={e => setRPNewPass2(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col" />
                                                    <div className="col text-center">
                                                        <button className="btn bg-primary text-white" onClick={RPHandle}>Reset password</button>
                                                    </div>
                                                    <div className="col" />
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* Delete account modal */}
                                <div className="modal fade text-left" id={`modal-del`} role="dialog">
                                    <div className="modal-dialog text-dark">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Delete account</h4>
                                                <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <button className="btn bg-primary m-4 text-white" data-toggle="modal" data-target={`#modal-rp`} type="button">Reset password</button>
                                <button className="btn bg-danger m-4 text-white" data-toggle="modal" data-target={`#modal-del`} type="button">Delete account</button>
                                <button className="btn bg-warning m-4">Sign out</button>
                            </div>
                        </div>

                    </div>
                </div>)}
        </div>
    )
}