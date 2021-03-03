const mongoose = require('mongoose');
const pesanSchema = mongoose.Schema({
    idUser : { 
        type : String
    },
    idDriver : { 
        type : String
    },
    fullname : {
        type : String
    },
    phone : {
        type : String
    },
    latitudeUser : {
        type : String
    },
    longitudeUser : {
        type : String
    },
    status : {
        type : String
    }
})

module.exports = mongoose.model('pesan', pesanSchema)