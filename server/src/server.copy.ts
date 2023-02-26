// console.log("Oi!! hi444g")
// backup before create lib folder with routes.ts and prisma.ts (aislar)
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async () => {
  const habits = await prisma.habit.findMany()

  return habits
})

app.listen({
  port: 11337,
}).then(() => {
  console.log('HTTP Server running!')
})