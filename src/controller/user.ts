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

  // static async handleLogin(
  //   req: Request,
  //   res: Response<ReponseType>
  // ): Promise<Response<ReponseType>> {
  //   try {
  //     const { account = "", password = "" } = req.body;

  //     const payload: any = await User.findOne({
  //       $and: [
  //         { account }, { password }
  //       ]
  //     })
      
  //     if (!payload) {
  //       return res.status(404);
  //     }

  //     const userInfoInToken: Partial<IUser> = {
  //       id: payload.id,
  //       fullName: payload.fullName,
  //       account: payload.account
  //     }
      
  //     const hashedAccessToken = await sha256(ACCESS_TOKEN_SECRET);
  //     const hashedRefreshToken = await sha256(REFRESH_TOKEN_SECRET);
      
  //     const accessToken: string = await handleToken.generateAccessToken(userInfoInToken, hashedAccessToken, ACCESS_TOKEN_LIFE);
  //     const refreshToken: string = await handleToken.generateAccessToken(userInfoInToken, hashedRefreshToken, REFRESH_TOKEN_LIFE);
      
  //     const responseData = { ...payload, accessToken, refreshToken }

  //     return res.json({ success: true, data: responseData });
  //   } catch (error) {
  //     return res.status(500)
  //   }
  // }

  // static async refreshToken (
  //   req: any,
  //   res: any,
  // ) {
  //   try {
  //     const refreshTokenFromClient = req.body.refreshToken;
  //     if (!refreshTokenFromClient) return res.status(403).send('No token provided');
  //     const decoded:any  = await handleToken.verifyAccessToken(refreshTokenFromClient, REFRESH_TOKEN_SECRET);
  //     const userData = decoded.data;
  //     const accessToken = await handleToken.generateAccessToken(userData, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
  //     return res.json({ success: true, data: accessToken }) 
  //   } catch (error) {
  //     res.status(403).send('Invalid refresh token.');
  //   }
  // }
  
  

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

      const payload = await User.findOneAndUpdate({
        id,
        account,
        password,
        fullName,
        phone,
        address,
        role,
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
