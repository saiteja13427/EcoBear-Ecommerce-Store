import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  const item = action.payload;

  switch (action.type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (!existItem) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      } else {
        console.log(existItem);
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== item.product),
      };
      break;
    default:
      return state;
  }
};
