var
router      = require('express').Router(),
bcrypt      = require('bcrypt'),
auth        = require('../controllers/auth');

router.route('/login')
.post((req, res) => {
    req.body.username !== undefined ? auth.login(req.body.username, req.body.password)
    .then(valid => {
        req.session.token = valid;
        res.json(valid);
    })
    .catch(err => res.json(err)) : res.json('Input Username dan Password');
})

var pas;
router.route('/check')
.post((req, res) => {
    req.session.test = 'meong';
    res.send('miaw');
    // res.json(auth.check(req.body.hash))
})

router.route('/check2')
.post((req, res) => res.send(req.session.token))
module.exports = router;