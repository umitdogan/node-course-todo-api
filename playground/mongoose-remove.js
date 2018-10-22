const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

Todo.remove({}).then((result)=>{
    console.log(result);
});

// Todo.findOneAndDelete({_id:'5bc8f746e7316c26441a3520'}).then((todo)=> {
//     console.log(todo);
// });

// Todo.findByIdAndDelete('5bcb08a619c1f62bc80ae4c0').then((todo)=> {
//     console.log(todo);
// });