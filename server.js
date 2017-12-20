var
express     = require('express'),
app         = express(),
http        = require('http').createServer(app),
mongoose    = require('mongoose'),
bodyParser  = require('body-parser'),
admin       = require('./app/routes/admin');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/zMember', {useMongoClient : true})
.then(() => {
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use('/admin', admin);
    let port = 8000;
    http.listen(port, (err) => !err ? console.log('Server started') : console.log('Server Cannot be start : ' + err));
})
.catch((err) => console.log('Error :' + err));