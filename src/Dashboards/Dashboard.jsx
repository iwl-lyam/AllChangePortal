import react, {useState, useEffect} from 'react'
import BugReportsAwaitingCheck from "./Widgets/BugReportsAwaitingCheck.jsx";
import {Request} from "../Util.js";
import SuggestionsAwaitingApproval from "./Widgets/SuggestionsAwaitingApproval.jsx";

export default function Dashboard() {
    const [config, setConfig] = useState(null)
    const [bugReports, setBugReports] = useState([])
    const [suggestions, setSuggestions] = useState([])

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
            }
            if (d.length === 2) {
                dash.push(d)
                d = []
            }
        })
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
        c.push(name)
        await Request("api/dash", "PUT", {config: c})
        location.reload()
    }

    return (
        <div>
            <h1 className="text-center mt-2">Your dashboard</h1>
            <br />
            {cont}
            <div className="dropdown">
                <button className="btn btn-accent-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add new widget
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={() => addConfig('BugReportsAwaitingCheck')}>Bug reports awaiting review</button></li>
                    <li><button className="dropdown-item" onClick={() => addConfig('SuggestionsAwaitingApproval')}>Suggestions awaiting review</button></li>
                    <li><button className="dropdown-item" onClick={() => addConfig('Tasks')}>Tasks in progress</button></li>
                    <li><button className="dropdown-item" onClick={() => addConfig('CompletedTasks')}>Tasks completed</button></li>
                    <li><button className="dropdown-item" onClick={() => addConfig('StaffList')}>Staff member list</button></li>
                </ul>
            </div>
        </div>
    )
}
