import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
  } from 'graphql'
  import { Feature } from '../model/index'
  
  const FeatureType = new GraphQLObjectType({
    name: 'Feature',
    fields: () => ({
      id: {
        type: GraphQLInt
      },
      product_id: {
        type: GraphQLString
      }
    })
  })
  
  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
      features: {
        type: new GraphQLList(FeatureType),
        resolve: async () => {
          return await new Promise((resolve, reject) => {
            return Feature.find({}, (err: boolean, features: any) => {
              console.error(err)
              if (err) reject(err)
              else resolve(features)
            })
          })
        }
      }
    })
  })
  
  const FeatureSchema = new GraphQLSchema({
    query: queryType
  })
  
  export default FeatureSchema
  