const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    img: {type: String, required: true},

}); 


module.exports =  postSchema;