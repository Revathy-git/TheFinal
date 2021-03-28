const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3080
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'genesys',
    host: '127.0.0.1',
    database: 'api',
    password: 'genesys',
    port: 5432,
})
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:firstname', db.getUserById)
app.post('/api/users', db.createUser)
app.put('/users/:firstname', db.updateUser)
app.delete('/users/:firstname', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})