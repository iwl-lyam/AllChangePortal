/**
 * Request - Sends an HTTP request to the API/RPC
 * @param {string} endpoint
 * @param {string?} method
 * @param {Object?} body
 * @param {boolean?} auth
 * @returns {Promise<any>}
 */
export const Request = async (endpoint, method="GET", body={}, auth=true) => {
    if (method === "GET") {
        let req = await fetch("https://allchange.xyz/"+endpoint, {
        // let req = await fetch("http://localhost:8080/"+endpoint, {
        headers: {
                Authorization: (auth ? localStorage.token : "")
            },
            type: "no-cors"
        })
        try {
            let res = await req.json()
            try {
                if (res.code === "400-3") {
                    localStorage.token = res.token
                    return await Request(endpoint,method,body,auth)
                }
            } catch {}
            return res
        } catch(err) {
            console.log(err)
        }
    } else {
        let req = await fetch("https://allchange.xyz/"+endpoint, {
        // let req = await fetch("http://localhost:8080/"+endpoint, {
            headers: {
                Authorization: (auth ? localStorage.token : ""),
                "Content-Type": "application/json"
            },
            method: method,
            body: JSON.stringify(body),
            type: "no-cors"
        })
        try {
            let res = await req.json()
            try {
                if (res.code === "400-3") {
                    localStorage.token = res.token
                    return await Request(endpoint,method,body,auth)
                }
            } catch {}
            return res
        } catch(err) {
            console.log(err)
        }
    }
}

export const ExternalRequest = async (endpoint, method, body) => {
    let req = await fetch(endpoint, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    try {
        return req.json()
    } catch(err) {
        console.log(err)
    }
}
export const ExternalGet = async (endpoint, headers) => {
    let req = await fetch(endpoint, {
        mode: "no-cors",
        headers: headers,
        credentials: "include"
    })

    let res = await req.json()
    console.log(res)
    return res

    try {
        let res = await req.json()
        console.log(res)
        return res
    } catch(err) {
        console.log(err)
    }
}
