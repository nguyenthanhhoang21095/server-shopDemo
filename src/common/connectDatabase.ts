import mongoose from 'mongoose'

export const connectDatabase = (): void => {
  mongoose.Promise = require('bluebird')

  mongoose.connect('mongodb://localhost:27017/shopDemo', {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(async () => {
    console.log('Database connection created')
  }).catch((err) => {
    console.log(err)
  })
}
