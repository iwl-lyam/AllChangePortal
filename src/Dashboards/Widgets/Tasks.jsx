import Stack from "../Stack.jsx";
import Markdown from "react-markdown";
import {Request} from "../../Util.js";
import {marked} from "marked";
import xss from "xss";

export default function Tasks({notifItems}) {
    const tasks = notifItems.map(post => (
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
                            <div id="sgDesc" dangerouslySetInnerHTML={{ __html: xss(marked.parse(post.description)) }}></div>
                            <p><strong>Department: {post.department}</strong></p>
                            <p><strong>Post ID: {post._id}</strong></p>
                            <button className="btn btn-default text-white bg-danger" onClick={async ()=>{
                                await Request("rpc/completeTask?id="+post._id, "POST", {})
                                location.reload()
                            }}>Complete</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    ));

    return (<div className="border border-primary rounded col-md-5 mb-4">
        <h2 className="text-center p-3">Tasks</h2>
        <Stack className="mb-1">
            {tasks}
        </Stack>
    </div>)
}