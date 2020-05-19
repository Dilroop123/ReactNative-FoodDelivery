
import {SET_PRODUCTS,TOGGLE_FAVORITE ,SET_FAV_PRODUCTS} from '../Actions/foodDataAction';
const initialState = {
    availableProducts:[],
    favoriteMeals:[],
    popularItems:[]
};

export default(state = initialState, action) => {

    switch(action.type){

        case SET_PRODUCTS:
            return {
              ...state,availableProducts: action.products
            };
            case TOGGLE_FAVORITE:

                if(state.favoriteMeals[0]==undefined){
                    state.favoriteMeals=[];
                }
                
                    if(state.favoriteMeals.length!=0){
                      const existingIndex = state.favoriteMeals.findIndex(
                        meal => meal.name === action.foodItem.name
                      );
                      //console.log("existingvalue"+existingIndex);
                      if (existingIndex >= 0) {
                         
                        const updatedFavMeals = [...state.favoriteMeals];
                        updatedFavMeals.splice(existingIndex, 1);
                        return { ...state, favoriteMeals: updatedFavMeals };
                      } else {
                        return { ...state, favoriteMeals: state.favoriteMeals.concat(action.foodItem) };
                      }
                      }
                     else{
                        
                        return { ...state, favoriteMeals: state.favoriteMeals.concat(action.foodItem) };
                     }
                     case SET_FAV_PRODUCTS:
                       return{
                         ...state,popularItems:action.fav
                       }
                  

    }
    return state;
};

