import { defaultModel } from '../common/constants'

export default {
  id: defaultModel.number,
  orders: [{
    order_id: defaultModel.string,
    create_date: defaultModel.date,
    method_payment: defaultModel.string,
    products: defaultModel.object,
  }]
}
