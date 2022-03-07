import { defaultModel } from '../common/constants'

export default {
  id: defaultModel.number,
  name: defaultModel.string,
  images: defaultModel.array,
  image_cover: defaultModel.string,
  image_thumb: defaultModel.string,
  price: defaultModel.number,
  brand: defaultModel.string,
  featured_brand: defaultModel.string,
  material: defaultModel.string,
  product_code: defaultModel.string,
  salePrice: defaultModel.number,
  rateStar: defaultModel.number,
  availability: defaultModel.boolean,
  colors: defaultModel.array,
  sizes: defaultModel.array,
  reviews: defaultModel.array,
  related_products: defaultModel.array,
  description: defaultModel.string,
}
