var
jwt     = require('jsonwebtoken'),
bcrypt  = require('bcrypt'),
user    = require('./userController');

var Salt;
bcrypt.genSalt(Math.random() * 100000).then(salt => Salt = salt);

module.exports = {
    login : (username, password) => {
        return new Promise((resolve, rej) => {
            user.read(username).then(res => {
                res !== null ?
                    bcrypt.compare(password, res.password)
                    .then(valid => valid ? 
                        resolve(jwt.sign({id : res._id, role : res.role}, Salt, {expiresIn : '5m'}))
                        : rej('Username password salah')
                    ).catch(err => console.log(err))
                : rej(username + ' tidak ada')
            }).catch(err => console.log(err))
        })
    },
    logout : () => {},
    check : hash => jwt.decode(hash, {json : true})
}