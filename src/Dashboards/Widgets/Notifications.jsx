import Stack from "../Stack.jsx";
import {Request} from "../../Util.js";

export default function Notifications({notifications}) {
    const notifItems = notifications.map(notif => (
        <div>
            <button data-bs-toggle="modal" data-bs-target={`#modal-${notif._id}`} type="button"
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

    return (<div className="border border-primary rounded col-md-5 mb-4">
        <h2 className="text-center p-3">Notifications</h2>
        <Stack>
            {notifItems}
        </Stack>
    </div>)
}