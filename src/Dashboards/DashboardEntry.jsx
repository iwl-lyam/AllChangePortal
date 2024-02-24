import React, {useEffect, useState} from 'react'
import Login from "../Login/MainForm.jsx"
import {Request} from "../Util.js"

export default function DashboardEntry() {
    const [perm, setPerm] = useState(0)
    useEffect(() => {
        const f = async () => {
            // const req = await fetch("http://77.68.127.58:8080/rpc/getUserStatus", {
            //     headers: {
            //         Authorization: sessionStorage.token || localStorage.token
            //     }
            // })
            // setPerm(await req.json())
            const req = await Request("rpc/getUserStatus")
            setPerm(req)
        }
        f().then(()=>{})
    }, [])
    return (<div>
        {!localStorage.token && !sessionStorage.token ? <Login/> : (<div>
                <h1>Dashboard entry</h1>

                <div className="">
                    <br />
                    <div className="card bg-info mb-3" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Standard Dashboard</h5>
                            <h6 className="card-subtitle mb-2">Permission level 0</h6>
                            <a href="/dashboards/main" className="card-link text-dark">Open dashboard</a>
                        </div>
                    </div>

                    <br/>
                    {perm.status > 0 ? (<div>
                        <h2>Elevated permissions</h2>
                        <pre>Developer and Supervisor dashboards are deprecated. Please use the unified dashboard if possible.</pre>
                        <br/>
                        <div className="card bg-info mb-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Supervisor dashboard</h5>
                                <h6 className="card-subtitle mb-2">Permission level 1</h6>
                                <a href="/dashboards/sup" className="card-link text-dark">Open dashboard</a>
                            </div>
                        </div>
                    </div>) : <span></span>}


                    {perm.status > 1 ? (<div>

                            <div className="card bg-danger mb-3 text-light" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Developer dashboard</h5>
                                <h6 className="card-subtitle mb-2">Permission level 2</h6>
                                <a href="/dashboards/dev" className="card-link text-light">Open dashboard</a>
                            </div>
                        </div>
                        </div>) : <span></span>}


                        {perm.status > 2 ? (<div>


                                <div className="card bg-success mb-3 text-light" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Manager dashboard</h5>
                                <h6 className="card-subtitle mb-2">Permission level 3</h6>
                                <a href="/dashboards/manager" className="card-link text-light">Open
                                    dashboard</a>
                            </div>
                        </div>

                        </div>) : <span></span>}

                        {perm.status > 1 ? (<div>



                            <div className="card bg-warning mb-3 text-dark" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Database reference</h5>
                                <h6 className="card-subtitle mb-2">Permission level 2</h6>
                                <a href="/database" className="card-link text-dark">Open
                                    database</a>
                            </div>
                        </div>

                        </div>) : <span></span>}


                            {/*<div className="card bg-warning mb-3" style={{width: "18rem"}}>*/}
                        {/*    <div className="card-body">*/}
                        {/*        <h5 className="card-title">Executive dashboard</h5>*/}
                        {/*        <h6 className="card-subtitle mb-2">Permission level 4</h6>*/}
                        {/*        <a href="/dashboards/admin" className="card-link">Open dashboard</a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                </div>
            </div>
                )}
            </div>)}