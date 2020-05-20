import { ADD_TO_CART,ADD_CART_FIREBASE,EMPTY_CART} from '../Actions/cartAction';
import CartItem from '../../Models/cart';
import React,{useCallback} from 'react';
const initialState = {
  items: {},
  totalAmount: 0,
  cartData:[]
};
  


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
     // console.log(addedProduct);
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.name;
    const image=addedProduct.images[0];
    const favourie=addedProduct.favorite;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + addedProduct.quantity,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + addedProduct.total,
          image,
          favourie
        );
       // console.log(updatedOrNewCartItem);
      } else {
      const addedProduct = action.product;
      updatedOrNewCartItem = new CartItem(addedProduct.quantity, prodPrice, prodTitle, addedProduct.total,addedProduct.images[0],addedProduct.favorite);
      //  console.log(updatedOrNewCartItem);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.total
      };

      case ADD_CART_FIREBASE:
          return{
            ...state,cartData:action.CartData
          }
          case EMPTY_CART:
            return{
                ...state,items:{},totalAmount:0
            }
    
  }
  return state;
};
