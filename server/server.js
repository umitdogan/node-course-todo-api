require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {SHA256} = require('crypto-js');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

var app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;
//console.log(process.env);

var app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    //console.log (req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator : req.user._id
    });
    todo.save().then((doc) => {
        //console.log(doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {

    Todo.find({ _creator : req.user._id}).then((todos)=>{
        res.send({todos});
    },(e)=> {
        res.status(400).send(e)
    });
});

app.get('/todos/:id', authenticate, (req,res) =>{
    //res.send(req.params);
    id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOne({
        _id : id,
        _creator: req.user._id
    }).then((todo)=> {
        if (!todo) {
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch((e)=>{
        return res.status(404).send();
    });
});

app.delete('/todos/:id', authenticate, (req,res) =>{
    id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'id is invalid.'});
    }

    Todo.findOneAndRemove({
        _id:id,
        _creator: req.user._id
    }).then((todo)=> {
        if (!todo) {
            return res.status(404).send({error: 'no document.'});
        }
        return res.send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req,res) =>{
    id = req.params.id;
    var body = _.pick(req.body,['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'id is invalid.'});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    };

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id }, {$set:body}, {new: true}).then((todo)=>{
        if(!todo) {
            return res.status(404).send({error: 'no document.'});
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send({error: 'id is invalid.'});
    });


});

// POST /User
app.post('/users', (req, res) => {
    //console.log (req.body);
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    
    user.save().then((user) => {
        return user.generateAuthToken(); 
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate,(req,res)=>{
    res.send(req.user);    
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email, body.password).then((user) =>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
         });
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, ()=>{ 
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports= {app};
