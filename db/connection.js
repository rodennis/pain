import mongoose from 'mongoose'

let MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/painDatabase'

mongoose.set('returnOriginal', false)

mongoose.connect(MONGODB_URI)
  .catch((error) => console.log('Error connecting to MongoDB: ', error.message))

mongoose.connection.on('disconnected', (error) => console.log('Disconnected from MongoDB.'))
  
mongoose.connection.on('error', (error) => console.log(`MongoDB connection error: ${error}`))

export default mongoose.connection