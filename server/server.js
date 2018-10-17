var mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
const parametre = { useNewUrlParser: true };
mongoose.Promise = global.Promise;
mongoose.connect(url,parametre);

var Todo = mongoose.model('ToDo', {
    text: { type: String},
    completed: {type: Boolean},
    solution: {type: String},
    completedAt: {type: Number}
});

// var newTodo = new Todo({
//     text: 'Cool dinner',
//     completed: true,
//     completedAt: 123456
// });

var newTodo2 = new Todo({
    text: 'I want to sleep.',
    solution: 'Solution',
    completed: false,
    completedAt: 775533
});

newTodo2.save().then((doc)=> {
    console.log('Saved todo', doc)
},(err)=>{
    console.log('Unable to save todo');
});
