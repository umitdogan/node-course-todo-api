var mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
const parametre = { useNewUrlParser: true };
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || url, parametre);

module.exports = {
    mongoose
};
