const BACKEND_APP_URL = "http://localhost:3000";



export async function AddUser(name, email, password)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/user/signup`, {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, password: password }),
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (res.ok) {
        // console.log("User Added");
        const data = await res.json();
        return data;
    }
    return null;

}

export async function AuthenticateUser(email, password)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/user/`, {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (res.ok) {
        // console.log("User Authentiacted");
        const data = await res.json();
        // console.log(data);
        return data;
    }
    return null;

}


export async function isValidUserId(user_id)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/user/auth`, {
        method: "POST",
        body: JSON.stringify({ user_id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        // console.log("id verified");
        const data = await res.json();
        // console.log(data);
        return data;
    }
    return null;
}