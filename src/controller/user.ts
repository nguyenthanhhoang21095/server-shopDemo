import { Response, Request } from "express";
import { User } from "../model";
import { IUser } from "../interfaces";
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
      const payload: any = await User.find();
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

  static async getUserById(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const id = parseInt(req.params.id);
      const payload: any = await User.findOne({ id });
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
        role = "member"
      }: IUser = req.body;

      await User.findOneAndUpdate({ id }, {
        account,
        password,
        fullName,
        phone,
        address,
        role,
      });
      const payload = await User.find();
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }
}
