var 
mongoose    = require('mongoose'),
Schema      = mongoose.Schema;

let Member = new Schema({
    uid : {
        type : Schema.Types.String,
        default : Date.now(),
        required : true,
        index : true
    },
    ktp : {
        type : Schema.Types.String,
        required : true
    },
    nama : {
        type : Schema.Types.String,
        required : true
    },
    updateAt : {
        type : Schema.Types.Date,
        required : true
    },
    poin : {
        type : Schema.Types.Number,
        default : 0
    },
    nomorRekam : [{
        perusahaan : Schema.Types.String,
        nomor : Schema.Types.String
    }]
}, {collection : 'member'});

module.exports = mongoose.model('member', Member);