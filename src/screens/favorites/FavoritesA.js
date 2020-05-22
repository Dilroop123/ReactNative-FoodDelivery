/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import remove from 'lodash/remove';

// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import EmptyState from '../../components/emptystate/EmptyState';
import {Heading6, SmallText} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';
import {useSelector,useDispatch} from 'react-redux';
import Button from '../../components/buttons/Button';
// FavoritesA Config
const isRTL = I18nManager.isRTL;
const EMPTY_STATE_ICON = 'star-outline';

// FavoritesA Styles
// FavoritesA
const FavoritesA=()=>{
    
    const TotalFoodItems = useSelector(state => state.foodItem.favoriteMeals)
    
    console.log(TotalFoodItems);
    const products=[
        {
          id: 'product1',
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          id: 'product2',
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          quantity: 0,
          price: 10.99,
        },
        {
          id: 'product3',
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          quantity: 0,
          price: 4.99,
        },
      ]

  const navigateTo = (screen) => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const swipeoutOnPressRemove = (item) => () => {
    //let {products} = this.state;
    const index = products.indexOf(item);

    products = remove(products, (n) => products.indexOf(n) !== index);

    /*this.setState({
      products,
    });*/
  };

const sendDFata=()=>{
  const addressData=
  { 
  "imageUri" : "https://firebasestorage.googleapis.com/v0/b/inventorycontrol-7587a.appspot.com/o/Herbs%2Fbasil.png?alt=media&token=45cc0344-7ac4-4acb-ab52-db40e425540c",
  "name" : "Basil",
  "price" : 10,
  "quantity" : 1
  
  };
  
  const response =  fetch('https://inventorycontrol-7587a.firebaseio.com/Category/-M7EnUQY2kt1CP-1cGxX/CatData.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "imageUri" : "https://firebasestorage.googleapis.com/v0/b/inventorycontrol-7587a.appspot.com/o/Grains%2Frice.jpg?alt=media&token=ef0a8b8a-afdc-482c-97b0-9a34f5670b78",
  "name" : "Pasta",
  "price" : 10,
  "quantity" : 1
      
    })
  });

 // const resData =  response.json();
}
  

  const renderProductItem = ({item}) => (
    <ActionProductCardHorizontal
      key={item.id}
      onPress={()=>navigateTo('Product')}
      imageUri={item.images[0]}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
      swipeoutDisabled={false}
      swipeoutOnPressRemove={swipeoutOnPressRemove(item)}
    />
  );

  

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Favorites</Heading6>
        </View>
      {/*<Button title='sendData' onPress={sendDFata}/>*/}
        {products.length === 0 ? (
          <EmptyState
            showIcon
            iconName={EMPTY_STATE_ICON}
            title="Your Favorites List is Empty"
            message="Save your favorite food so you can always find it here and make order easier"
          />
        ) : (
          <Fragment>
            <FlatList
              data={TotalFoodItems}
              keyExtractor={item=>item.id}
              renderItem={renderProductItem}
              contentContainerStyle={styles.productList}
            />

            <View style={styles.bottomTextInfo}>
              <View style={styles.info}>
                <SmallText>
                  {`Swipe ${isRTL ? 'right' : 'left'} to remove items`}
                </SmallText>
              </View>
            </View>
          </Fragment>
        )}
      </SafeAreaView>
    );
  }
export default FavoritesA;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 24,
    fontWeight: '700',
    textAlign: 'left',
  },
  productList: {
    // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
    paddingHorizontal: 12,
  },
  bottomTextInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
  },
});

