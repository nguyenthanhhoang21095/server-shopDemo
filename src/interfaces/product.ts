
export default interface IProduct {
    id: number;
    name: string;
    image: string;
    price?: number;
    finalPrice: number;
    percentStar?: number;
    inStock: boolean;
    isActive: boolean;
}