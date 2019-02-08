const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongouri;
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/posts/', posts);
app.get('/', (req, res) => res.send('hello2'));
const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server running on port ${port}`));
