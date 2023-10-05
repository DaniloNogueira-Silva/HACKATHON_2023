import Fastify from 'fastify'
import cors from "@fastify/cors"
import dotenv from 'dotenv'
import routes from './interfaces/routes/routes'

const server = Fastify()
server.register(cors)
routes(server)

dotenv.config()

server.listen(process.env.PORT)
.then( () => {
    console.log('HTTP Server running')
})