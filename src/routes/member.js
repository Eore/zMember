var
router      = require('express').Router(),
member      = require('../controllers/memberController');

router.route('/add')
.post((req, res) => {
    req.body.uid = Date.now();
    member.bio.read(req.body.ktp).then(found => {
        if (found.length === 0) {
            member.bio.set(null, req.body);
            member.medicalRecord.new(req.body.ktp, req.body);
            res.json(req.body.nama + ' telah di tambah')
        } else {
            res.json(req.body.nama + ' sudah ada')
        }
    })
})

router.route('/update')
.post((req, res) => {
    member.bio.read(req.body.input)
    .update({$push : {nomorRekam : {perusahaan : req.body.perusahaan, nomor : req.body.nomor}}})
    .then(() => res.json(req.body.input + ' telah di update'));
    // member.set(req.body.input, req.body).then(() => res.json(req.body.input + ' telah di update'));
})

router.route('/read')
.post((req, res) => {
    member.bio.read(req.body.input).then(found => res.json(found))
})

module.exports = router;