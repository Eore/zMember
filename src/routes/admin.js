var
router      = require('express').Router(),
user        = require('../controllers/userController'),
valid       = require('validator');

var validator = (data) => data ? 
    (((data.username.length >= 4) && (data.username.length <= 12)) &&
    (data.password.length >= 6) &&
    (data.nama.length > 0) &&
    (data.telepon.length > 0) &&
    (valid.isEmail(data.email)) &&
    (data.role !== null)) : false;

router.route('/create')
.post((req, res) => {
    validator(req.body) ?
    user.read(req.body.username).then(found => 
        found === null ? user.set(null, {
            username : req.body.username,
            password : req.body.password,
            nama : req.body.nama,
            email : req.body.email,
            telepon : req.body.telepon,
            role : req.body.role
        }) : console.log(req.body.username + ' sudah ada')
    ) : console.log('Input error')
    res.end();
});

router.route('/read')
.post((req, res) => {
    user.read(req.body.username).then(found => console.log(found));
    res.end();
});

module.exports = router;