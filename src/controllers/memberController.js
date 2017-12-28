var
member      = require('../models/memberModel')

module.exports = {
    medicalRecord :{
        new : (input, data) => 
            member.update({ktp : input}, {
                $push : {
                    nomorRekam : {
                        perusahaan : data.perusahaan,
                        nomor : data.nomor
                    }
                }
            }).then(),
        edit : (input, data) =>
            member.findOneAndUpdate({'nomorRekam._id' : input}, {
                $set : {
                    'nomorRekam.$.perusahaan' : data.perusahaan,
                    'nomorRekam.$.nomor' : data.nomor
                }
            }).then(),
        delete : (input, data) =>
            member.findOneAndUpdate({'nomorRekam._id' : input}, {
                $pull : {
                    'nomorRekam.$.perusahaan' : data.perusahaan,
                    'nomorRekam.$.nomor' : data.nomor
                }
            }).then(),
    },
    bio : {
        set : (input, data) => 
            member.findOneAndUpdate({$or : [{uid : input}, {ktp : input}]}, {
                uid : data.uid,
                ktp : data.ktp,
                nama : data.nama,
                updateAt : new Date
            }, {upsert : true}).then(),
        read : input => member.find({$or : [{uid : new RegExp(input, 'i')}, {ktp : new RegExp(input, 'i')}]}),
        delete : input => member.findOneAndRemove({$or : [{uid : input}, {ktp : input}]})
    }
};