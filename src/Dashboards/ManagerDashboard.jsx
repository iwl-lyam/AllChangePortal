import react, {useState, useEffect} from 'react'
import {Request, ExternalGet} from "../Util.js"
import './dashboard.css'
import React from "react";

export default function ManagerDashboard() {
    const [staff, setStaff] = useState([])
    const [rblxUser, setRblxUser] = useState("")
    const [dscUser, setDscUser] = useState("")
    const [email, setEmail] = useState("")
    const [comments, setComments] = useState("")
    const [pronouns, setPronouns] = useState("")
    const [perm, setPerm] = useState(0)
    const [id, setID] = useState("")

    const [leaveType, setLeaveType] = useState("")
    const [untilDate, setUntilDate] = useState("")
    const [reason, setReason] = useState("")
    const [done, setDone] = useState(false)


    useEffect(() => {
        const f = async () => {
            setPerm((await Request("rpc/getUserStatus")).status)
            setStaff(await Request("api/staff"))
        }
        f().then(() => {
        })
    }, [])
    useEffect(() => {
        const f = async () => {
            for (const s of staff) {
                const c = staff.indexOf(s);
                staff[c].thumbnail = (await getThumbnail(s.rblxid)).url
                console.log(staff[c])
            }
        }
        f().then(() => {
        })

        setDone(true)
    }, staff)

    const getThumbnail = async id => {
        return (await Request(`rpc/${id}/thumbnail`))
    }

    const removeAbsence = async () => {
        await Request("api/staff/" + rblxUser, "PATCH", {$set: {absent: false}})
        location.reload()
    }

    const applyAbsence = async () => {
        const data = {
            absent: true,
            absentType: leaveType,
            absentUntil: untilDate,
            absentReason: reason
        }

        await Request("api/staff/" + rblxUser, "PATCH", {$set: data})
        location.reload()
    }

    const editStaffProperties = async () => {
        const data = {
            disc: dscUser,
            email: email,
            comments: comments,
            pronouns: pronouns,
            rblxid: id
        }

        if (dscUser === "") delete data.disc
        if (email === "") delete data.email
        if (comments === "") delete data.comments
        if (pronouns === "") delete data.pronouns
        if (id === "") delete data.rblxid

        await Request("api/staff/" + rblxUser, "PATCH", {$set: data})
        location.reload()
    }

    function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1] - 1, mdy[0]);
    }

    let staffBlock = []
    for (const s of staff) {
        const date = new Date()
        staffBlock.push({
            staff: s, block: (
                <div className="border border-white p-4 pl-0 mb-4 bg-secondary rounded" key={s._id}>
                    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="exampleModalLabel">Edit staff member
                                        properties</h5>
                                    <button type="button" className="btn bg-white text-black" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-black text-right">
                                    <p>Only enter data into the fields you want to change. Ensure that the fields are
                                        blank if you want to not change them.</p>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Discord Username</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-disc"
                                                   onChange={e => setDscUser(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Email</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-email"
                                                   onChange={e => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Comments</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-comments"
                                                   onChange={e => setComments(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Pronouns</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-pronouns"
                                                   onChange={e => setPronouns(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">IDs</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-pronouns"
                                                   onChange={e => setID(e.target.value)}/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p className="text-center"><strong>Contact @develop331 to edit other
                                        fields.</strong></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={editStaffProperties}>Save
                                        changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="absenceModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="exampleModalLabel">Apply absence</h5>
                                    <button type="button" className="btn bg-white text-black" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body text-black text-right">
                                    <p>All data fields are required</p>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Type</p>
                                        </div>
                                        <div className={"col"}>
                                            {/*<input type="text" id="edit-staff-disc" onChange={e => setDscUser(e.target.value)} />*/}
                                            <select className="w-75 custom-select"
                                                    onChange={e => setLeaveType(e.target.value)}>
                                                <option selected>Select type...</option>
                                                <option value="loa">Leave of Absence</option>
                                                <option value="exl">Exam Leave</option>
                                                <option value="ra">Reduced Activity</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Until</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="date" id="edit-staff-comments" className="w-75"
                                                   onChange={e => setUntilDate(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-right">Reason</p>
                                        </div>
                                        <div className={"col"}>
                                            <input type="text" id="edit-staff-email"
                                                   onChange={e => setReason(e.target.value)}/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p className="text-center"><strong>Contact @develop331 to edit other
                                        fields.</strong></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={applyAbsence}>Save
                                        changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="removeModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-black" id="exampleModalLabel">Cancel absence: Are
                                        you sure?</h5>
                                    <button type="button" className="btn bg-white text-black" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-danger" onClick={removeAbsence}>Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

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

    if (perm > 2)
        return (
            <div>
                <h1>Manager dashboard</h1>
                <br/>
                <div>
                    <div className="border border-white p-4 m-3 rounded">
                        <h1>Staff list</h1> <br/>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0"
                             style={{overflowY: "scroll", height: "34em"}} className="scrollspy-example" tabIndex="0">
                            {staffArrs}
                        </div>
                    </div>
                </div>
            </div>
        )
    else if (!staff[0] || !done) return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
    else return (
            <div>
                <h1>403... How did you get here?</h1>
            </div>
        )
}