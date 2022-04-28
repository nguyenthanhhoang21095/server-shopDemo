import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
} from 'graphql'
import { Cart } from '../model/index'
import { ProductType } from "./product"

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        cart: {
            type: GraphQLList(ProductType)
        }
    })
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        cart: {
            type: new GraphQLList(CartType),
            resolve: async () => {
                return await new Promise((resolve, reject) => {
                    return Cart.find({}, (err: boolean, cart: any) => {
                        if (err) reject(err)
                        else resolve(cart)
                    })
                })
            }
        }
    })
})

const CartSchema = new GraphQLSchema({
    query: queryType
})

export default CartSchema
