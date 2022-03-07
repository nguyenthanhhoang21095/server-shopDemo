import { Response, Request } from 'express'
import { Banner } from '../model'
// import { getStorage, saveStorage } from '../common/function'
// import redis from "redis"
// import { IBanner } from '../interfaces'

interface ReponseType {
  success: boolean
  data: any
}

export default class BannerServices {
  static async get (
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload: any = await Banner.find({})
      return res.json({ success: true, data: payload })
    } catch (error) {
      return res.status(500)
    }
  }
}
