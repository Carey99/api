/**
 * - We'll be implementing CRUD operation
 */

//modules and depencies required
const express = require('express');
const bcrypt =  require('bcrypt');

//Instantiate In memory storage
let users = []

//Default user ID, will increase as the number of users increases
let userId =  1;

//start app
const app = express();
//middleware
app.use(express.json());

//GET (all users)
app.get('/users', (req, res) => {
    res.send(users)
});

//GET (One user using Id)
app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).send('Ooops! user not found');
    }
    res.send(user);
});

//POST method
app.post('/users', async (req, res) => {
    const { email, password } = req.body;

    //validate email and password
    if (!email || !password) {
        res.status(400).send('Please provide email and password');
    }

    //Ensure user provided doesn't exists
    const user = users.some(user => user.email === email);

    if (user) {
        res.status(409).send('User already exist');
    }
    try {
        const hashed_psswd = await bcrypt.hash(password, 10);
        users.push({ id: userId++, email, password: hashed_psswd }); //user id increases with the number of users stored
        res.status(201).send('User created successfully');
    } catch(err) {
        console.log(err)
    }
});
//PUT method
app.put('/users/:id', async (req, res) => {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
        res.status(400).send('Please provide email and password');
    }

    const user = users.find(user => user.id === parseInt(req.params.id));
    //check if the user exists once more
    if (!user) {
        res.status(404).send('user not found');
    }

    const hashed_psswd = await bcrypt.hash(password, 10);

    user.email = email;
    user.password = hashed_psswd;
    res.status(200).send('User updated successfully');
});

app.delete('/users/:id', (req, res) => {
    const usr_idx = users.findIndex(user => user.id === parseInt(req.params.id));

    if (usr_idx === -1) {
        res.status(404).send('user not found')
    }
    users.splice(usr_idx, 1)
    res.status(200).send('User Deleted successfully')
});

//start app
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/users')
});