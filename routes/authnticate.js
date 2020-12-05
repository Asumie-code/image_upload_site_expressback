const express = require('express');
const router = express.Router();
const User = require('../Schems/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authentcateToken, cleanUser }   = require('../middleware/helper');

const secret = process.env.JWT_SECRET

router.get('/user', authentcateToken, async (req, res) => {
    res.status(200).json(cleanUser(req.user));
    
});


router.post('/login', async (req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
        email
    });

    if(!user) {
        res.status(403).json({
            error: 'User not found'
        });
    } else {
        bcrypt.compare(password, user.password).then(result => {
            if (result) {
                 jwt.sign({id: user.id}, secret, {expiresIn: 3600}, (err, token) => {
                     if(err) next(err);
                     res.status(200).json({
                         message: 'Logged In',
                         jwt: token
                     });
                });
            } else {
                res.status(401).json({
                    error: "Wrong Password"
                });
            }
        }).catch(err => next(err));
    }

    


});




router.post('/register', (req, res) => {
    let name = req.body.name;
    let lastName = req.body.lastName; 
    let email = req.body.email;
    let password = req.body.password;
    let verifyPass = req.body.verifyPassword;
    let errors = [];
 
    if (!name) errors.push("name");
    if (!lastName) errors.push("lastname");
    if (!email) errors.push("email");
    if (!password) errors.push("password");
    if (!verifyPass) errors.push("verifyPassword");
    if (password !== verifyPass) errors.push("Password and verifPassword don't match");

    if (errors.length !== 0) {
        res.status(422).json(errors);
        
    } else {

        bcrypt.hash(password, 12).then((hash) => {
            let newUser = new User({
                name,
                lastName,
                email,
                password: hash
            })
               
            newUser.save().then( () => {
                jwt.sign({id: newUser.id}, secret, (err, token) => {
                    if(err) next(err);
  
                    res.status(201).json({
                        message: "Registered",
                        jwt: token
                    });
                 });

            });
    

        }).catch( (err) => next(err))
    

    }

 
});





module.exports = router;
