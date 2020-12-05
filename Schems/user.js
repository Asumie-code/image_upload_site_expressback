const mongoose = require('mongoose');
const postSchema = require('./post');


const userSchema = mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String, required: true},
    password: {type: String, Required: true},
    posts: [postSchema]

}); 


module.exports = mongoose.model('user', userSchema);