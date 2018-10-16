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
    // db.collection('Todos')
    // //.find({completed : false})
    // .find({_id: new ObjectID('5bc5f60b268291ba5516c829')})
    // .toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    //     console.log(docs[0]._id);
    // }, (err) => {
    //     console.log('Unable to fetch todos.', err);
    // }
    // );
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}.`);
    }, (err)=>{
        console.log('Unable to fetch todos.', err);
    });
    db.collection('User').find({name: 'Umit'}).toArray().then((docs) =>{
        console.log('User');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
        console.log('Unable to fetch User.', err);
    });

    //client.close()

    
});





