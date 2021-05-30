import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'
import { User } from '../model/index'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    account: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    fullName: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    },
    isActive: {
      type: GraphQLBoolean
    }
  })
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await new Promise((resolve, reject) => {
          return User.find({}, (err: boolean, userInfo: any) => {
            if (err) reject(err)
            else resolve(userInfo)
          })
        })
      }
    }
  })
})

const UserSchema = new GraphQLSchema({
  query: queryType
})

export default UserSchema
