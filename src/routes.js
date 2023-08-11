const express = require('express');

const routes = express.Router();

const users = [];


// routes.post('/register', (req, res) => {
//     // res.send('login endpoint');
//     const{email, password} = req.body
//     const user = users.find(user=>user.email === email && user.password === password)

//     if(user){
//         return res.status(200).json(user)
//     }
//     //  else {
//         return res.send(401).json({message:'Credenciais invalidas'})
//     // }
// });


module.exports = routes;