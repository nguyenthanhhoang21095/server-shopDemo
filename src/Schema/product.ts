import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt
} from 'graphql'
import { Product } from '../model/index'

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    images: {
      type: GraphQLString
    },
    image_cover: {
      type: GraphQLString
    },
    image_thumb: {
      type: GraphQLString
    },
    price: {
      type: GraphQLFloat,
    },
    salePrice: {
      type: GraphQLFloat,
    },
    brand: {
      type: GraphQLString
    },
    featured_brand: {
      type: GraphQLString
    },
    material: {
      type: GraphQLString
    },
    product_code: {
      type: GraphQLString
    },
    rateStar: {
      type: GraphQLInt
    },
    availability: {
      type: GraphQLBoolean
    },
    colors: {
      type: GraphQLString
    },
    sizes: {
      type: GraphQLString
    },
    reviews: {
      type: GraphQLString
    },
    related_products: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
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
