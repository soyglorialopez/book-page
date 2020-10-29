const { get } = require('mongoose');
const store = require('../../db/store');
const error = require('../../utils/err');


async function add(data){
    if(!data.email || !data.name){
       throw error('Necesitamos los datos', 400)
    }
   return store.addSubs(data)
}

module.exports = {
    add
}