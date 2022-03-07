import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
  } from 'graphql'
  import { SubCategory } from '../model/index'
  
  const SubCategoryType = new GraphQLObjectType({
    name: 'SubCategory',
    fields: () => ({
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      show_type: {
        type: GraphQLString
      },
      productArr: {
        type: GraphQLList(GraphQLInt)
      }
    })
  })
  
  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
      subCategory: {
        type: new GraphQLList(SubCategoryType),
        resolve: async () => {
          return await new Promise((resolve, reject) => {
            return SubCategory.find({}, (err: boolean, subCategory: any) => {
              console.error(err)
              if (err) reject(err)
              else resolve(subCategory)
            })
          })
        }
      }
    })
  })
  
  const SubCategorySchema = new GraphQLSchema({
    query: queryType
  })
  
  export default SubCategorySchema
  