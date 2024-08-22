const BACKEND_APP_URL = "http://localhost:3000";

// body : {}
export async function addTodo(notes, user_id)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/todo`,
        {
            method: "POST",
            body: JSON.stringify({ notes, user_id }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (res.ok) {
        const data = await res.json();
        return data;

    }
    return null;
}


export async function getAllTodos(user_id)
{
    // console.log("user id is :" + user_id);
    const res = await fetch(`${BACKEND_APP_URL}/api/todo?user_id=${user_id}`);

    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return null;
}


export async function deleteTodo(id,user_id)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/todo/${id}?user_id=${user_id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        })
    if (res.ok) {
        // console.log("data deleted");

    }
}

export async function updateTodo(id, body,user_id)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/todo/${id}?user_id=${user_id}`, {
        method: "PUT",
        body: JSON.stringify({ notes: body }),
        headers: {
            "Content-Type": "application/json"

        }
    })
    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return null;

}

