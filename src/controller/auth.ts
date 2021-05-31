import { Response, Request } from "express";
import { User } from "../model";
import { IUser } from "../interfaces";
import * as dotenv from 'dotenv';

dotenv.config();

const handleToken = require("../common/jwtHelper");

const ACCESS_TOKEN_LIFE = '1h';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_LIFE = '365d';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

interface ReponseType {
  success?: boolean;
  data?: any;
}

export default class AuthServices {

  static async handleLogin(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const { account = "", password = "" } = req.body;

      const payload: any = await User.findOne({
        $and: [
          { account }, { password }
        ]
      })

      if (!payload) {
        return res.status(404);
      }

      const userInfoInToken: Partial<IUser> = {
        id: payload.id,
        fullName: payload.fullName,
        account: payload.account
      }

      const accessToken: string = await handleToken.generateAccessToken(userInfoInToken, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
      const refreshToken: string = await handleToken.generateAccessToken(userInfoInToken, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);

      const responseData = { ...payload, accessToken, refreshToken }

      return res.json({ success: true, data: responseData });
    } catch (error) {
      return res.status(500)
    }
  }

  static async refreshToken(
    req: any,
    res: any,
  ) {
    try {
      const refreshTokenFromClient = req.body.refreshToken;
      if (!refreshTokenFromClient) return res.status(403).send('No token provided');

      const decoded: any = await handleToken.verifyAccessToken(refreshTokenFromClient, REFRESH_TOKEN_SECRET);
      const userData = decoded.data;
      const accessToken = await handleToken.generateAccessToken(userData, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
      return res.json({ success: true, data: accessToken })
    } catch (error) {
      res.status(403).send('Invalid refresh token.');
    }
  }
}
