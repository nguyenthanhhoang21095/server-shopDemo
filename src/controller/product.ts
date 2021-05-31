import { Response, Request } from 'express'
import { Product } from '../model'
import { getStorage, saveStorage } from '../common/function'
// import redis from "redis"
import { IProduct } from '../interfaces'

interface ReponseType {
  success: boolean
  data: any
}

export default class ProductServices {
  static async get (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload: any = await Product.find({})
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async getById (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const id: number = parseInt(req.params.id)
      const payload: any = await Product.findOne({ id })
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async post (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      let prodId = 0;
      const {
        name,
        image,
        price,
        finalPrice,
      }: Partial<IProduct> = req.body

      const prodList: any = await Product.find({})
      if (prodList.length) prodId = prodList.length;

      const payload: any = await Product.create({
        id: prodId,
        name,
        image,
        price,
        inStock: true,
        isActive: true,
        finalPrice
      })

      // saveStorage(`${id}`, payload)

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async put (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const {
        id,
        name,
        image,
        price,
        finalPrice,
        percentStar,
        inStock,
        isActive
      }: IProduct = req.body

      const payload: any = await Product.findOneAndUpdate({ id }, {
        name,
        image,
        price,
        finalPrice,
        percentStar,
        inStock,
        isActive
      })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async delete (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const {
        id
      }: Partial<IProduct> = req.body
      const payload = await Product.findOneAndDelete({ id })

      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
}
