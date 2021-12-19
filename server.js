import express from 'express'
import cors from 'cors'
import logger from 'morgan'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})