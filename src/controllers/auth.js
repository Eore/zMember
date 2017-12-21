var
jwt     = require('jsonwebtoken'),
cred    = require('credential')(),
user    = require('./userController');

module.exports = {
    login : (username, password) => {
        user.read(username).then(res => {
            res !== null ?
                cred.verify(res[0].password, password)
                .then(valid => valid ? 
                    console.log('Token : ' + jwt.sign({id : res[0]._id, role : res[0].role}, 'miawmiaw', {expiresIn : '5m'}))
                    : console.log('Username password salah')
                )
            : console.log(username + ' tidak ada')
        })
    },
    logout : () => {}
}