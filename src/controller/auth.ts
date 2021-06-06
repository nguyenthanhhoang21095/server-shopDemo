import { Response, Request } from "express";
import { User } from "../model";
import { IUser } from "../interfaces";
import CartServices from "../controller/cart";
import * as dotenv from 'dotenv';

dotenv.config();

const handleToken = require("../common/jwtHelper");
const handleHashedPassword = require("../common/hashPassword");
const ACCESS_TOKEN_LIFE = '1h';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_LIFE = '365d';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

interface ReponseType {
  success?: boolean;
  data?: any;
}

export default class AuthServices {

  static async handleLogin(
    req: Request,
    res: Response<ReponseType> | any,
  ): Promise<Response<ReponseType>> {
    try {
      const { account = "", password = "" } = req.body;
      const payload: any = await User.findOne({ account });
      // Check is exist account
      if (!payload) return res.status(401).send("Cannot find user");
      const isCorrectPass = await handleHashedPassword.checkPassword(password, payload.password);
      
      if (!isCorrectPass) {
        return res.status(401).send("Invalid password")
      }

      const userInfoInToken: Partial<IUser> = {
        id: payload.id,
        fullName: payload.fullName,
        account: payload.account,
        role: payload.role,
      }

      const accessToken: string = await handleToken.generateAccessToken(userInfoInToken, ACCESS_TOKEN_SECRET, payload.role === "admin"? "31d" : ACCESS_TOKEN_LIFE);
      const refreshToken: string = await handleToken.generateAccessToken(userInfoInToken, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
     
      const resUserData = {
        id: payload.id,
        account: payload.account,
        password: payload.password,
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address,
        isActive: payload.isActive,
        role: payload.role,
      }
    
      const responseData = {
        ...resUserData,
        accessToken,
        refreshToken
      };
      
      return res.json({ success: true, data: responseData });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }

  static async handleRegister(
    req: Request,
    res: Response<ReponseType> | any,
  ): Promise<Response<ReponseType>> {
    try {
      let userId: number = 0;
      const userList = await User.find({});
      if (userList.length) userId = userList.length;
      const {
        account,
        password,
        fullName,
        phone,
        address,
        role = "member",
      }: IUser = req.body;

      const existUser = await User.findOne({ account });
      if (existUser) return res.json({ success: false, data: null });

      const hashedPass: string = await handleHashedPassword.hashedPassword(password);
      const payload: any = await User.create({
        id: userId,
        account,
        password: hashedPass,
        fullName,
        phone,
        address,
        isActive: true,
        role,
      });

      await CartServices.initNewCart(userId);

      const userInfoInToken: Partial<IUser> = {
        id: payload.id,
        fullName: payload.fullName,
        account: payload.account,
        role: payload.role
      }

      const accessToken: string = await handleToken.generateAccessToken(userInfoInToken, ACCESS_TOKEN_SECRET, role === "admin"? "31d" : ACCESS_TOKEN_LIFE);
      const refreshToken: string = await handleToken.generateAccessToken(userInfoInToken, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);
      
      const resUserData = {
        id: payload.id,
        account: payload.account,
        password: payload.password,
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address,
        isActive: payload.isActive,
        role: payload.role,
      }
      const responseData = {
        ...resUserData,
        accessToken,
        refreshToken
      };

      return res.json({ success: true, data: responseData });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }

  static async refreshToken(
    req: any,
    res: any,
  ) {
    try {
      const refreshTokenFromClient = req.body.refreshToken;
      if (!refreshTokenFromClient) return res.send('No token provided');

      const decoded: any = await handleToken.verifyAccessToken(refreshTokenFromClient, REFRESH_TOKEN_SECRET);
      const userData = decoded.data;
      const accessToken = await handleToken.generateAccessToken(userData, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
      return res.json({ success: true, data: accessToken })
    } catch (error) {
      res.status(403).send('Invalid refresh token.');
    }
  }
}
