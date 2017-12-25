var
jwt     = require('jsonwebtoken'),
cred    = require('credential')(),
user    = require('./userController');

module.exports = {
    login : (username, password) => {
        return new Promise((resolve, rej) => {
            user.read(username).then(res => {
                res !== null ?
                    cred.verify(res.password, password)
                    .then(valid => valid ? 
                        resolve(jwt.sign({id : res._id, role : res.role}, 'miawmiaw', {expiresIn : '5m'}))
                        : console.log('Username password salah')
                    ).catch(err => console.log(err))
                : console.log(username + ' tidak ada')
            }).catch(err => console.log(err))
        })
    },
    logout : () => {}
}