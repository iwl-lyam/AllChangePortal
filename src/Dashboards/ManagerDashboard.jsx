import react, {useState, useEffect} from 'react'
import {Request} from "../Util.js"
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


    useEffect(() => {
        const f = async () => {
            setStaff(await Request("api/staff"))
            setPerm((await Request("rpc/getUserStatus")).status)
        }
        f().then(() => {})
    }, [])

    const editStaffProperties = async () => {
        const data = {
            disc: dscUser,
            email: email,
            comments: comments,
            pronouns: pronouns
        }

        if (dscUser === "") delete data.disc
        if (email === "") delete data.email
        if (comments === "") delete data.comments
        if (pronouns === "") delete data.pronouns

        await Request("api/staff/"+rblxUser, "PATCH", {$set: data})
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
    staff.forEach(s => {
        const date = new Date()
        staffBlock.push((
            <div className= "border border-white p-4 pb-2 mb-4 bg-secondary rounded" key={s._id}>
                <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black" id="exampleModalLabel">Edit staff member properties</h5>
                                <button type="button" className="btn bg-white text-black" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-black text-right">
                                <p>Only enter data into the fields you want to change. Ensure that the fields are blank if you want to not change them.</p>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-right">Discord Username</p>
                                    </div>
                                    <div className={"col"}>
                                        <input type="text" id="edit-staff-disc" onChange={e => setDscUser(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-right">Email</p>
                                    </div>
                                    <div className={"col"}>
                                        <input type="text" id="edit-staff-email" onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-right">Comments</p>
                                    </div>
                                    <div className={"col"}>
                                        <input type="text" id="edit-staff-comments" onChange={e => setComments(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-right">Pronouns</p>
                                    </div>
                                    <div className={"col"}>
                                        <input type="text" id="edit-staff-pronouns" onChange={e => setPronouns(e.target.value)} />
                                    </div>
                                </div>
                                <hr />
                                <p className="text-center"><strong>Contact @develop331 to edit other fields.</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={editStaffProperties}>Save changes</button>
                            </div>
                        </div>
                  </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h2>@{s.rblx} (@{s.disc}) - {s.rank}</h2>
                            <p>Joined {s.joindate} - {datediff(parseDate(s.joindate), parseDate(`${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}`))} days ago - {s.pronouns}<br />
                                <strong>Email</strong>: {s.email}<br />
                                <strong>Comments</strong>: {s.comments}
                            </p>
                        </div>
                        <div className="col justify-content-center align-self-center">
                            <button className="btn border border-black text-black" data-toggle="modal" data-target="#editModal" id="editButton" onClick={() => setRblxUser(s.rblx)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    })

    if (perm > 2)
    return (
        <div>
            <h1>Manager dashboard</h1>
            <br />
            <div>
                <div className="border border-white p-4 m-3 rounded">
                    <h1>Staff list</h1> <br />
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0"
                         style={{overflowY: "scroll", height: "34em"}} className="scrollspy-example" tabIndex="0">
                        {staffBlock}
                    </div>
                </div>
            </div>
        </div>
    )
    else return (
        <div>
            <h1>403. How did you get here?</h1>
        </div>
    )
}