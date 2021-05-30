import mongoose from 'mongoose'
export const connectDatabase = (): void => {
  mongoose.Promise = require('bluebird')
  const mongodbConnectUrl = process.env.NODE_ENV === 'dev'
    ? 'mongodb://localhost:27017/shopDemo'
    : `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URLDEV || process.env.DB_URL}/${process.env.DB_NAME}`
  mongoose.connect(mongodbConnectUrl
    , {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Database connection created')
    }).catch((err) => {
      console.log(err)
    })
}
