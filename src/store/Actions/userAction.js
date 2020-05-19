
export const CREATE_USER = 'CREATE_USER';
export const SET_DRIVER='SET_DRIVER';
export const ADD_ADDRESS='ADD_ADDRESS';
export const UPDATE_DELIVERY_ADDRESS='UPDATE_DELIVERY_ADDRESS';
export const SET_USER_DELIVERY='SET_USER_DELIVERY';
export const SET_DRIVER_SETTING='SET_DRIVER_SETTING';
export const UPDATE_USER_PROFILE='UPDATE_USER_PROFILE';
//import Trip from '../../model/Trip';
import User from '../../Models/user';
import Delivery from '../../Models/deliveryAddress';
import { AsyncStorage } from 'react-native';
export const fetchUser = (email,pass) => {
    return async dispatch => {
      // any async code you want! 'https://drivermap-5b994.firebaseio.com/DriverApp/DriverDetails.json'
      // 
      const response = await fetch(`https://shopingkitchen.firebaseio.com/users.json?orderBy="AuthProp"&equalTo="${email}-${pass}"`
        
      );
  
      const resData = await response.json();
     // console.log(resData);
      const checkDat=[];
      for (const key in resData) {

        checkDat.push(
         resData[key].name,
     );
//console.log(checkDat);
   }
      const loadedusers = [];
      if(checkDat.length>0){
        for (const key in resData) {
       
       
            // console.log(resData[key]);
         loadedusers.push(
           new User(
             key,
             resData[key].name,
             resData[key].email,
             resData[key].phone,
             resData[key].password,
             resData[key].date,
             resData[key].orders,
             resData[key].deliveryAdress
           )
         );
       }
        }      
           else{
              // console.log('not');
               loadedusers.push('NOT_FOUND');      
    }

    AsyncStorage.setItem('UserId',loadedusers[0].id);
    dispatch({ type: SET_DRIVER, userAddeddata: loadedusers });
    }};
  
  
    export const fetchUserForSettingPage = (id) => {
        console.log(id)
      //  console.log(id);
        return async dispatch => {
          // any async code you want! 'https://drivermap-5b994.firebaseio.com/DriverApp/DriverDetails.json'
          // 
          const response = await fetch(`https://shopingkitchen.firebaseio.com/users/${id}.json`
            
          );
      
          const resData = await response.json();
         console.log(resData);
        
          const loadedusers = [];
          
             loadedusers.push(resData);
        dispatch({ type: SET_DRIVER_SETTING, userAddeddata: loadedusers });
        }};



export const AddUser = ( name,email,phone,password,date) => {
    return async dispatch => {
        // any async code you want!
      
        const response = await fetch('https://shopingkitchen.firebaseio.com/users.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            AuthProp:email+'-'+password,
            password,
            date,
            orders:'',
            deliveryAdress:'',
            
          })
        });
    
        const resData = await response.json();
        //console.log(resData);
    
        dispatch({
          type: CREATE_USER,
          tripData: {
            id: resData.name
           
          }
        });
      };
  };
  
  export const updateDriverData = (address,id) => {
      console.log(id);
    return async dispatch => {
      const response= await fetch(`https://shopingkitchen.firebaseio.com/users/${id}/deliveryAdress.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          
            Address :address,
        

          })
        }
      );
      const resData = await response.json();
     // console.log(resData);
      dispatch({
        type: ADD_ADDRESS,
        productData: {
          address
        }
      });
    };
  };


  export const updateDeliveryStatus = (status,id,deleviryId) => {
    console.log(id);
  return async dispatch => {
    const response= await fetch(`https://shopingkitchen.firebaseio.com/users/${id}/deliveryAdress/${deleviryId}/Address.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        
          active :status,
      

        })
      }
    );
    const resData = await response.json();
   console.log(resData);
    dispatch({
      type: UPDATE_DELIVERY_ADDRESS,
      productData: {
        status
      }
    });
  };
};



  export const fetchUserDelivery = (id) => {
      console.log(id);
    return async dispatch => {
      // any async code you want! 'https://drivermap-5b994.firebaseio.com/DriverApp/DriverDetails.json'
      // 
      const response = await fetch(`https://shopingkitchen.firebaseio.com/users/${id}/deliveryAdress.json`);
  
      const resData = await response.json();
     
    
      const loadedDlivery = [];
      
        for (const key in resData) {
       
            loadedDlivery.push(
                new Delivery(
                  key,
                  resData[key].Address.active,
                  resData[key].Address.city,
                  resData[key].Address.district,
                  resData[key].Address.number,
                  resData[key].Address.street,
                  resData[key].Address.type,
                  resData[key].Address.zip
                )
              );
       }
           

    dispatch({ type: SET_USER_DELIVERY, delivery: loadedDlivery });
    }};



    export const updateUserProfile = (id,name,email,phone) => {
      console.log(id);
    return async dispatch => {
      const response= await fetch(`https://shopingkitchen.firebaseio.com/users/${id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          
            name:name,
            email:email,
            phone:phone
        
  
          })
        }
      );
      const resData = await response.json();
     console.log(resData);
      dispatch({
        type: UPDATE_USER_PROFILE,
        productData: {
          name
        }
      });
    };
  };