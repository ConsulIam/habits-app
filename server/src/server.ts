// console.log("Oi!! hi444g")
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './lib/routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  port: 11337,
}).then(() => {
  console.log('Consul HTTP Server isoled running!')
})