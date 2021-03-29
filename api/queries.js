const randomId = require('random-id');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'genesys',
    host: '172.24.135.111',
    database: 'api',
    password: 'genesys',
    port: 5432,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    console.log("HELLO");

}
const updateProfileInfobyId = (request, response) => {
    console.log("check");
    console.log(request.body.data);
    const { email,age ,skills,interests,personalMail,contact,job_title} = request.body.data
    id="xAOn8";
    //const id = request.params.firstname
    console.log(id);
    //pool.query('INSERT INTO users (firstname, lastname, email, age,skills,interests,personalmail,contact,job_title) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)', [ firstName, lastName, email,age,skills,interests,personalMail,contact,job_title], (error, results) => {
    pool.query('UPDATE users SET email = $1 , age =$2,skills=$3,interests=$4,personalmail=$5,contact=$6,job_title=$7  WHERE firstname = $8',[email,age,skills,interests,personalMail,contact,job_title, id],(error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified`)
            console.log("data modified");
            console.log(results);
        }
    )
}
const getProfileInfobyId  = (request, response) => {
    console.log("HELLO");

}
const createUser = (request, response) => {
    console.log(request.body.data);
    const { firstName, lastName, email, role } = request.body.data
    const id = randomId(5);
    console.log(id);
    pool.query('INSERT INTO users (id, firstname, lastname, email, role) VALUES ($1, $2, $3, $4, $5)', [id, firstName, lastName, email, role], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added`)
        console.log(results);
    })
}

const updateUser = (request, response) => {
    const id = request.params.firstname
    const { email } = request.body

    pool.query('UPDATE users SET email = $1 WHERE firstname = $2',[email, id],(error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified`)
        }
    )

}

const deleteUser = (request, response) => {
    const id = request.params.firstname

    pool.query('DELETE FROM users WHERE firstname = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateProfileInfobyId,
    getProfileInfobyId,
    createUser,
    updateUser,
    deleteUser,
}