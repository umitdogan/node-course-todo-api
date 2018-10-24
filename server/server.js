require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');
var app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;
//console.log(process.env);

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log (req.body);
    
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        //console.log(doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {

    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=> {
        res.status(400).send(e)
    });
});

app.get('/todos/:id', (req,res) =>{
    //res.send(req.params);
    id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=> {
        if (!todo) {
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch((e)=>{
        return res.status(404).send();
    });
});

app.delete('/todos/:id', (req,res) =>{
    id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'id is invalid.'});
    }

    Todo.findByIdAndRemove(id).then((todo)=> {
        if (!todo) {
            return res.status(404).send({error: 'no document.'});
        }
        return res.send({todo});
    }).catch((e)=>{
        return res.status(400).send();
    });
});

app.patch('/todos/:id', (req,res) =>{
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

    Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=>{
        if(!todo) {
            return res.status(404).send({error: 'no document.'});
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send({error: 'id is invalid.'});
    });


});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports= {app};
