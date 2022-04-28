import IProduct  from "./product";

type additionCartOption = {
    color: {
        name: string,
        sub_price: number
    };
    size: {
        name: string,
        sub_price: number
    }
}
export default interface ICart {
    id: number;
    cart: (IProduct & additionCartOption)[] ;
}