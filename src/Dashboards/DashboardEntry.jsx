import react from 'react'

export default function DashboardEntry() {
    return (
        <div>
            <h1>Dashboard entry</h1>
            <div className="card-group">
                <div className="card border-primary" style={{width: "18rem"}}>
                    <div className="card-body text-primary">
                        <h5 className="card-title">User dashboard</h5>
                        <h6 className="card-subtitle mb-2">Permission level 0</h6>
                        <a href="/dashboards/user" className="card-link">Open dashboard</a>
                    </div>
                </div>

                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Supervisor dashboard</h5>
                        <h6 className="card-subtitle mb-2">Permission level 1</h6>
                        <a href="/dashboards/sup" className="card-link">Open dashboard</a>
                    </div>
                </div>

                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Developer dashboard</h5>
                        <h6 className="card-subtitle mb-2">Permission level 2</h6>
                        <a href="/dashboards/dev" className="card-link">Open dashboard</a>
                    </div>
                </div>

                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Manager dashboard</h5>
                        <h6 className="card-subtitle mb-2">Permission level 3</h6>
                        <a href="/dashboards/manager" className="card-link">Open dashboard</a>
                    </div>
                </div>

                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Executive dashboard</h5>
                        <h6 className="card-subtitle mb-2">Permission level 4</h6>
                        <a href="/dashboards/admin" className="card-link">Open dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    )
}