import Stack from "../Stack.jsx";
import Markdown from "react-markdown";
import {Request} from "../../Util.js";

export default function BugReportsAwaitingCheck({ brItems }) {
    const br = brItems.map(post => (
        <div key={post._id}>
            <button data-toggle="modal" data-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>

            <div className="modal fade" id={`modal-${post._id}`} role="dialog">
                <div className="modal-dialog text-black">
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
    return (<div className="border border-primary rounded col-md-5 mb-4">
        <h2 className="text-center p-3">Bug reports awaiting check</h2>
        <Stack>
            {br}
        </Stack>
    </div>)
}