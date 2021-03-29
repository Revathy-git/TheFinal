export async function getAllUsers() {

    const response = await fetch('/users');
    return await response.json();
}

export async function getUserById(info) {
    console.log("userservicecheck",info);
    const response = await fetch(`/api/users/${info}`);
    const data = await response.json();
    console.log("ddd",JSON.stringify({data}))
    return data
}

export async function createUser(data) {
    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
      })
    return await response.json();
}

<<<<<<< HEAD

=======
>>>>>>> b8858a0b2059949cda57d4ee4676988e35e8aa0b
export async function updateProfileInfobyId(data) {
    console.log("inside service")
    const response = await fetch('/api/usersUpdate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data})
    })
    return await response.json();
<<<<<<< HEAD
 }

=======
}
>>>>>>> b8858a0b2059949cda57d4ee4676988e35e8aa0b
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
         })
    const data = await response.json();
    console.log("ddd",JSON.stringify({data}))
    return data
    //console.log("getQuestions method",firstName)
    //return ["q111","q222"]
<<<<<<< HEAD
=======

}

export async function validateAnswer(question,answer){
    console.log("inside validateAnswer")
    const response = await fetch('http://fce-u0263.us.int.genesyslab.com:5070/evaluate', {
        method: "POST",
        headers: {"Content-Length": 3499, "Content-Type": "application/json"},
        body: JSON.stringify({"topic": "android","question": question,"answer": answer})
         })
    const data = await response.json();
    console.log("ddd",JSON.stringify({data}))
    return data
    //return {"code": "0", "score": 64.42}
>>>>>>> b8858a0b2059949cda57d4ee4676988e35e8aa0b
}