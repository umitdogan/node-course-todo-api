var mongoose = require('mongoose');

var Todo = mongoose.model('ToDo', {
    text: { type: String, 
        required: true,
        minlength: 1,
        trim : true
    },
    completed: {type: Boolean, default: false},
    solution: {type: String, default: null},
    completedAt: {type: Number},
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {
    Todo
};