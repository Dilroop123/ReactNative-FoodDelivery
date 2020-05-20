export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const ADD_CART_FIREBASE="ADD_CART_FIREBASE";
export const EMPTY_CART='EMPTY_CART';


export const addToCart = product => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = productId => {
    return { type: REMOVE_FROM_CART, pid: productId };
  };

  export const emptyCart=()=>{
    console.log('in actions...');
    return {type:EMPTY_CART}
}
          
export const AddToFireBase = (id,cart,Total) => {
  return async dispatch => {
      // any async code you want!
    
      const response = await fetch(`https://shopingkitchen.firebaseio.com/users/${id}/cart.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          cartValues:cart,
          TotalSum:Total
          
        })
      });
  
      const resData = await response.json();
      console.log(resData);
      const loadedusers = [];
          
      loadedusers.push(resData);

      dispatch({
        type: ADD_CART_FIREBASE,
        CartData: loadedusers
      });
    };
};