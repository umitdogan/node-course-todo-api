const MongoClient = require('mongodb').MongoClient;
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
    // db.collection('Todos').insertOne({
    //     text: 'Something to do', 
    //     completed: false
    // },(err,result)=>{
    //     assert.equal(null, err);
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    db.collection('User').insertMany([{
        name: 'Umit', age: 39, Location:'Istanbul'//, _id: 1
    },{
        name: 'Özgür', age: 25, Location:'Ankara' //, _id: 2
    }], (err,result)=>{
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log(result.ops[0]._id.getTimestamp());
        console.log(result.ops[1]._id.getTimestamp());
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    client.close()

    
});





