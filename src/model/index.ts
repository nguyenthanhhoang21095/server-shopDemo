import mongoose, { Schema } from 'mongoose'

import ProductModel from './Product'
import UserModel from './User'
import CartModel from './Cart'
import OrderModel from './Order'

const Product = mongoose.model('Product', new Schema(ProductModel, { timestamps: true }), 'products')
const User = mongoose.model('User', new Schema(UserModel, { timestamps: true }), 'users')
const Cart = mongoose.model('Cart', new Schema(CartModel, { timestamps: true }), 'cart')
const Order = mongoose.model('Order', new Schema(OrderModel, { timestamps: true }), 'orders')

export { Product, User, Cart, Order }
