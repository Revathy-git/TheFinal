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
export async function getCourses(firstName) {
    // const response = await fetch(`/api/users`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({data})
    //   })
    // return await response.json();
    console.log("getCourses method",firstName)
    return ["aaa","bbb"]
}

export async function getQuestions(firstName){
    console.log("inside getQuestions", firstName)
    const response = await fetch(`/api/users/${firstName}`);
    const data = await response.json();
    console.log("ddd",JSON.stringify({data}))
    return data
    //console.log("getQuestions method",firstName)
    //return ["q111","q222"]
}

export async function getQuestionsService(){
    console.log("inside getQuestionsService")
    const response = await fetch('http://fce-u0263.us.int.genesyslab.com:5070/qa?topic=android', {
        method: "GET",
        headers: {
             "Access-Control-Allow-Origin": "*"
        } })
    const data = await response.json();
    console.log("ddd",JSON.stringify({data}))
    return data
    //console.log("getQuestions method",firstName)
    //return ["q111","q222"]

}