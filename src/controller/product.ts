import { Response, Request } from 'express'
import { Product } from '../model'
// import { getStorage, saveStorage } from '../common/function'
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
      const payload: any = await Product.findOne({ id });
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }

  static async getRelatedById (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const id: number = parseInt(req.params.id)
      const payload: any = await Product.aggregate([
        { $match: { 
            id 
          } 
        },
        { 
          $lookup:{
            from: 'products',
            localField: 'related_products',
            foreignField: 'id',
            as: 'related_products'
          }
        },
        {
          $project: { "related_products": 1}
        }
      ])
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
        images,
        image_cover,
        image_thumb,
        price,
        salePrice,
        brand,
        featured_brand,
        material,
        product_code,
        rateStar,
        availability,
        colors,
        sizes,
        reviews,
        related_products,
        description
      }: IProduct = req.body

      const prodList: any = await Product.find({})
      if (prodList.length) prodId = prodList.length;

      const payload: any = await Product.create({
        id: prodId,
        name,
        images,
        image_cover,
        image_thumb,
        price,
        salePrice,
        brand,
        featured_brand,
        material,
        product_code,
        rateStar,
        availability,
        colors,
        sizes,
        reviews,
        related_products,
        description
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
        images,
        image_cover,
        image_thumb,
        price,
        salePrice,
        brand,
        featured_brand,
        material,
        product_code,
        rateStar,
        availability,
        colors,
        sizes,
        reviews,
        related_products
      }: IProduct = req.body

      await Product.findOneAndUpdate({ id }, {
        id,
        name,
        images,
        image_cover,
        image_thumb,
        price,
        salePrice,
        brand,
        featured_brand,
        material,
        product_code,
        rateStar,
        availability,
        colors,
        sizes,
        reviews,
        related_products
      })
      const payload = await Product.find();
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
      await Product.findOneAndDelete({ id });
      const payload = await Product.find();
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
}
