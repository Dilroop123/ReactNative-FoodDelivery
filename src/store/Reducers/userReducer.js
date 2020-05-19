//import PRODUCTS from '../../data/dummy-data';
import {SET_DRIVER ,CREATE_USER,ADD_ADDRESS,SET_USER_DELIVERY,UPDATE_USER_PROFILE,UPDATE_DELIVERY_ADDRESS,SET_DRIVER_SETTING} from '../Actions/userAction';
//import CurrentUser_Login from '../../model/Currentuser';
const initialState = {
    UsersData: [],
   deliverydata:[],
   userSettingData:[]
};

export default(state = initialState, action) => {

    switch(action.type){

        case SET_DRIVER:
            return {
                ...state,UsersData: action.userAddeddata
            
            };
       case CREATE_USER:
           return{
               ...state
           }
           case ADD_ADDRESS:
               return{
                   ...state
               }

        case SET_USER_DELIVERY:
            
            return{
                ...state,deliverydata:action.delivery
            }
       case UPDATE_DELIVERY_ADDRESS:
           return{
               ...state
           }
           case SET_DRIVER_SETTING:
               return{
                ...state,userSettingData:action.userAddeddata
               }
               case UPDATE_USER_PROFILE:
                   return{
                       ...state
                   }
    }
    return state;
};

