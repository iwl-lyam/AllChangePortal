import {useEffect, useState} from 'react'
import Login from '../Login/MainForm.jsx'
import Markdown from "react-markdown"
import Stack from "./Stack.jsx"
import {Request} from "../Util.js"
import SuggestionsAwaitingApproval from "./Widgets/SuggestionsAwaitingApproval.jsx";
import BugReportsAwaitingCheck from "./Widgets/BugReportsAwaitingCheck.jsx";
import Tasks from "./Widgets/Tasks.jsx";
import CompletedTasks from "./Widgets/CompletedTasks.jsx";

export default function DeveloperDashboard() {
    const [suggestions, setSuggestions] = useState([])
    const [tasks, setTasks] = useState([])
    const [tasksAssigned, setTasksAssigned] = useState([])
    const [bugreports, setBugReports] = useState([])
    const [taskRecip, setTaskRecip] = useState("")
    const [taskDate, setTaskDate] = useState("")
    const [taskInfo, setTaskInfo] = useState("")
    const [perm, setPerm] = useState(-1)

    const assignTask = async (id) => {
        // await fetch("http://77.68.127.58:8080/rpc/assignTask", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         recipient: taskRecip,
        //         date: taskDate,
        //         info: taskInfo,
        //         id: id
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: sessionStorage.token || localStorage.token
        //     }
        // })
        await Request("rpc/assignTask", "POST", {
                    recipient: taskRecip,
                    date: taskDate,
                    info: taskInfo,
                    id: id
                }, true)
        location.reload()
    }

    const whoIs = id => {
        // <option value="653947bbfbdfe560ae2bb2ab">Jackie (programming)</option>
        // <option value="653945aba66e822aa5c9e8b1">Tiger (blender)</option>
        // <option value="65392288a66e822aa5c9e8ad">Red (programming)</option>
        // <option value="653922eaa66e822aa5c9e8ae">Squid (building)</option>
        // <option value="6539234ba66e822aa5c9e8af">Kylian (blender)</option>
        // <option value="653923c0a66e822aa5c9e8b0">Tom (building)</option>
        // <option value="652866b69e3f09b2723dfd39">Develop (web)</option>

        switch (id) {
            case "653947bbfbdfe560ae2bb2ab":
                return "Jackie"
            case "653945aba66e822aa5c9e8b1":
                return "Tiger"
            case "65392288a66e822aa5c9e8ad":
                return "Red"
            case "653922eaa66e822aa5c9e8ae":
                return "Squid"
            case "6539234ba66e822aa5c9e8af":
                return "Kylian"
            case "653923c0a66e822aa5c9e8b0":
                return "Tom"
            case "652866b69e3f09b2723dfd39":
                return "Develop"
            default:
                return "ID not found"
        }
    }

    useEffect(() => {
        const f = async () => {
            const bugReportsStatus0 = await Request("api/bugreports?status=0")
            setBugReports(bugReportsStatus0)
            const suggestionsStatus0 = await Request("api/suggestions?status=0")
            setSuggestions(suggestionsStatus0)
            const tasksStatus0 = await Request("api/tasks?status=0")
            setTasks(tasksStatus0)
            const tasksStatus1 = await Request("api/tasks?status=1")
            setTasksAssigned(tasksStatus1)
            setPerm((await Request("rpc/getUserStatus")).status)
        }
        f().then(r => {})
    }, [])

    if (perm > 1)
    return (
        <div>
            {!localStorage.token && !sessionStorage.token ? <Login/> : (
                <div>
                    <h1 className="text-center p-4">Developer dashboard</h1>
                    <div className="mt-4">
                        <div className="container-fluid">
                            <div className="row justify-content-around mb-4">
                                <SuggestionsAwaitingApproval listItems={suggestions} />
                                <BugReportsAwaitingCheck brItems={bugreports} />

                            </div>
                            <div className="row justify-content-around mb-4">
                                <Tasks notifItems={tasks} />
                                <CompletedTasks taskItems={tasksAssigned} />
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>)}
        </div>
    )
    else if (perm === -1) return (
        <p>Loading...</p>
    )
    else return (
        <h1>403. How did you get here?</h1>
    )
}