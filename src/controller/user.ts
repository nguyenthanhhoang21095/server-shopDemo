import { Response, Request, response } from "express";
import { User } from "../model";
import CartServices from "../controller/cart";

interface ReponseType {
  success?: boolean;
  data?: any;
}

export default class UserServices {
  static async getAllUsers(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const payload = await User.find();
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

 
  static async checkAuthUser (
    req: Request,
    res:  Response<ReponseType>
  ):Promise<Response<ReponseType>> {
    try {
      const { account = "", password = "" } = req.body;

      const payload = await User.findOne({
        $and: [
          { account }, { password }
        ]
      })
      if (payload) return res.json({ success: true, data: payload});
      return res.json({ success: false, data: null})
    } catch (error) {
      return res.status(500)
    }
  }
  
  static async createNewUser(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      let userId:number = 0;
      const userList = await User.find({});
      if (userList.length) userId = userList.length;
      const {
        account,
        password,
        fullName,
        phone,
        address,
      } = req.body;

      const existUser = await User.findOne({ account });
      if (existUser) return res.json({ success: false, data: null });

      const payload = await User.create({
        id: userId,
        account,
        password,
        fullName,
        phone,
        address,
        isActive: true,
      });
      
      await CartServices.initNewCart(userId);

      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

  static async put(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const {
        id,
        account,
        password,
        fullName,
        phone,
        address,
      } = req.body;

      const payload = await User.findOneAndUpdate({
        id,
        account,
        password,
        fullName,
        phone,
        address,
      });
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

  // static async delete (
  //   req: Request,
  //   res: Response<ReponseType>
  // ): Promise<Response<ReponseType>> {
  //   try {
  //     const id: number = parseInt(req.params.id);
  //     const payload = await User.findOneAndDelete({ id })
  //     return res.json({ success: true, data: payload })
  //   } catch (error) {
  //     return res.status(500)
  //   }
  // }
}
