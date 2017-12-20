var
router      = require('express').Router(),
user        = require('../controllers/userController'),
valid       = require('validator');

router.route('/create')
.post((req, res) => {
    (req.body.username && req.body.password && req.body.nama && req.body.telepon && req.body.role && valid.isEmail(req.body.email)) ?
    user.read(req.body.username, found => !found ?
    user.set(null, {
        username : req.body.username,
        password : req.body.password,
        nama : req.body.nama,
        email : req.body.email,
        telepon : req.body.telepon,
        role : req.body.role
    }) : console.log(req.body.username + ' exist')) : console.log('Fill all form');
    res.end();
});

router.route('/read')
.post((req, res) => {
    user.read('test', (found) => console.log(found));
    res.end();
});

router.route('/verify')
.post((req, res) => {
    user.read('test', (found) => {
        user.verify(found[0].password, 'test', same => console.log(same))
    })
})


module.exports = router;