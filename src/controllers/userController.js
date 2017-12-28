var
user        = require('../models/userModel'),
bcrypt      = require('bcrypt');

module.exports = {
    set : (username, data) => 
        bcrypt.genSalt((Math.random() * 15))
        .then(salt => {     
            bcrypt.hash(data.password, salt)
            .then(encPass => {
                user.findOneAndUpdate({username : username}, {
                    username : data.username,
                    password : encPass,
                    nama : data.nama,
                    email : data.email,
                    telepon : data.telepon,
                    role : data.role
                }, {upsert : true}).then();        
            })
        }),
    read : username => user.find({username : new RegExp(username, 'i')}),
    delete : username => user.findOneAndRemove({username : username}),
};