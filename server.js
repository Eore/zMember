var
express     = require('express'),
app         = express(),
http        = require('http').createServer(app),
mongoose    = require('mongoose'),
bodyParser  = require('body-parser'),
session     = require('express-session'),
index       = require('./src/routes/index'),
member      = require('./src/routes/member'),
admin       = require('./src/routes/admin');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/membershipZainab', {useMongoClient : true})
.then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(session({resave : true, saveUninitialized : true, secret : 'miawmiawmiaw', cookie : {maxAge : (6 * 1000)}}))
    app.use('/', index);
    app.use('/admin', admin);
    app.use('/admin/member', member);
    let port = 8000;
    http.listen(port, (err) => !err ? console.log('Server berjalan di port ' + port) : console.log('Gagal menjalankan server : ' + err));
})
.catch((err) => console.log('Error :' + err));