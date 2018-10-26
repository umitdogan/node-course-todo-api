const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data ={
    id: 10,
    name: "Ahmet",
    surname: "Yılmaz",
};
var token = jwt.sign(data,"secretkeyword");

console.log(token);

var verify = jwt.verify(token, "secretkeyword");

console.log(verify);



// var message = 'SHA256 test message';
// var hash = SHA256(message).toString();

// console.log(`Message : ${message}`);
// console.log(`Hash : ${hash}`);

// var data ={
//     id: 4
// };

// var token = {
//     data, 
//     hash : SHA256(JSON.stringify(data) + 'secretkey').toString()
// };

// //token.data.id= 5;
// //token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+ 'secretkey').toString();

// if (resultHash === token.hash) {
//     console.log ('Data was not changed.');
//     //console.log (resultHash);
// } else {
//     console.log ('Data was changed. No trust Data');
//     //console.log (resultHash);
//     //console.log (token.hash);
// }
