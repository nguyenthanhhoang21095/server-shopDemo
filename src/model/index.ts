import mongoose, { Schema } from 'mongoose'

import ProductModel from './Product'
import UserModel from './User'
import CartModel from './Cart'
import OrderModel from './Order'
import BannerModel from './Banner'
import CategoryModel from './Category'
import SubCategoryModel from './SubCategory'
import FeatureModel from './Feature'
import CouponModel from './Coupon'

const Product = mongoose.model('Product', new Schema(ProductModel, { timestamps: true }), 'products')
const User = mongoose.model('User', new Schema(UserModel, { timestamps: true }), 'users')
const Cart = mongoose.model('Cart', new Schema(CartModel, { timestamps: true }), 'cart')
const Order = mongoose.model('Order', new Schema(OrderModel, { timestamps: true }), 'orders')
const Banner = mongoose.model('Banner', new Schema(BannerModel, { timestamps: true }), 'banners')
const  Category = mongoose.model('Category', new Schema(CategoryModel, { timestamps: true }), 'category')
const  SubCategory = mongoose.model('SubCategory', new Schema(SubCategoryModel, { timestamps: true }), 'subCategory')
const  Feature = mongoose.model('Feature', new Schema(FeatureModel, { timestamps: true }), 'features')
const  Coupon = mongoose.model('Coupon', new Schema(CouponModel, { timestamps: true }), 'coupons')

export { 
    Product, 
    User, 
    Cart, 
    Order, 
    Banner, 
    Category, 
    SubCategory, 
    Feature,
    Coupon,
}
