var koa = require('koa')
var config = require('config')
var mongoose = require('mongoose')
var bodyParser = require('koa-bodyparser')
var koaValidator = require('koa-async-validator')
var serve = require('koa-static-server')
const cors = require('@koa/cors');

var authRoutes = require('./routes/auth.routes')
var linkRoutes = require('./routes/link.routes')
var redirectRoutes = require('./routes/redirect.routes')
var path = require('path')
var app = new koa()
app.use(cors());

 app.use(bodyParser({
  extendTypes: {
    json: ['text/plain'] // will parse application/x-javascript type body as a JSON string
  }
}));
 app.use(koaValidator());

app.use(authRoutes.routes())           //Use the routes defined using the router
app.use(linkRoutes.routes())
app.use(redirectRoutes.routes())

if (process.env.NODE_ENV === 'production'){
  app.use(serve({
    rootDir: path.join(__dirname, 'client', 'build')
  }))
  app.get(ctx => {ctx.response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))})
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1) // выход из процесса nodejs, если что-то пошло не так
  }
}

start()