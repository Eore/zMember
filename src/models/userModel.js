var 
mongoose    = require('mongoose'),
Schema      = mongoose.Schema;

let User = new Schema({
    username : {
        type : Schema.Types.String,
        minlength : 4,
        maxlength : 12,
        required : true,
        unique : true
    },
    password : {
        type : Schema.Types.String,
        minlength : 6,
        required : true
    },
    nama : {
        type : Schema.Types.String,
        required : true
    },
    email : {
        type : Schema.Types.String,
        required : true
    },
    telepon : {
        type : Schema.Types.String,
        required : true
    },
    role : {
        type : Schema.Types.Number,
        default : 10,
        required : true
    }
}, {collection : 'user'});

module.exports = mongoose.model('user', User);