import { defaultModel } from '../common/constants'

export default {
  id: defaultModel.number,
  name: defaultModel.string,
  image: defaultModel.string,
  description: defaultModel.string,
  type: defaultModel.string,
  hasSubCategory: defaultModel.boolean,
  subCategory: defaultModel.array || defaultModel.null
}
