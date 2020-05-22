//import PRODUCTS from '../../data/dummy-data';
import {ADD_ORDER} from '../Actions/userAction';
//import CurrentUser_Login from '../../model/Currentuser';
const initialState = {
    orderData:[]
};

export default(state = initialState, action) => {

    switch(action.type){

        case ADD_ORDER:
            return {
                ...state
            
            };
       
    }
    return state;
};

