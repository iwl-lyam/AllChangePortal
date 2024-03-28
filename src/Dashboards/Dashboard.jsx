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

    const [posBorder, setPB] = useState(false)
    const [notBorder, setNB] = useState(false)
    const [warBorder, setWB] = useState(false)
    const [bugBorder, setBB] = useState(false)
    const [sugBorder, setSB] = useState(false)
    const [tasBorder, setTB] = useState(false)
    const [ctaBorder, setCB] = useState(false)
    const [staBorder, setSTB] = useState(false)


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

                setPerm((await Request("rpc/getUserStatus")).status)


            } else setLI(false)
        }
        f().then(r => {})
    }, [])

    useEffect(() => {
        if (!config) return
        (async function() {
            if (config.configuration.includes("BugReportsAwaitingCheck")) setBugReports(await Request("api/bugreports?status=0"))
            if (config.configuration.includes("SuggestionsAwaitingApproval")) setSuggestions(await Request("api/suggestions?status=0"))
            if (config.configuration.includes("MyPosts")) setPosts(await Request("api/suggestions?user=1"))
            if (config.configuration.includes("Tasks")) setTasks(await Request("api/tasks?status=0"))
            if (config.configuration.includes("Notifications")) setNotifs(await Request("api/notifs", "GET", {}, true))
            if (config.configuration.includes("CompletedTasks")) setCTasks(await Request("api/tasks?status=1"))
            if (config.configuration.includes("StaffList")) setStaff(await Request("api/staff"))
            if (config.configuration.includes("Warnings")) setWarnings(await Request("api/warnings"))
        })()
    }, [config])

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
        setPB(!posBorder)
        if (!c.includes(name)) {
            c.push(name)
            await Request("api/dash", "PUT", {config: c})
        } else {
            c.splice(c.indexOf(name), 1)
            await Request("api/dash", "PUT", {config: c})
        }
    }

    const isActive = name => {
        try {
            let c = config.configuration || []
            console.log(c.includes(name))
            if (c.includes(name)) {
                console.log("h")
                return "btn-primary"
            } else {
                return "btn-background-dark"
            }
        } catch {
            return "btn-background-dark"
        }
    }

    return (
        <div>
            <h1 className="text-center mt-2">Dashboard</h1>
            <div className="text-center"><button className="btn btn-accent-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Configuration</button></div>
            <div className="modal fade text-primary-dark" data-bs-backdrop="static" data-bs-keyboard="false" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Dashboard configuration</h5>
                        </div>
                        <p className="ms-3 mb-1 pb-0 mt-2">Select widgets you want to see</p>
                        <div className="modal-body">
                            {/*<div className="form-check form-switch">*/}
                            {/*    <input className="form-check-input" type="checkbox" role="switch" id="postsCheckbox" onChange={() => addConfig("Posts")}  />*/}
                            {/*    <label className="form-check-label" htmlFor="postsCheckbox">Your posts</label>*/}
                            {/*</div>*/}
                            {/*<div className="form-check form-switch">*/}
                            {/*    <input className="form-check-input" type="checkbox" role="switch" id="notifCheckbox"  onChange={() => addConfig("Notifications")} />*/}
                            {/*    <label className="form-check-label" htmlFor="notifCheckbox">Your notifications</label>*/}
                            {/*</div>*/}

                            <div className="">
                                <button className={`btn m-1 ${isActive("MyPosts")}`} onClick={() => {
                                    addConfig('MyPosts')
                                }}>Your posts</button>
                                <button className={`btn m-1 ${isActive("Notifications")}`} onClick={() => {
                                    addConfig('Notifications')
                                }}>Your notifications</button>
                                { perm > 0 ? (
                                    <div>
                                        <button className={`btn m-1 ${isActive("Warnings")}`} onClick={() => {
                                            addConfig('Warnings')
                                        }}>User warnings</button>
                                        { perm > 1 ? (
                                        <div>
                                            <button className={`btn m-1 ${isActive("BugReportsAwaitingCheck")}`} onClick={() => addConfig('BugReportsAwaitingCheck')}>Bug reports awaiting review</button>
                                            <button className={`btn m-1 ${isActive("SuggestionsAwaitingApproval")}`} onClick={() => addConfig('SuggestionsAwaitingApproval')}>Suggestions awaiting review</button>
                                            <button className={`btn m-1 ${isActive("Tasks")}`} onClick={() => addConfig('Tasks')}>Tasks in progress</button>
                                            <button className={`btn m-1 ${isActive("CompletedTasks")}`} onClick={() => addConfig('CompletedTasks')}>Tasks completed</button>

                                            { perm > 2 ? (
                                                <button className={`btn m-1 ${isActive("StaffList")}`} onClick={() => addConfig('StaffList')}>Staff database</button>
                                            ) : <div></div>}
                                        </div>) : <div></div>}

                                    </div>) : <div></div>}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => location.reload()}>Save and close</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            {cont}
            {/*<div className="dropdown">*/}
            {/*    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
            {/*        Manage widgets*/}
            {/*    </button>*/}
            {/*    <ul className="dropdown-menu">*/}
            {/*        <li><a href="#" className={`dropdown-item ${isActive("MyPosts")}`} onClick={() => addConfig('MyPosts')}>Your posts</a></li>*/}
            {/*        <li><a href="#" className={`dropdown-item ${isActive("Notifications")}`} onClick={() => addConfig('Notifications')}>Your notifications</a></li>*/}
            {/*        { perm > 0 ? (*/}
            {/*            <div>*/}
            {/*                <li><a href="#" className={`dropdown-item ${isActive("Warnings")}`} onClick={() => addConfig('Warnings')}>User warnings</a></li>*/}
            {/*                { perm > 1 ? (*/}
            {/*                <div>*/}
            {/*                    <li><a href="#" className={`dropdown-item ${isActive("BugReportsAwaitingCheck")}`} onClick={() => addConfig('BugReportsAwaitingCheck')}>Bug reports awaiting review</a></li>*/}
            {/*                    <li><a href="#" className={`dropdown-item ${isActive("SuggestionsAwaitingApproval")}`} onClick={() => addConfig('SuggestionsAwaitingApproval')}>Suggestions awaiting review</a></li>*/}
            {/*                    <li><a href="#" className={`dropdown-item ${isActive("Tasks")}`} onClick={() => addConfig('Tasks')}>Tasks in progress</a></li>*/}
            {/*                    <li><a href="#" className={`dropdown-item ${isActive("CompletedTasks")}`} onClick={() => addConfig('CompletedTasks')}>Tasks completed</a></li>*/}

            {/*                    { perm > 2 ? (*/}
            {/*                        <li><a href="#" className={`dropdown-item ${isActive("StaffList")}`} onClick={() => addConfig('StaffList')}>Staff database</a></li>*/}
            {/*                    ) : <div></div>}*/}
            {/*                </div>) : <div></div>}*/}

            {/*            </div>) : <div></div>}*/}
            {/*    </ul>*/}
            {/*</div>*/}

        </div>
    )
}
