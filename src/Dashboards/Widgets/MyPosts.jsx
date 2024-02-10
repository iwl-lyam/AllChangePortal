import Stack from "../Stack.jsx";
import Markdown from "react-markdown";
import {marked} from "marked";
import xss from "xss";

export default function MyPosts({posts}) {
    const listItems = posts.map(post => (
        <div>
            <button data-bs-toggle="modal" data-bs-target={`#modal-${post._id}`} type="button"
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
                            <div id="sgDesc" dangerouslySetInnerHTML={{ __html: xss(marked.parse(post.description)) }}></div>
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

    return (<div className="border border-primary rounded col-md-5 mb-4">
        <h2 className="text-center p-3">My posts</h2>
        <Stack>
            {listItems}
        </Stack>
    </div>)
}