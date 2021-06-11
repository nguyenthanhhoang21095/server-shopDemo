import { Response, Request } from "express";
import { Cart } from "../model";
import { ICart } from '../interfaces'
interface ReponseType {
  success: boolean;
  data: any;
}

export default class CartServices {
  static async getById(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const id: number = parseInt(req.params.id);
      const payload: any = await Cart.findOne({ id });
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

  static async getCartInfo(id: number) {
    try {
      const payload: any = await Cart.find({ id });
      return payload;
    } catch (error) {
      throw Error("Fail to get cart");
    }
  }

  static async initNewCart(id: number) {
    try {
      const newCart: ICart = {
        id,
        cart: [],
      };
      const payload:any = await Cart.create(newCart);
      return payload;
    } catch (error) {
      throw new Error("Cannot create new cart");
    }
  }

  static async updateCart(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const { id, product, action = "increase" } = req.body;
      const data: any = await Cart.findOne({ id });
      const cartArr = data.cart;
      let newCart: ICart[] = [];
      const prodIdx: number = cartArr.findIndex(
        (elm: ICart) => elm.id === product.id
      );
      
      if (prodIdx != -1 && ((action === "decrease" && product.quantity <= 1) || action === "remove")
      ) {
        newCart = [
          ...cartArr.slice(0, prodIdx),
          ...cartArr.slice(prodIdx + 1, cartArr.length),
        ];
        
      } else if (prodIdx != -1) {
        
        const quantity =
          action === "decrease"
            ? cartArr[prodIdx].quantity - 1
            : cartArr[prodIdx].quantity + 1;
        newCart = [
          ...cartArr.slice(0, prodIdx),
          {
            ...product,
            quantity,
          },
          ...cartArr.slice(prodIdx + 1, cartArr.length),
        ];
      } else {
        newCart = [
          ...cartArr,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
      console.log(newCart);
      
      await Cart.findOneAndUpdate(
        {
          id,
        },
        {
          $set: {
            cart: newCart,
          },
        }
      );

      const payload: any = await Cart.findOne({ id });
      
      return res.json({ success: true, data: payload });
    } catch (error) {
      return res.status(500);
    }
  }

  // static async deleteCart(
  //   req: Request,
  //   res: Response<ReponseType>
  // ): Promise<Response<ReponseType>> {
  //   try {
  //     const id: number = parseInt(req.params.id);
  //     const payload: any = await Cart.findOneAndDelete({ id });
  //     return res.json({ success: true, data: payload });
  //   } catch (error) {
  //     return res.status(500);
  //   }
  // }
}
