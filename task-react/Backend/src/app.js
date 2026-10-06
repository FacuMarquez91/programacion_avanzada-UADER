import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import tareasRoutes from './routes/tareas.routes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {

  res.json({
    mensaje: 'API Gestor de Tareas funcionando'
  })

})

app.use('/api/tareas', tareasRoutes)

app.use((req, res) => {

  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  })

})

app.listen(PORT, '0.0.0.0', () => {

  console.log(
    `Servidor ejecutándose en el puerto ${PORT}`
  )

})