import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
  } from 'graphql'
  import { Banner } from '../model/index'
  
  const BannerType = new GraphQLObjectType({
    name: 'Banner',
    fields: () => ({
      id: {
        type: GraphQLInt
      },
      image: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      intro: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      linkProductId: {
        type: GraphQLInt
      }
    })
  })
  
  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
      banners: {
        type: new GraphQLList(BannerType),
        resolve: async () => {
          return await new Promise((resolve, reject) => {
            return Banner.find({}, (err: boolean, banners: any) => {
              console.error(err)
              if (err) reject(err)
              else resolve(banners)
            })
          })
        }
      }
    })
  })
  
  const BannerSchema = new GraphQLSchema({
    query: queryType
  })
  
  export default BannerSchema
  