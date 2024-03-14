import Stack from "../Stack.jsx";
import Markdown from "react-markdown";
import {Request} from "../../Util.js";
import {marked} from "marked";
import xss from "xss";

export default function BugReportsAwaitingCheck({ brItems }) {
    const br = brItems.map(post => (
        <div key={post._id}>
            <button data-bs-toggle="modal" data-bs-target={`#modal-${post._id}`} type="button"
                    className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                <h3>{post.title}</h3>
                <p className="mb-1">{post.department}</p>
            </button>



        </div>
    ))
    return (<div className="border border-primary rounded col-md-5 mb-4">
        <h2 className="text-center p-3">User warnings</h2>
        <Stack>
            {br}
        </Stack>
    </div>)
}