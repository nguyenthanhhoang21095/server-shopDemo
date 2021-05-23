import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList
} from 'graphql'
import { Product } from '../model/index'

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        return await new Promise((resolve, reject) => {
          return Product.find({}, (err: boolean, products: any) => {
            if (err) reject(err)
            else resolve(products)
          })
        })
      }
    }
  })
})

const Schema = new GraphQLSchema({
  query: queryType
})

export default Schema
