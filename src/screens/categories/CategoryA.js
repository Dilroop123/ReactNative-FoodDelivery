/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component,useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
// import components
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';

// import colors
import Colors from '../../theme/colors';

// CategoryA Config

// CategoryA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productList: {
    // spacing = padding + ActionProductCardHorizontal margin = 12 + 4 = 16
    padding: 12,
  },
});

const CategoryA=({navigation,route})=>{

  
  const[products,setProducts]=useState();
  const {title_name}=route.params;
  const {catData}=route.params;
  console.log(catData);

  const transformedCartItems = [];
  for (const key in catData) {
    transformedCartItems.push({
      id: key,
      name: catData[key].name,
      imageUri:catData[key].imageUri,
      price:catData[key].price,
      quantity:catData[key].quantity
    });
  }


  const navigateTo =(screen,itemData) => {
    //const {navigation} = this.props;
    navigation.navigate(screen,{itemValues:itemData});
  };

   
 // keyExtractor = (item, index) => index.toString();

  const renderProductItem = ({item, index}) => (
    <ActionProductCardHorizontal
      onPress={()=>navigateTo('Product',item)}
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      showButton={false}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  
   // const {products} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <FlatList
          data={transformedCartItems}
          keyExtractor={item=>item.id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
        />
      </SafeAreaView>
    );
}
    export default CategoryA;
  

