
export default interface IProduct {
  id: number,
  name: string,
  images: string[],
  image_cover: string,
  image_thumb: string,
  price: number,
  salePrice?:number,
  brand: string,
  featured_brand?: string,
  material: string,
  product_code: string,
  rateStar: number,
  availability: boolean,
  colors?: {
    name: string,
    sub_price: number,
  }[],
  sizes: {
    name: string,
    sub_price: number,
  }[],
  reviews?: {
    author: string,
    comment: string,
    rate: number,
    date: Date,
  }[],
  related_products?: number[],
  description: string,
}