import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt
  } from 'graphql'
  import { Category } from '../model/index'
  
  const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      hasSubCategory:  {
        type: GraphQLBoolean
      },
      subCategory: {
        type: GraphQLList(GraphQLInt)
      }
    })
  })
  
  const queryType = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
      category: {
        type: new GraphQLList(CategoryType),
        resolve: async () => {
          return await new Promise((resolve, reject) => {
            return Category.find({}, (err: boolean, category: any) => {
              console.error(err)
              if (err) reject(err)
              else resolve(category)
            })
          })
        }
      }
    })
  })
  
  const CategorySchema = new GraphQLSchema({
    query: queryType
  })
  
  export default CategorySchema;
  