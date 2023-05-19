import { actionList } from "./action";
import { loadState } from "./localStorage";

export const persistedState = loadState();
const initialStore = {
  cart: persistedState?.cart?.length > 0 ? [...persistedState.cart] : [],
  totalBillAmount: 0,
  persistedState,
};

const upsert = (array, element) => {
  const cartArr = [...array];
  const index = cartArr.findIndex((e) => e.name === element.name);
  if (index === -1) {
    cartArr.push(element);
  }
  return cartArr;
};

function reducer(state = initialStore, action) {
  switch (action.type) {
    case actionList.INCREASE: {
      const arr = upsert(state.cart, action.payload.item);
      const cart = arr.map((item) => {
        if (item.name === action.payload.item.name) {
          item.quantity++;
        }
        return item;
      });
      return {
        ...state,
        cart,
      };
    }
    case actionList.DECREASE: {
      const arr = upsert(state.cart, action.payload.item);
      return {
        ...state,
        cart: arr
          .map((item) => {
            if (item.name === action.payload.item.name) {
              if (item.quantity === 0) {
                return item;
              } else {
                item.quantity--;
              }
            }
            return item;
          })
          .filter((item) => item.quantity !== 0),
      };
    }
    case actionList.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case actionList.REMOVE:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.name !== action.payload.item.name
        ),
      };
    default:
      return state;
  }
}

export default reducer;
