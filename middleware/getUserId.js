const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (ctx, next) => {
    if (ctx.request.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = ctx.request.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            return ctx.response.status = 401
        }    
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        ctx.request.user = decoded
        next()
        
    } catch (e) {
        ctx.response.status = 401
    } 
}