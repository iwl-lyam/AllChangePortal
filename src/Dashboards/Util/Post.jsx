import react, {useState, useEffect} from 'react'

export default function Post({postId}) {
    const [post, setPost] = useState({})

    useEffect(async () => {
        const req = await fetch("http://localhost:8080/api/suggestions?postId="+postId, {
            headers: {
                Authorization: sessionStorage.token || localStorage.token
            }
        })
        setPost(await req.json())
    }, [])

    return (
        <div>
            <p>{post.title}</p>
        </div>
    )
}