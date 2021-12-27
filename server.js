import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import db from './db/connection.js'
import sessionRoutes from './routes/routes.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/api', sessionRoutes)

db.on('connected', () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
})