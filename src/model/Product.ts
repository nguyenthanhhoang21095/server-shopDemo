import { defaultModel } from '../common/constants'

export default{
  id: defaultModel.number,
  name: defaultModel.string,
  image: defaultModel.string,
  price: defaultModel.number,
  finalPrice: defaultModel.number,
  percentStar: defaultModel.number,
  inStock: defaultModel.boolean,
  isActive: defaultModel.boolean
}
