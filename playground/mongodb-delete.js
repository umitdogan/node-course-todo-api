const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect((err, client) => {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').deleteMany({
    //     "text" : "Walk the dog",
    //     "completed" : false
    // }).then((result)=> console.log(result),(err) => console.log(err));

    // db.collection('Todos').deleteOne({
    //     "text" : "Walk the dog"
    // }).then((result)=> console.log(result),(err) => console.log(err));
    
    // db.collection('Todos').findOneAndDelete({
    //     "text" : "Walk the dog"
    // }).then((result)=> console.log(result),(err) => console.log(err));

    // db.collection('User').deleteOne({name : 'Umit'});

    //db.collection('User').deleteMany({name : 'Umit'});

    db.collection('User').findOneAndDelete({
        name:'Ümit'
    }).then((docs)=>{console.log(docs)},(err)=>{console.log("Error: ",err)});
    
    client.close();
 
});





