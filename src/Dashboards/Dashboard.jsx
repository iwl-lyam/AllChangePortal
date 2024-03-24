import react, {useState, useEffect} from 'react'
import BugReportsAwaitingCheck from "./Widgets/BugReportsAwaitingCheck.jsx";
import {Request} from "../Util.js";
import SuggestionsAwaitingApproval from "./Widgets/SuggestionsAwaitingApproval.jsx";
import MyPosts from "./Widgets/MyPosts.jsx";
import Tasks from "./Widgets/Tasks.jsx";
import Notifications from "./Widgets/Notifications.jsx";
import CompletedTasks from "./Widgets/CompletedTasks.jsx";
import StaffList from "./Widgets/StaffList.jsx"
import Warnings from "./Widgets/Warnings.jsx"
import MainForm from "../Login/MainForm.jsx";

export default function Dashboard() {
    const [config, setConfig] = useState(null)
    const [bugReports, setBugReports] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [posts, setPosts] = useState([])
    const [tasks, setTasks] = useState([])
    const [notifs, setNotifs] = useState([])
    const [ctasks, setCTasks] = useState([])
    const [perm, setPerm] = useState(0)
    const [staff, setStaff] = useState([])
    const [warnings, setWarnings] = useState([])
    const [loggedIn, setLI] = useState(true)

    useEffect(() => {
        const f = async () => {
            if (localStorage.token) {

                let con = await Request("api/dash")
                setConfig(con)
                console.log("hook "+con)

                try {
                    let a = con.configuration
                } catch {
                    await Request("api/dash", "POST", {config: []})
                }

                setBugReports(await Request("api/bugreports?status=0"))
                setSuggestions(await Request("api/suggestions?status=0"))
                let req = await Request("api/suggestions?user=1")
                setPosts(req)
                const tasksStatus0 = await Request("api/tasks?status=0")
                setTasks(tasksStatus0)
                req = await Request("api/notifs", "GET", {}, true)
                setNotifs(req)
                const tasksStatus1 = await Request("api/tasks?status=1")
                setCTasks(tasksStatus1)
                setPerm((await Request("rpc/getUserStatus")).status)
                setStaff(await Request("api/staff"))
                setWarnings(await Request("api/warnings"))
            } else setLI(false)
        }
        f().then(r => {})
    }, [])

    if (!loggedIn) return (
        <MainForm />
    )

    let dash = []
    try {
        let d = []
        config.configuration.forEach(e => {
            switch (e) {
                case 'BugReportsAwaitingCheck':
                    if (perm > 0)d.push(<BugReportsAwaitingCheck brItems={bugReports}/>)
                    break
                case 'SuggestionsAwaitingApproval':
                    if (perm > 0)d.push(<SuggestionsAwaitingApproval listItems={suggestions}/>)
                    break
                case 'CompletedTasks':
                    if (perm > 0)d.push(<CompletedTasks taskItems={ctasks} />)
                    break
                case 'Tasks':
                    if (perm > 0)d.push(<Tasks notifItems={tasks}/>)
                    break
                case 'Warnings':
                    if (perm > 1)d.push(<Warnings brItems={bugReports}/>)
                    break
                case 'MyPosts':
                    d.push(<MyPosts posts={posts}/>)
                    break
                case 'Notifications':
                    d.push(<Notifications notifications={notifs}/>)
                    break
                case 'StaffList':
                    if (perm > 2) {
                        dash.push(d)
                        d = []
                        d.push(<StaffList staff={staff}/>)
                        dash.push(d)
                        d = []
                    }
                    break
            }
            if (d.length === 2) {
                dash.push(d)
                d = []
            }
        })
        dash.push(d)
    } catch {}

    let cont = []
    dash.forEach(e => cont.push(
        <div className="row justify-content-around">
            {e[0]}
            {e[1]}
        </div>
    ))

    const addConfig = async name => {
        let c = config.configuration || []
        if (!c.includes(name)) {
            c.push(name)
            await Request("api/dash", "PUT", {config: c})
            location.reload()
        } else {
            c.splice(c.indexOf(name), 1)
            await Request("api/dash", "PUT", {config: c})
            location.reload()
        }
    }

    const isActive = name => {
        try {
            let c = config.configuration || []
            console.log(c.includes(name))
            if (c.includes(name)) {
                console.log("h")
                return "active"
            } else {
                return ""
            }
        } catch {
            return ""
        }
    }

    return (
        <div>
            <h1 className="text-center mt-2">Your dashboard</h1>
            <br />
            {cont}
            <div className="dropdown">
                <button className="btn btn-accent-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Manage widgets
                </button>
                <ul className="dropdown-menu">
                    <li><button className={`dropdown-item ${isActive("MyPosts")}`} onClick={() => addConfig('MyPosts')}>Your posts</button></li>
                    <li><button className={`dropdown-item ${isActive("Notifications")}`} onClick={() => addConfig('Notifications')}>Your notifications</button></li>
                    { perm > 0 ? (
                        <div>
                            <li><button className={`dropdown-item ${isActive("BugReportsAwaitingCheck")}`} onClick={() => addConfig('BugReportsAwaitingCheck')}>Bug reports awaiting review</button></li>
                            <li><button className={`dropdown-item ${isActive("SuggestionsAwaitingApproval")}`} onClick={() => addConfig('SuggestionsAwaitingApproval')}>Suggestions awaiting review</button></li>
                            <li><button className={`dropdown-item ${isActive("Tasks")}`} onClick={() => addConfig('Tasks')}>Tasks in progress</button></li>
                            <li><button className={`dropdown-item ${isActive("CompletedTasks")}`} onClick={() => addConfig('CompletedTasks')}>Tasks completed</button></li>
                            { perm > 1 ? (
                                <div>
                                <li><button className={`dropdown-item ${isActive("Warnings")}`} onClick={() => addConfig('Warnings')}>User warnings</button></li>
                                { perm > 2 ? (
                                    <li><button className={`dropdown-item ${isActive("StaffList")}`} onClick={() => addConfig('StaffList')}>Staff database</button></li>
                                ) : <div></div>}
                            </div>) : <div></div>}

                        </div>) : <div></div>}
                    </ul>
            </div>
        </div>
    )
}
