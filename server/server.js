var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');
var app = express();
const port = process.env.PORT || 3000;
console.log(process.env);

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log (req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        console.log(doc);
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
        return res.send(todo);
    }).catch((e)=>{
        return res.status(404).send();
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports= {app};
