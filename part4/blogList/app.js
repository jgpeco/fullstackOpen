const express = require('express')
const app = express()
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const userRouter = require('./controllers/user')
const blogRouter = require('./controllers/blog')
const loginRouter = require('./controllers/login')

logger.info(`Connecting in ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => logger.info(`Connected to MongoDB`))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app