const db = require('mongoose');
db.Promise = global.Promise;
//controlar la coneccion con bd
async function connect(url){
    // de esta manera le pasamos la url, y se conectara con l url
    await db.connect(url, {useNewUrlParser : true, useUnifiedTopology: true });
    console.log('[db] Conectada con exito')
}

module.exports = connect;