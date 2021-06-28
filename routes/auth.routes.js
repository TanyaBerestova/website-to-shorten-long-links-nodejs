const bcrypt = require('bcryptjs')
const config = require('config')
var Router = require('koa-router')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

var router = Router();              //Instantiate the router
router.post('/registr', async(ctx) => {
  try {
    //const {email, password} = JSON.parse(ctx.request.body)
    //console.log(`email is ${email} and password is ${password}`)
    ctx.check('email',"Некорректный email").isEmail()
    ctx.check('password', "Длина пароля должна быть больше 6 символов").len(6)
    let errors = await ctx.validationErrors()
    if (errors) {
      //console.log(errors)
      return ctx.response.body = {status: 422, message: "Некорректный данные при регистрации"};
    }
    const {email, password} = ctx.request.body
    const candidate = await User.findOne({ email })
   ctx.body = ctx.request.body
   if (candidate) {
    return ctx.response.body = {status: 400, message: "Такой пользователь уже существует"};
  }
  const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    return ctx.response.body = {status: 201, message: "Пользователь создан"};

  } catch (e) {
    return ctx.response.body = {status: 500, message: "Что-то пошло не так, попробуйте снова"};
  }
})

router.post('/login', async (ctx) => {
  try {
 ctx.check('email',"Некорректный email").isEmail()
 ctx.check('password', 'Введите пароль').len(6)
 let errors = await ctx.validationErrors()
    if (errors) {
      //console.log(errors)
      return ctx.response.body = {status: 400, message: 'Некорректные данные'};
    }
    const {email, password} = ctx.request.body
    const user = await User.findOne({ email })
    if (!user) {
      return ctx.response.body = {status: 400, message: 'Пользователь не найден'};
    }

    const isMatch = await bcrypt.compare(password, user.password)// совпадают ли пароли
    if (!isMatch) {
      return ctx.response.body = {status: 400, message: 'Неверный пароль, попробуйте снова'};
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'), //секретный ключ из конфига
      { expiresIn: '1h' } //время существования токена
    ) // здесь передаются параметры, а не объекты
     ctx.response.body = { token, userId: user.id }

  } catch (e) {
    return ctx.response.body = {status: 500, message: 'Что-то пошло не так, попробуйте снова'};
  }
})

module.exports = router
