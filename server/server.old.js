var mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
const parametre = { useNewUrlParser: true };
mongoose.Promise = global.Promise;
mongoose.connect(url, parametre);

// var Todo = mongoose.model('ToDo', {
//     text: { type: String, 
//         required: true,
//         minlength: 1,
//         trim : true
//     },
//     completed: {type: Boolean, default: false},
//     solution: {type: String, default: null},
//     completedAt: {type: Number}
// });

// var newTodo = new Todo({
//     text: 'Cool dinner',
//     completed: true,
//     completedAt: 123456
// });

// var newTodo2 = new Todo({
//     text: 'Edit these video'
// });

// newTodo2.save().then((doc)=> {
//     console.log('Saved todo', doc)
// },(err)=>{
//     console.log('Unable to save todo',err);
// });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});
var user = new User({
    email: 'Adrew2@examples.com'   
});

user.save().then((doc) => {
    console.log('Saved user', doc)
}, (err) => {
    console.log('Unable to save user', err);
});