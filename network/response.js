module.exports = function(res, msg, status){
    return res.status(status).render(error.pug, {
        msg: msg
    })
}