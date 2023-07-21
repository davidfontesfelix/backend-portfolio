const express = require('express')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3001

app.use(cors())

app.get('/projects', (req, res) => {
  const Projects = {
    projeto1: {
      desktop: "https://firebasestorage.googleapis.com/v0/b/portfolio-7ef76.appspot.com/o/projeto1%2FCaptura%20de%20tela%20de%202023-07-20%2023-22-38.png?alt=media&token=b5bdab32-990f-4aea-951f-6aebee2d9459",
      mobile: "https://firebasestorage.googleapis.com/v0/b/portfolio-7ef76.appspot.com/o/projeto1%2FCaptura%20de%20tela%20de%202023-07-20%2022-34-53.png?alt=media&token=cc8a93ea-4f26-40cb-bb13-67c37e716892",
      title: "CRUD",
      techs: ["TypeScript", "Next", "Tailwind", "Node"],
      description: "Um projeto pessoal onde aproveitei para testar minhas habilidades de designer e backend.",
      link: "https://front-end-tela-de-cadastro.vercel.app/"
    }
    
  }

  res.json(Projects)
})

app.listen(port)