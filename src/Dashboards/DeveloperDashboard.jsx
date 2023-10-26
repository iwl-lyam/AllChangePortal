import react, {useEffect, useState} from 'react'
import {Request} from '../Util.js'
import Stack from "./Stack.jsx";

export default function DevDashboard() {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    useEffect(() => {
        const f = async () => {
            const req1 = await Request("api/tasks?assignee=1&status=1")
            setTasks(req1)

            const req2 = await Request("api/tasks?assignee=1&status=2")
            setCompletedTasks(req2)
        }
        f().then(()=>{})
    }, [])

    const tasksList = tasks.map(task => {
        return (
            <div>
                <button data-toggle="modal" data-target={`#modal-${task._id}`} type="button"
                        className="btn btn-light mx-auto border border-dark pt-2 m-2 text-center w-100">
                    <h3>{task.title}</h3>
                    <p className="mb-1">Due {(new Date(task.date)).toDateString()}</p>
                </button>

                <div className="modal fade" id={`modal-${task._id}`} role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{task.title}</h4>
                                <button type="button" className="close border-0" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>{task.description}</p>
                                <p><strong>Comments from project leader:</strong> {task.info}</p>
                                <p><strong>Due date:</strong> {(new Date(task.date)).toDateString()}</p>

                                <div className="p-2 border border-primary rounded">
                                    <p><strong>Complete task</strong></p>
                                    <p>By pressing this button you confirm that this task has been completed, and will be reviewed by Project Leaders.</p>
                                    <button className="btn btn-danger" onClick={async () => {
                                        await Request("rpc/completeTask?id="+task._id, "POST")
                                    }}>Complete task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    const completedTasksList = completedTasks.map(task => {
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
                                <Stack>
                                    {tasksList}
                                </Stack>
                            </div>
                            <div className="col-5 border border-primary rounded">
                                <h1 className="text-center p-3">Completed tasks</h1>
                                <Stack>
                                    {completedTasksList}
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}