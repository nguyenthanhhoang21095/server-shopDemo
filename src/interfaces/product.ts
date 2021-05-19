
export default interface IProduct {
    id: number;
    name: string;
    image: string;
    price?: number;
    finalPrice: number;
    percentStar?: number;
    inStock: boolean;
    isActive: boolean;
    // get: (req:any, res:any) => any;
    // getById: (req:any, res:any) => any;
    // post: (req:any, res:any) => any;
    // put: (req:any, res:any) => any;
    // delete: (req:any, res:any) => any;
}