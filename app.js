const express = require('express');
const app = express();
const router = require('./router.js');
const path = require('path');
const db = require('./db/config');
const url = 'mongodb+srv://user:user1234@cluster0-geb9p.mongodb.net/<page-book>?retryWrites=true&w=majority'
const error = require('./network/error');

db(url);

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set('views', './views');
app.set('view engine', 'pug');
app.set('view options', {
     layout: true
});
app.use('/', router);
app.use(error);
//static files
app.use('/app', express.static(path.join(__dirname, 'public')));


app.listen(3000, () => {
     console.log('Servidor iniciando..', __dirname)
})