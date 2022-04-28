import { Response, Request } from 'express'
import { Product } from '../model'
import { IProduct } from '../interfaces'

// import { getStorage, saveStorage } from '../common/function'
// import redis from "redis"

interface ReponseType {
  success: boolean
  data: any
}

export default class SearchServices {
  static async get (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
        const payload: any = await Product.find({});
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
        const { keyword = "" } = req.body;
        const findRes: any = await Product.find({});
        const payload: IProduct[] = findRes.filter((item:IProduct) => item.name.match(keyword))
        .sort((a:IProduct, b: IProduct) => a.id - b.id);
        return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
}
