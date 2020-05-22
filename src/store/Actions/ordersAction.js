export const ADD_ORDER='ADD_ORDER';

export const AddOrder = ( id,date,cartitems,locationdata) => {
    return async dispatch => {
        // any async code you want!
      
       

        const response = await fetch(`https://shopingkitchen.firebaseio.com/users/${id}/orders.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderDate:date,
            orderStatus:'on-the-way',
            orderItems:cartitems,
            location:locationdata
            
            
          })
        });
    
        const resData = await response.json();
        //console.log(resData);
    
        dispatch({
          type: ADD_ORDER,
          tripData: {
            id: resData.name
           
          }
        });
      };
  };