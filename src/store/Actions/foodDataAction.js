export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_FAV_PRODUCTS='SET_FAV_PRODUCTS';
import Food from '../../Models/FoodItems';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
import PopularItems from '../../Models/popularItem';




export const toggleFavorite = (item) => {
    
    return { type: TOGGLE_FAVORITE, foodItem: item };
};




export const fetchProducts = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'https://shopingkitchen.firebaseio.com/Catgorry.json'
      );
  
      const resData = await response.json();
      const foodProducts = [];
  
      for (const key in resData) {
        foodProducts.push(
          new Food(
            key,
            resData[key].CategoryName,
            resData[key].img,
            resData[key].CatData
          )
        );
  
      }
  
      dispatch({ type: SET_PRODUCTS, products:foodProducts });
    };
  };
  
  export const fetchPopularProducts = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'https://shopingkitchen.firebaseio.com/PopularItems.json'
      );
  
      const resData = await response.json();
      const foodProducts = [];
  
      for (const key in resData) {
        foodProducts.push(
          new PopularItems(
            key,
            resData[key].name,
            resData[key].price,
            resData[key].quantity,
            resData[key].imageUri
          )
        );
  
      }
  
      dispatch({ type: SET_FAV_PRODUCTS, fav:foodProducts });
    };
  };




  