module.exports = function error(err, req, res, next){
 console.error('[ERROR]', err);

 const message = err.message || 'Error Internal';
 const status = err.statusCode || 500;
 return res.status(status).render('error.pug', {
     status: status,
    msg: message
})
};