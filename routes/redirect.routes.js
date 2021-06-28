const Router = require('koa-router')
const Link = require('../models/Link')
const router = Router()


router.get('/t/:code', async (ctx) => {
  try {

    const link = await Link.findOne({ code: ctx.request.params.code })

    if (link) {
      link.clicks++
      await link.save()
      return ctx.response.redirect(link.origin_link)
    }

    ctx.response.body = {status: 404, message: "Ссылка не найдена"}

  } catch (e) {
    ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"}
  }
})


module.exports = router
