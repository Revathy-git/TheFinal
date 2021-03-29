export async function getAllUsers() {

    const response = await fetch('/users');
    return await response.json();
}

export async function getUserById() {
    console.log("userservicecheck");
    
    const response = await fetch('/users/:firstname',{
        method: 'GET',

    });
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
      })
    return await response.json();
}


export async function updateProfileInfobyId(data) {
    console.log("inside service")
    const response = await fetch('/api/usersUpdate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
      })
    return await response.json();
}