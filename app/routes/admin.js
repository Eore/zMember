var
router      = require('express').Router(),
user        = require('../controllers/userController'),
valid       = require('validator');

let validator = (data) => (
    (data.username.length >= 4 && data.username <= 12) &&
    (data.password.length >= 6) &&
    (data.nama.length > 0) &&
    (data.telepon.length > 0) &&
    (valid.isEmail(data.email)) &&
    (data.role !== null)
);

router.route('/create')
.post((req, res) => {
    validator(req.body) ?
    user.read(req.body.username).then(found => 
        !found ? user.set(null, {
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

router.route('/verify')
.post((req, res) => {
    user.read('test', (found) => {
        user.verify(found[0].password, 'test', same => console.log(same))
    })
})


module.exports = router;