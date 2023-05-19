export const actionList = {
  INCREASE:'INCREASE',
  DECREASE:'DECREASE',
  REMOVE:'REMOVE',
  CLEAR_CART:'CLEAR_CART'
}

export function actionGenerator(type,item) {
    return {
        type,
        payload: {
            item: {
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }
        }
    }
}