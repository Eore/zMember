var
express     = require('express'),
app         = express(),
http        = require('http').createServer(app),
mongoose    = require('mongoose'),
bodyParser  = require('body-parser'),
index       = require('./src/routes/index'),
admin       = require('./src/routes/admin');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/membershipZainab', {useMongoClient : true})
.then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/', index);
    app.use('/admin', admin);
    let port = 8000;
    http.listen(port, (err) => !err ? console.log('Server berjalan di port ' + port) : console.log('Gagal menjalankan server : ' + err));
})
.catch((err) => console.log('Error :' + err));