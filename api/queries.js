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
    const id = request.params.firstname

    pool.query('SELECT * FROM users WHERE firstname = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const updateProfileInfo = (request, response) => {
    const { firstName, lastName, email, age, role,skills,interests,personalMail,contact} = request.body.data
    const id = request.params.firstname
    pool.query('INSERT INTO users (id, firstname, lastname, email,age, role,skills,interests,personalMail,contact) VALUES ($1, $2, $3, $4, $5)', [id, firstName, lastName, email, age, role,skills,interests,personalMail,contact], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Profile Updated`)
    })
}
const getProfileInfo  = (request, response) => {
    const id = request.params.firstname

    pool.query('SELECT * FROM users WHERE firstname = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    console.log(request.body.data);
    const { firstName, lastName, email, role } = request.body.data
    const id = randomId(5);
    pool.query('INSERT INTO users (id, firstname, lastname, email, role) VALUES ($1, $2, $3, $4, $5)', [id, firstName, lastName, email, role], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added`)
    })
}

const updateUser = (request, response) => {
    const id = request.params.firstname
    const { email } = request.body

    pool.query(
        'UPDATE users SET email = $1 WHERE firstname = $2',
        [email, id],
        (error, results) => {
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
    updateProfileInfo,
    getProfileInfo,
    createUser,
    updateUser,
    deleteUser,
}