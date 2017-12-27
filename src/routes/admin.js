var
router      = require('express').Router(),
user        = require('../controllers/userController'),
valid       = require('validator');

var validator = (data) =>
    (/^[\w+]{4,12}$/.test(data.username) &&
    ((data.password.length >= 6) && (data.password !== undefined)) &&
    ((data.nama.length > 0) && (data.nama !== undefined)) &&
    ((data.telepon.length > 0) && (data.telepon !== undefined)) &&
    (/^[\w+]{1,}@[\w+]{1,}\.[\w+]{1,}$/.test(data.email)));

router.route('/create')
.post((req, res) => {
    if (validator(req.body)) {
        user.read(req.body.username).then(found => {
            if (found === null) {
                user.set(null, {
                    username : req.body.username,
                    password : req.body.password,
                    nama : req.body.nama,
                    email : req.body.email,
                    telepon : req.body.telepon,
                    role : req.body.role
                }).then(() => res.json(req.body.username + ' berhasil ditambah'));
            } else {
                res.json(req.body.username + ' sudah ada');
            }
        })
    } else {
        res.json('Input error');
    }
});

router.route('/read')
.post((req, res) => {
    user.read(req.body.username).then(found => res.json(found));
});

router.route('/delete')
.post((req, res) => {
    user.delete(req.body.username)
    .then(() => res.json(req.body.username + ' dihapus'))
    .catch(err => res.json('Error!'))
})

module.exports = router;