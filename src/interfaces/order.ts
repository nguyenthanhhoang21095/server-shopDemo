import ICart  from "./cart";

export default interface IOrder {
    id: number;
    orders: {
        order_id: string,
        create_date: string,
        method_payment: string,
        products: ICart,
    }[];
}