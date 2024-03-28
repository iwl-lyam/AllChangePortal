import {applyAbsence, editStaffProperties, removeAbsence} from "./WidgetUtil.jsx";
import React from "react";

export function StaffListModals({setLeaveType, leaveType, setUntilDate, untilDate,
                                    setReason, reason, setDscUser, dscUser, setEmail, email,
                                    setComments, comments, setPronouns, pronouns, setID, id, rblxUser}) {
    return (<div><div className="modal fade" id="editModal" tabIndex="-1" role="dialog"
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
                    <button type="button" className="btn btn-danger" onClick={() => editStaffProperties(rblxUser, dscUser, email, comments, pronouns, id)}>Save
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
                                    onChange={e => setLeaveType(e.target.value)}
                                    defaultValue="n/a">
                                <option value="n/a">Select type...</option>
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
                    <button type="button" className="btn btn-danger" onClick={() => applyAbsence(rblxUser, leaveType, untilDate, reason)}>Save
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
                    <button type="button" className="btn btn-danger" onClick={() => removeAbsence(rblxUser)}>Yes
                    </button>
                </div>
            </div>
        </div>
    </div></div>)
}