import React, {useState} from "react";
import {Request} from "../../Util.js";
import {removeAbsence, parseDate, applyAbsence, datediff, editStaffProperties} from "./WidgetUtil.jsx"
import {StaffListModals} from "./StaffListModals.jsx";

export default function StaffList({staff}) {
    const [rblxUser, setRblxUser] = useState("")
    const [dscUser, setDscUser] = useState("")
    const [email, setEmail] = useState("")
    const [comments, setComments] = useState("")
    const [pronouns, setPronouns] = useState("")
    const [id, setID] = useState("")

    const [leaveType, setLeaveType] = useState("")
    const [untilDate, setUntilDate] = useState("")
    const [reason, setReason] = useState("")

    let staffBlock = []
    for (const s of staff) {
        const date = new Date()
        staffBlock.push({
            staff: s, block: (
                <div className="border border-white p-4 pl-0 mb-4 bg-secondary rounded" key={s._id}>
                    <StaffListModals setLeaveType={setLeaveType} setUntilDate={setUntilDate} setReason={setReason}
                                     setRblxUser={setRblxUser} setDscUser={setDscUser}
                                    setEmail={setEmail} setComments={setComments} setPronouns={setPronouns}
                                    setID={setID} rblxUser={rblxUser} dscUser={dscUser} email={email}
                                    comments={comments} pronouns={pronouns} id={id} leaveType={leaveType}
                                    untilDate={untilDate} reason={reason}/>

                    <div className="container">

                        <div className="row">
                            <div className="col-2 m-0 p-0 text-left align-self-center border-black">
                                <img src={s.thumbnail} alt={s.thumbnail}/>
                            </div>
                            <div className="col">

                                <h2>@{s.rblx} (@{s.disc}) - {s.rank}</h2>
                                <p>Joined {s.joindate} - {datediff(parseDate(s.joindate), parseDate(`${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`))} days
                                    ago - {s.pronouns}<br/>
                                    <strong>Email</strong>: {s.email}<br/>
                                    <strong>Comments</strong>: {s.comments}<br/>
                                    <strong>Roblox UserID</strong>: {s.rblxid}<br/>
                                    {s.absent ?
                                        <span className="text-danger">
                                    <strong>{s.absentType}: </strong> Until {s.absentUntil} ({s.absentReason})
                                </span> : <div></div>}
                                </p>

                                <div className="container justify-content-center align-self-center">
                                    <div className="row">
                                        <button className="m-1 col-1 btn border border-black text-black" data-toggle="modal"
                                                data-target="#editModal" id="editButton"
                                                onClick={() => setRblxUser(s.rblx)}>Edit
                                        </button>
                                        <button className="m-1 col-2 btn border border-black text-black" data-toggle="modal"
                                                data-target="#absenceModal" id="absenceButton"
                                                onClick={() => setRblxUser(s.rblx)}>Apply absence
                                        </button>
                                        <button className="m-1 col-2 btn border border-black text-black" data-toggle="modal"
                                                data-target="#removeModal" id="absenceButton"
                                                onClick={() => setRblxUser(s.rblx)}>Remove absence
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    }

    staffBlock.sort((a, b) => {

        return a.staff.rblx.localeCompare(b.staff.rblx)
    })

    let staffArrs = []
    staffBlock.forEach(e => {
        staffArrs.push(e.block)
    })
    return (<div className="border border-white p-4 m-3 rounded">
        <h1>Staff list</h1> <br/>
        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0"
             style={{overflowY: "scroll", height: "34em"}} className="scrollspy-example" tabIndex="0">
            {staffArrs}
        </div>
    </div>)
}