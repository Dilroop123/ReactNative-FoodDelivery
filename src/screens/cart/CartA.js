/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import remove from 'lodash/remove';
import getImgSource from '../../utils/getImgSource.js';
// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import Button from '../../components/buttons/Button';
import {Heading6, Subtitle1} from '../../components/text/CustomText';
import Divider from '../../components/divider/Divider';
import { AsyncStorage } from 'react-native';
import * as CartAction from '../../store/Actions/cartAction';
import EmptyState from '../../components/emptystate/EmptyState';
import { useSelector, useDispatch } from 'react-redux';
// import colors
import Colors from '../../theme/colors';

// CartA Config
const EMPTY_STATE_ICON = 'cart-remove';

// CartA Styles
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  titleText: {
    fontWeight: '700',
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  subTotalText: {
    top: -2,
    fontWeight: '500',
    color: Colors.onSurface,
  },
  subTotalPriceText: {
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  bottomButtonContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

// CartA
const CartA=({navigation,route})=> {
  

    
    // let total= 0.0;
    const[userId,setUserId]=useState();
     const total = useSelector(state => state.cart.totalAmount);
     const dispatch=useDispatch();
     /* let products= [
        {
          id: 'product1',
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 10.0,
          quantity: 2,
          discountPercentage: 10,
        },
        {
          id: 'product2',
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 20.0,
          quantity: 1,
        },
        {
          id: 'product3',
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 30.0,
          quantity: 2,
        },
      ];*/
    
     // const TotalProducts = useSelector(state => state.cart.items);
//console.log(TotalProducts);

const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        name: state.cart.items[key].name,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        imageUri:state.cart.items[key].imageUri
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  //console.log(cartItems)
  /*componentDidMount = () => {
    //this.updateTotalAmount();
  };*/

  const navigateTo = (screen,item) => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen,{itemValues:item});
  };

  const swipeoutOnPressRemove = (item) => () => {
//let {products} = this.state;
   // const index = products.indexOf(item);

   // products = remove(products, (n) => products.indexOf(n) !== index);

    /*this.setState(
      {
        products,
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };

 const onPressRemove = (item) => () => {
    let {quantity} = item;
    quantity -= 1;

//let {products} = this.state;
    const index = products.indexOf(item);

    if (quantity === 0) {
      products = remove(products, (n) => products.indexOf(n) !== index);
    } else {
      products[index].quantity = quantity;
    }

    this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );*/
  };

  /*const onPressAdd = (item) => () => {
    const {quantity} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].quantity = quantity + 1;

/*this.setState(
      {
        products: [...products],
      },
      () => {
        this.updateTotalAmount();
      },
    );
  };*/

  const updateTotalAmount = () => {
    //const {products} = this.state;
   /* let total = 0.0;

    products.forEach((product) => {
      let {price} = product;
      const {discountPercentage, quantity} = product;

      if (typeof discountPercentage !== 'undefined') {
        price -= price * discountPercentage * 0.01;
      }
      total += price * quantity;
    });

    this.setState({
      total,
    });*/
  };
/*const sendData=()=>{
  
     const arraydata=[
      {
        imageUri:'https://firebasestorage.googleapis.com/v0/b/shopingkitchen.appspot.com/o/nuggets%2FCheeseStuffed.png?alt=media&token=351fc04f-6ddd-4aea-86c9-fc81d505b297',
        name: 'Cheese Stuffed',
        price: 10.99,
        quantity: 0,
        id:'p24'
      },
      {
        imageUri:'https://firebasestorage.googleapis.com/v0/b/shopingkitchen.appspot.com/o/nuggets%2Fpperoninuggets.png?alt=media&token=27eda129-1fc5-4379-8867-a53870b829bf',
        name: 'Pperoni Nuggets',
        price: 10.99,
        quantity: 0,
        id:'p25'
      },
      {
        imageUri:'https://firebasestorage.googleapis.com/v0/b/shopingkitchen.appspot.com/o/nuggets%2Fcinnamonsugarnuggets.png?alt=media&token=b5fa321c-b958-47ff-b026-53c405980544',
        name: 'Cinnamon Sugar Nuggets',
        price: 10.99,
        quantity: 0,
        id:'p26'
      },
        {
          imageUri:'https://firebasestorage.googleapis.com/v0/b/shopingkitchen.appspot.com/o/nuggets%2Foriginalnuggetsthumb.png?alt=media&token=aff0ecb8-34f8-4cd0-925b-fb56697f6d38',
          name: 'Original Nuggets',
          price: 8.99,
          quantity: 0,
          id:'p27'
        }
     ]
      // any async code you want!
     // imageUrl=imageUrl ?imageUrl: 'https://www.itl.cat/pngfile/big/4-49067_we-are-sharing-the-entire-collection-through-google.jpg'
      const response =  fetch('https://shopingkitchen.firebaseio.com/cateegory.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CategoryName:'Nuggets',
          img:'https://firebasestorage.googleapis.com/v0/b/shopingkitchen.appspot.com/o/nuggets%2Foriginalnuggetsthumb.png?alt=media&token=aff0ecb8-34f8-4cd0-925b-fb56697f6d38',
          CatData:arraydata
        })
      });
  
      const resData =  response;
     // console.log(resData);
  
      
    
}*/
 // keyExtractor = (item) => item.id.toString();

 const checkout_cart=()=>{

  AsyncStorage.getItem('UserId').then((value)=>{
    setUserId(value);
  dispatch(CartAction.AddToFireBase(value,cartItems,total.toFixed(2)))
  navigation.navigate('Checkout',{checkoutPrice:total})

  });


 }

  const renderProductItem = ({item}) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={navigateTo('Product',item)}
      onPressRemove={()=>console.log('test')}
      onPressAdd={()=>console.log('test')}
      imageUri={item.imageUri}
      title={item.name}
      description={item.name}
      sum={item.sum}
      showButton={false}
      rating={'4'}
      price={item.price}
      quantity={item.quantity}
      swipeoutOnPressRemove={swipeoutOnPressRemove(item)}
    />
  );


 // render() {
   // const {total, products} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Cart</Heading6>
          {cartItems.length > 0 && (
            <View style={styles.inline}>
              <Subtitle1 style={styles.subTotalText}> Subtotal: </Subtitle1>
              <Heading6 style={styles.subTotalPriceText}>
                {`$ ${parseFloat(Math.round(total * 100) / 100).toFixed(2)}`}
              </Heading6>
            </View>
          )}
        </View>
{/*<Button title="sendData" onPress={sendData}/>*/}
        {cartItems.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Your Cart is Empty"
            message="Looks like you haven't added anything to your cart yet"
          />
        ) : (
          <Fragment>
            <View style={styles.flex1}>
              <FlatList
                data={cartItems}
                keyExtractor={item=>item.id}
                renderItem={renderProductItem}
                contentContainerStyle={styles.productList}
              />
            </View>

            <Divider/>

            <View>
              <View style={styles.bottomButtonContainer}>
                <Button
                  onPress={checkout_cart}
                  title="Checkout"
                />
              </View>
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    );
  
}
export default CartA;