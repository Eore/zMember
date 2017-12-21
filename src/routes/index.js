var
router      = require('express').Router(),
auth        = require('../controllers/auth');

router.route('/login')
.post((req, res) => {
    req.body.username !== null ? auth.login(req.body.username, req.body.password) : next();
    res.end();
})

module.exports = router;