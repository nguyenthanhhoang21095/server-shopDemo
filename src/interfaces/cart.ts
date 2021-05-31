import IProduct  from "./product";

export default interface ICart {
    id: number;
    cart: IProduct[];
}