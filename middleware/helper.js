const User = require('../Schems/user');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


function authentcateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, secret, (err, user) => {
        if(err) res.sendStatus(403);
        if(user) {
            User.findOne({_id: user.id}).then(authUser => {
                if(authUser) {
                    req.user = authUser;
                    next()
                } else {
                    res.sendStatus(403);
                }
            }).catch(err => {
                next(err)
            });
        } else {
            res.sendStatus(404);
        }
    });
    

}

function cleanUser(user){
    return {
        email : user.email ,
        name : user.name ,
        lastName : user.lastName ,
        id: user._id
    }
}


module.exports = {
    authentcateToken,
    cleanUser
}