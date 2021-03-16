const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    nik : { 
        type : String
    },
    fullname : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    phone : {
        type : String
    },
    address : {
        type : String
    },
    profilephoto : {
        type : String
    },
    email : {
        type : String
    },
    role : {
        type : Number
    },
    plat : {
        type : String
    }, 
    status : {
        type : String
    }
})

module.exports = mongoose.model('access', userSchema)