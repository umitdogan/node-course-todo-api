const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5bc8f746e7316c26441a3521';

if (!ObjectID.isValid(id)) {
    console.log('ID not Valid.')
}
// Todo.find({
//     _id : id
// }).then((todos)=>{
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id : id
// }).then ((todo)=> {
//     console.log('Todo:', todo);
// });

Todo.findById(id).then((todo)=> {
    if (!todo) {
        return console.log('Id not found.');
    }
    console.log('Todo by id. : ',todo);
});

var userId = '5bc7288f890f7223dcad3bb8';

User.findById(userId).then((user)=> {
    if(!user) {
        return console.log('Unable to find user.');
    }
    console.log(JSON.stringify(user,undefined,2));
},(e)=> {
    console.log(e)
});
