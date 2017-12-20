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
    read : (username, ret) => user.find(username ? {username : username} : null, (err, res) => ret(res)),
    delete : username => user.findOneAndRemove({username : username}),
    verify : (encPass, password, ret) => encrypt.verify(encPass, password).then(res => ret(res))
};