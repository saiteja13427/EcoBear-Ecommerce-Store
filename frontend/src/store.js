import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

//All the list of reducers which hold the state and pass it to components
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

//To get the cart items from localstorage and add them to the initial state of cart screen
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//An object to have the initial state if required
const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

// An aarray of middlewares to be used in the store
const middleware = [thunk];

//The main store which takes the reducders, initialState, and all the middlewares
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) //applyMiddleware takes all the middlewares so spreading the array here
);

export default store;
