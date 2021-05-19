import mongoose, { Schema } from 'mongoose'

import ProductModel from './Product'
import UserModel from './User'
import CartModel from './Cart'

const Product = mongoose.model('Product', new Schema(ProductModel, { timestamps: true }), 'products')
const User = mongoose.model('User', new Schema(UserModel, { timestamps: true }), 'users')
const Cart = mongoose.model('Cart', new Schema(CartModel, { timestamps: true }), 'cart')

export { Product, User, Cart }
