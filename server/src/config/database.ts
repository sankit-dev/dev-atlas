import mongoose from 'mongoose'

export async function connectDatabase(mongodbUri: string) {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
  })

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error', error)
  })

  await mongoose.connect(mongodbUri)
}
