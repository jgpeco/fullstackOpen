const app = require('./app') //express is here
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => logger.info(`Server is running on port ${config.PORT}`))