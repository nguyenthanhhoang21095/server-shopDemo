import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt
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
    },
    price: {
      type: GraphQLInt
    },
    finalPrice: {
      type: GraphQLInt
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        return await new Promise((resolve, reject) => {
          return Product.find({}, (err: boolean, products: any) => {
            console.error(err)
            if (err) reject(err)
            else resolve(products)
          })
        })
      }
    }
  })
})

const ProductSchema = new GraphQLSchema({
  query: queryType
})

export default ProductSchema
