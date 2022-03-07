import { Response, Request } from 'express'
import { SubCategory } from '../model'
// import { getStorage, saveStorage } from '../common/function'
// import redis from "redis"
import { ISubCategory } from '../interfaces'

interface ReponseType {
  success: boolean
  data: any
}

export default class SubCategoryServices {
  static async get (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload: ISubCategory[] = await SubCategory.aggregate([
        { $lookup:
          {
            from: 'products',
            localField: 'productArr',
            foreignField: 'id',
            as: 'productArr'
          }
        },
        {
          $sort: {
            id: 1
          }
        }
      ])
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
  
  static async getById (
    req: Request,
    res: Response<ReponseType>
  ) {
    try {
      const id: number = parseInt(req.params.id);
      const data: any = await SubCategory.aggregate([
        { $match: { 
            id 
          } 
        },
        { $lookup:
          {
            from: 'products',
            localField: 'productArr',
            foreignField: 'id',
            as: 'productArr'
          }
        },
      ]);
      
      return res.json({ success: true, data: data ?? [] })
    } catch (error) {
      return res.status(500)
    }
  }
}
