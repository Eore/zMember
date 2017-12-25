var
user        = require('../models/userModel'),
encrypt     = require('credential')();

module.exports = {
    set : (username, data) => encrypt.hash(data.password).then(encPass =>
        user.findOneAndUpdate({username : username}, {
            username : data.username,
            password : encPass,
            nama : data.nama,
            email : data.email,
            telepon : data.telepon,
            role : data.role
        }, {upsert : true})
    ),
    read : username => username ? user.findOne({username : username}) : user.find(),
    delete : username => user.findOneAndRemove({username : username}),
};