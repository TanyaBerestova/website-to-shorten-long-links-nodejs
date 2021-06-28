const Router = require('koa-router')
const config = require('config')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const Link = require('../models/Link')
//const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/generate', async (ctx) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {origin_link} = ctx.request.body

    const code = shortid.generate()
    const existing = await Link.findOne({ origin_link })
    if (existing) {
      return ctx.response.body = { link: existing }
    }

    const short_link = baseUrl + '/t/' + code
    if (ctx.request.method != 'OPTIONS') {   
        const token = ctx.request.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        /*if (!token) {
            ctx.redirect('http://localhost:3000/')
          return ctx.response.body = {status: 401, message: "Нет авторизации"}
        }  */  
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        ctx.request.user = decoded
    }
    const link = new Link({
      code, short_link, origin_link, owner: ctx.request.user.userId
    })
    //console.log(link)
    await link.save()
    ctx.response.status = 201
    ctx.response.body = {link}
  } catch (e) {
    ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"}
  }
})

router.post('/delete', async (ctx) => {
  try {
    const {link_id} = ctx.request.body
    await Link.findByIdAndDelete(link_id)
    //ctx.redirect('http://localhost:3000/create')
    ctx.response.body = {status: 200, message: "Пользователь успешно удален"}
  } catch (e) {
    ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"}
  }
})

router.get('/link', async (ctx) => {
  try {
    if (ctx.request.method != 'OPTIONS') {   
        const token = ctx.request.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            ctx.redirect('/')
            return ctx.response.body = {status: 401, message: "Нет авторизации"}        }    
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        ctx.request.user = decoded
    }
    //console.log(ctx.request.user.userId)
    const links = await Link.find({ owner: ctx.request.user.userId })
    ctx.response.body = links
  } catch (e) {
    ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"}
  }
})

router.get('/:id', async (ctx) => {
  try {
    const link = await Link.findById(ctx.request.params.id)
    ctx.response.body = link
  } catch (e) {
    ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"}
  }
})

module.exports = router
