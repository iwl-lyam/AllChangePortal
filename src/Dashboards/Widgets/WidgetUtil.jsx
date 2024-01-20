import {Request} from "../../Util.js";

export const removeAbsence = async (rblxUser) => {
    await Request("api/staff/" + rblxUser, "PATCH", {$set: {absent: false}})
    location.reload()
}

export const applyAbsence = async (rblxUser,leaveType,untilDate,reason) => {
    const data = {
        absent: true,
        absentType: leaveType,
        absentUntil: untilDate,
        absentReason: reason
    }

    await Request("api/staff/" + rblxUser, "PATCH", {$set: data})
    location.reload()
}

export const editStaffProperties = async (rblxUser,dscUser,email,comments,pronouns,id) => {
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

export function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}