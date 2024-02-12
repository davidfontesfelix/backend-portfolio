const fastify = require('fastify')
const cors = require('@fastify/cors')
require('dotenv').config()
const nodemailer = require('nodemailer')
const { getProjects, getCurriculum } = require('./src/service/firabase')
const { z } = require('zod')

const email = process.env.EMAIL
const pass = process.env.PASS

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass
  }
})

const app = fastify()
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

app.post('/email', async (request, reply) => {
  try {
    const createEmailSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      textarea: z.string()
    })

    const { name, email, textarea } = await createEmailSchema.parse(
      request.body
    )

    await transporter.sendMail({
      to: 'davidfontes303@gmail.com',
      subject: `Nome:${name}, Email:${email}`,
      text: textarea
    })
    await transporter.sendMail({
      to: email,
      subject: 'Obrigado por enviar um email para mim',
      text: 'Logo logo retornarei seu email.'
    })
    return reply.status(201).send({ message: 'Email enviado com sucesso' })
  } catch {
    return reply
      .status(400)
      .send({ error: 'Algum problema com os dados fornecidos' })
  }
})

app.get('/projects', async (request, reply) => {
  try {
    const data = await getProjects()
    if (data.length === 0) {
      return reply.status(500).send({ error: 'falha ao tentar se conectar com o banco de dados' })
    }
    return reply.status(200).send(data[0].projects)
  } catch {
    return reply.status(500).send({ error: 'falha ao tentar se conectar com o banco de dados' })
  }
})

app.get('/curriculum', async (request, reply) => {
  try {
    const data = await getCurriculum()
    if (data.length === 0) {
      return reply.status(500).send({ error: 'falha ao tentar se conectar com o banco de dados' })
    }
    return reply.status(200).send(data[0])
  } catch {
    return reply.status(500).send({ error: 'falha ao tentar se conectar com o banco de dados' })
  }
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
})
