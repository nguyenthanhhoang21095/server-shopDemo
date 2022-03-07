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
      let payload:any;
      payload = await Cart.findOne({ id });
      if (!payload) payload = await CartServices.initNewCart(id);
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

  static async addToCart(
    req: Request,
    res: Response<ReponseType>
  ):Promise<Response<ReponseType>> {
    try {
      const { id, product } = req.body;
      let newCart = [];
      const { cart } : any = await CartServices.getCartInfo(id);
      
      const prodIdx:number = cart.length
        ? cart.findIndex((item:any) => item.id === product.id)
        : -1;

      if (prodIdx !== -1) {
        newCart = [
          ...cart.slice(0, prodIdx),
          {
            ...product,
            quantity: cart[prodIdx].quantity + 1,
          },
          ...cart.slice(prodIdx + 1, cart.length),
        ]
      } else {
        newCart = [
          ...cart,
          {
            ...product,
            quantity: 1,
          },
        ]
      };

      const updatedData: any = await Cart.findOneAndUpdate(
        {
          id,
        },
        {
          $set: {
            cart: newCart,
          },
        }, {
          new: true
        }
      );
      // data.UpdateOne => return new value
      return res.json({ success: true, data: updatedData });
    } catch (error) {
      return res.status(500);
    }
  }

  static async removeFromCart(
    req: Request,
    res: Response<ReponseType>
  ):Promise<Response<ReponseType>> {
    try {
      const { id, product } = req.body;
      let newCart:any[] = [];
      const { cart } : any = await CartServices.getCartInfo(id);
      
      const prodIdx:number = cart.length
        ? cart.findIndex((item:any) => item.id === product.id)
        : -1;
      
      if (prodIdx === -1) return res.json({ success: true, data: cart });

      newCart = [
        ...cart.slice(0, prodIdx),
        ...cart.slice(prodIdx + 1, cart.length),
      ]
      const updatedData: any = await Cart.findOneAndUpdate(
        {
          id,
        },
        {
          $set: {
            cart: newCart,
          },
        }, {
          new: true
        }
      );
      // data.UpdateOne => return new value
      return res.json({ success: true, data: updatedData });
    } catch (error) {
      return res.status(500);
    }
  }

  static async updateCart(
    req: Request,
    res: Response<ReponseType>
  ): Promise<Response<ReponseType>> {
    try {
      const { id, product, action = "" } = req.body;
      const { cart }: any = await CartServices.getCartInfo(id);;
      let newCart: ICart[] = [];
      const prodIdx: number = cart.length
      ? cart.findIndex((item:any) => item.id === product.id)
      : -1;
      
      if (prodIdx != -1 && ((action === "decrease" &&  cart[prodIdx].quantity <= 1) || action === "remove")
      ) {
        newCart = [
          ...cart.slice(0, prodIdx),
          ...cart.slice(prodIdx + 1, cart.length),
        ]
        
      } else if (prodIdx != -1) {
        const newQuantity =
          action === "decrease"
            ? cart[prodIdx].quantity - 1
            : cart[prodIdx].quantity + 1;
        
        newCart = [
          ...cart.slice(0, prodIdx),
          {
            ...product,
            quantity: newQuantity,
          },
          ...cart.slice(prodIdx + 1, cart.length),
        ];
      } else {
        newCart = [
          ...cart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
      
      const updatedData:any = await Cart.findOneAndUpdate(
        {
          id,
        },
        {
          $set: {
            cart: newCart,
          },
        }, {
          new: true
        }
      );

      // data.UpdateOne => return new value
      return res.json({ success: true, data: updatedData });
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
