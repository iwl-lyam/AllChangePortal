import react, {useState, useEffect} from 'react'
import BugReportsAwaitingCheck from "./Widgets/BugReportsAwaitingCheck.jsx";
import {Request} from "../Util.js";
import SuggestionsAwaitingApproval from "./Widgets/SuggestionsAwaitingApproval.jsx";
import MyPosts from "./Widgets/MyPosts.jsx";
import Tasks from "./Widgets/Tasks.jsx";
import Notifications from "./Widgets/Notifications.jsx";
import CompletedTasks from "./Widgets/CompletedTasks.jsx";

export default function Dashboard() {
    const [config, setConfig] = useState(null)
    const [bugReports, setBugReports] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [posts, setPosts] = useState([])
    const [tasks, setTasks] = useState([])
    const [notifs, setNotifs] = useState([])
    const [ctasks, setCTasks] = useState([])

    useEffect(() => {
        const f = async () => {
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
        }
        f().then(r => {})
    }, [])



    let dash = []
    try {
        let d = []
        config.configuration.forEach(e => {
            switch (e) {
                case 'BugReportsAwaitingCheck':
                    d.push(<BugReportsAwaitingCheck brItems={bugReports}/>)
                    break
                case 'SuggestionsAwaitingApproval':
                    d.push(<SuggestionsAwaitingApproval listItems={suggestions}/>)
                    break
                case 'CompletedTasks':
                    d.push(<CompletedTasks taskItems={ctasks} />)
                    break
                case 'Tasks':
                    d.push(<Tasks notifItems={tasks}/>)
                    break
                case 'MyPosts':
                    d.push(<MyPosts posts={posts}/>)
                    break
                case 'Notifications':
                    d.push(<Notifications notifications={notifs}/>)
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
                    <li><button className={`dropdown-item ${isActive("BugReportsAwaitingCheck")}`} onClick={() => addConfig('BugReportsAwaitingCheck')}>Bug reports awaiting review</button></li>
                    <li><button className={`dropdown-item ${isActive("SuggestionsAwaitingApproval")}`} onClick={() => addConfig('SuggestionsAwaitingApproval')}>Suggestions awaiting review</button></li>
                    <li><button className={`dropdown-item ${isActive("Tasks")}`} onClick={() => addConfig('Tasks')}>Tasks in progress</button></li>
                    <li><button className={`dropdown-item ${isActive("CompletedTasks")}`} onClick={() => addConfig('CompletedTasks')}>Tasks completed</button></li>
                    <li><button className={`dropdown-item ${isActive("MyPosts")}`} onClick={() => addConfig('MyPosts')}>Your posts</button></li>
                    <li><button className={`dropdown-item ${isActive("Notifications")}`} onClick={() => addConfig('Notifications')}>Your notifications</button></li>
                </ul>
            </div>
        </div>
    )
}
