import { Response, Request } from 'express'
import { Feature } from '../model'
// import { getStorage, saveStorage } from '../common/function'
// import redis from "redis"
// import { IFeature } from '../interfaces'

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
      const payload: any = await Feature.aggregate([
        { 
          $lookup:{
            from: 'products',
            localField: 'feature_data.product_id',
            foreignField: 'id',
            as: 'data'
          }
        }
      ])
      const featureArr = payload[0].feature_data;
      const prodArr = payload[0].data.sort((a:any, b:any) => a.id - b.id);
      for (let i = 0; i < prodArr.length; i++) {
        prodArr[i]["is_thumb"] = featureArr[i]["is_thumb"];
      }
      const finalPayload = [
        {
          _id: payload[0]._id,
          id: payload[0].id,
          feature_data: prodArr
        }
      ];
      
      /**
       * @ Old aggregation
      */ 

      // const payload: any = await Feature.aggregate([
      //   { 
      //     $unwind: "$feature_data" 
      //   },
      //   { 
      //     $lookup:{
      //       from: 'products',
      //       localField: 'feature_data.product_id',
      //       foreignField: 'id',
      //       as: 'data'
      //     }
      //   },
      //   {
      //     $addFields: {
      //       "data.is_thumb": "$feature_data.is_thumb"
      //     }
      //   },
      //   { 
      //     $group: {
      //       _id: "$id",  
      //       feature_data: { 
      //         $push: {
      //           $arrayElemAt: [ "$$ROOT.data", 0 ]
      //         } 
      //       }
      //     } 
      //   },
      //   {
      //     $sort: {
      //       id: -1
      //     }
      //   }
      // ]);
      return res.json({ success: true, data: finalPayload })
    } catch (error) {
      return res.status(500)
    }
  }
}
