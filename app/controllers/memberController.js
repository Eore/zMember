var
member      = require('../models/memberModel')

module.exports = {
    set : (input, data) => user.findOneAndUpdate({$or : [{id : input}, {ktp : input}]}, {
        ktp : data.ktp,
        updateAt : new Date,
        nomorRekam : {
            $push : {
                perusahaan : data.perusahaan,
                nomor : data.nomor
            }
        }
    }, {upsert : true}),
    read : (input, ret) => member.find(username ? {$or : [{id : input}, {ktp : input}]} : null, (err, res) => ret(res)),
    delete : input => member.findOneAndRemove({$or : [{id : input}, {ktp : input}]})
};