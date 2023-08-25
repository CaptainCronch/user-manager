var express = require('express');
var fs = require('fs')
const { v4: uuid } = require('uuid')

var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/static'));

var users = {}
fs.readFile('users.json', "utf-8",(err, data) => {
    users = JSON.parse(data)
})

app.listen(5050, () => {
    console.log("server listening on port 5050")
})

app.get('/', (request, response) => {
    response.send('<h1><b>go to /create to create user, and go to /list to list users</b></h1>');
});

app.get('/time', (request, response) => {
    response.send(`<h1>${new Date()}</h1>`);
});

app.get('/create', (request, response) => {
    fs.readFile('./static/create.html', (err, data) => {
        response.send(data.toString());
    })
})

app.get('/list', (request, response) => {
    fs.readFile('./static/list.html', (err, data) => {
        response.send(data.toString());
    })
})

app.get('/edit', (request, response) => {
    fs.readFile('./static/edit.html', (err, data) => {
        response.send(data.toString());
    })
})

app.get('/users', (request, response) => {
    fs.readFile('./users.json', (err, data) => {
        response.send(data.toString());
    })
})

app.post('/users', (request, response) => {
    console.log(request.body.username)
    let user = {
        username: request.body.username,
        email: request.body.email,
        name: request.body.name,
        age: parseInt(request.body.age),
        uuid: uuid(),
    }

    if (user.username == null || user.email == null || user.name == null || user.age == null){
        response.status(400)
        response.send('Bad Request')
        return
    }

    users["users"].push(user)
    updateFile()
    response.status(200)
    response.send('OK')
})

app.delete('/users', (req, res) => {
    let deleteID = req.body.uuid
    console.log(deleteID)
    for (i in users['users']){
        if (users['users'][i].uuid == deleteID){
            users['users'].splice(i, 1)
            updateFile()
            break
        }
    }
})

app.patch('/users', (req, res) => {
    let editID = req.body.uuid
    console.log(editID)
    for (i in users['users']){
        if (users['users'][i].uuid == editID){
            users['users'][i] = req.body
            updateFile()
            break
        }
    }
})

function updateFile(){
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), 'utf-8', err => {if (err) throw err;})
}
