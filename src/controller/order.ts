import { Response, Request } from "express";
import { Order } from "../model";
import { ICart, IOrder } from '../interfaces'

interface ReponseType {
    success: boolean;
    data: any;
}

export default class OrderServices {
    static async getOrderList(
        req: Request,
        res: Response<ReponseType>
    ): Promise<Response<ReponseType>> {
        try {
            const payload: any = await Order.find();
            return res.json({ success: true, data: payload });
        } catch (error) {
            return res.status(500);
        }
    }

    static async getOrderById(
        req: Request,
        res: Response<ReponseType>
    ): Promise<Response<ReponseType>> {
        try {
            const id: number = parseInt(req.params.id);
            const payload: any = Order.findOne({ id });
            return payload;
        } catch (error) {
            throw Error("Fail to get cart");
        }
    }

    static async submitOrder(
        req: Request,
        res: Response<ReponseType>
    ): Promise<Response<ReponseType>> {
        try {
            const { id, create_date, order_id, method_payment, products } = req.body;

            const data: any = await Order.findOne({ id });
            const orderArr = data.orders;
            const updatedOrderList = [
                ...orderArr,
                {
                    create_date,
                    order_id,
                    method_payment,
                    products,
                }
            ];

            await Order.findOneAndUpdate(
                {
                    id,
                },
                {
                    $set: {
                        orders: updatedOrderList,
                    },
                }
            );
            return res.json({ success: true, data: [] });
        } catch (error) {
            throw new Error("Cannot create new cart");
        }
    }
}
