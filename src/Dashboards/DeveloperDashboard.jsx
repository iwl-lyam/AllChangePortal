import react, {useEffect, useState} from 'react'
import {Request} from '../Util.js'

export default function DevDashboard() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const f = async () => {
            const req1 = await Request("api/tasks?assignee=1")
            setTasks(req1)
        }
        f().then(()=>{})
    })

    const tasksList = tasks.map(task => {
        return (
            <div>
                <p>{task.title}</p>
            </div>
        )
    })

    return (
        <div>
            <h1 className="text-center">Developer dashboard</h1>
            <div>
                <div className="mt-4">
                    <div className="container-fluid">
                        <div className="row justify-content-around mb-4">
                            <div className="col-5 border border-primary rounded">
                                <h1 className="text-center p-3">Assigned tasks</h1>

                            </div>
                            <div className="col-5 border border-primary rounded">
                                <h1 className="text-center p-3">Completed tasks</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}