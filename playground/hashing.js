const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

var password = "123abc!";

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt, (err, hash)=> {
        console.log(hash);
    })
});

var hashedPassport = ['2a$10$hYiT8Gu2zspYQcMurvUa1OtHmiLTwZzIaLW9oCrgNMUojtQUFvv3C',
    '$2a$10$lghV4SJa3t86Bj5xZhqyVO2uSmKkRL0TE6zftKL62OUCsqInRQFTy',
    '$2a$10$CWc5U.cYReu8PeWNHZivo.gERgrvEc.FaNH5NCnE87wRcswErpWi.',
    '$2a$11$gsrPbbquLMVbzep8nQeaGuHS7PkwPJSx7dYFR.9cO.Wji47a.FY3C'];

    bcrypt.compare(password, hashedPassport[4], (err,res)=>{
        console.log(res);
    });



// var data ={
//     id: 10,
//     name: "Ahmet",
//     surname: "Yılmaz",
// };
// var token = jwt.sign(data,"secretkeyword");

// console.log(token);

// var verify = jwt.verify(token, "secretkeyword");

// console.log(verify);



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
