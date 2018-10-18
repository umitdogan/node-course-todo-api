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
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5bc5e6dd51bd3005bc0cd773')},{
    //     $set:{text : "Something to do new update"
    // }},{
    //     returnOriginal:falsetimestamp
    //     }).then((result)=> {console.log(result)});

        db.collection('User').findOneAndUpdate({_id: new ObjectID('5bc5eb14a9993e2d54ae6cd2')},{ //_id: 2
            $set:{name : "Hasan"
        }, $inc: {age: 35}, $currentDate:{"lastModifiedDate": { $type: "timestamp" }}},{ //, $rename: {name: 'lastname'}
            returnOriginal:false
            }).then((result)=> {console.log(result)});
    


    //client.close(()=> {console.log('Closed the connection of MongoDB server. ')});

    
});





