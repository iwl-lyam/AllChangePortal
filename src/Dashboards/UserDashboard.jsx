import react, {useState, useEffect} from 'react'
import Login from '../Login/MainForm.jsx'
import $ from 'jquery';

export default function UserDashboard() {
    const [posts, setPosts] = useState([])
    const [notifs, setNotifs] = useState([])

    useEffect(() => {
        const f = async () => {
            const req = await fetch("http://localhost:8080/api/suggestions?user=1", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token
                }
            })
            setPosts(await req.json())

            const req2 = await fetch("http://localhost:8080/api/notifs", {
                headers: {
                    Authorization: sessionStorage.token || localStorage.token
                }
            })
            setNotifs(await req2.json())
        }
        f().then(r => {
        })
    }, [])

    const listItems = posts.map(post => (
        <div>
            <button onClick={() => {
                $('#collapseExample').collapse({
                    toggle: true
                })
            }} type="button" className="btn mx-auto border border-dark pt-2 m-2 text-center bg-light w-100">
                <h3>{post.title}</h3>
                <p>Status: {post.status}</p>
            </button>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
            </div>


        </div>
    ));

    return (
        <div>
            <button type="button" className="btn btn-lg btn-danger" data-toggle="popover" title="Popover title"
                    data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover
            </button>

            {!localStorage.token && !sessionStorage.token ? <Login/> : (
                <div>

                <h1 className="text-center">User dashboard</h1>
                    <div className="mt-4">
                        <div className="container-fluid">
                            <div className="row justify-content-around">
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">My posts</h2>
                                    {listItems}
                                </div>
                                <div className="col-5 border border-primary rounded">
                                    <h2 className="text-center p-3">Notifications</h2>
                                </div>
                            </div>
                        </div>
            </div>
                </div>)}
        </div>
    )
}