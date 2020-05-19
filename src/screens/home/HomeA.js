/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {useEffect,useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import ActionProductCard from '../../components/cards/ActionProductCard';
import ActionProductCardHorizontal from '../../components/cards/ActionProductCardHorizontal';
import LinkButton from '../../components/buttons/LinkButton';
import {Heading6} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import { useSelector,useDispatch } from 'react-redux';
import * as  foodDataActions from '../../store/Actions/foodDataAction';
// import colors
import Colors from '../../theme/colors';

// HomeA Config
const imgHolder = require('../../assets/img/imgholder.png');

// HomeA Styles

const HomeA=({route,navigation})=>{
  const TotalFoodItems = useSelector(state => state.foodItem.availableProducts)
  const popularItems=useSelector(state =>state.foodItem.popularItems)
  //console.log(TotalFoodItems);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        dispatch(foodDataActions.fetchProducts())
        dispatch(foodDataActions.fetchPopularProducts())
      });

      
  }, [dispatch]);

     /* const categories= [
        {
          key: 1,
          imageUri: require('../../assets/img/pretzels/new/JalapenoPretzel.png'),
          name: 'Pretzels',
        },
        {
          key: 2,
          imageUri: require('../../assets/img/drinks/new/LemonadeMixerBlueRaspberry.png'),
          name: 'Drinks',
        },
        {
          key: 3,
          imageUri: require('../../assets/img/pretzels/CheeseDip.jpg'),
          name: 'Dips & Sauces',
        },
        {
          key: 4,
          imageUri: require('../../assets/img/nuggets/originalnuggetsthumb.png'),
          name: 'Nuggets',
        },
        {
          key: 5,
          imageUri: require('../../assets/img/pretzels/CheeseDip.jpg'),
          name: 'Pretzel Dogs',
        },
        {
          key: 6,
          imageUri: require('../../assets/img/pretzelStix/AlmondStix.png'),
          name: 'Pretzel Stix',
        }
        
      ];*/
      const products= [
        {
          imageUri: require('../../assets/img/pizza_4.png'),
          name: 'Pizza Carbonara 35cm',
          price: 10.99,
          label: 'new',
        },
        {
          imageUri: require('../../assets/img/sandwich_1.png'),
          name: 'Breakfast toast sandwich',
          price: 4.99,
        },
        {
          imageUri: require('../../assets/img/cake_3.png'),
          name: 'Cake Cherries Pie',
          price: 8.49,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/soup_2.png'),
          name: 'Broccoli Soup',
          price: 6.49,
          discountPercentage: 10,
        },
      ]
      const popularProducts= [
        {
          imageUri: require('../../assets/img/sandwich_2.jpg'),
          name: 'Subway sandwich',
          price: 8.49,
          quantity: 0,
          discountPercentage: 10,
        },
        {
          imageUri: require('../../assets/img/pizza_1.jpg'),
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity: 0,
        },
        {
          imageUri: require('../../assets/img/cake_1.jpg'),
          name: 'Chocolate cake',
          price: 4.99,
          quantity: 0,
        },
      ];
    

  const navigateTo = (screen,title,itemData) =>  {
    //const {navigation} = this.props;
    navigation.navigate(screen,{title_name:title,catData:itemData});
  };


 const keyExtractor = (item, index) => index.toString();

  const renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={{uri:item.image}}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={()=>navigateTo('Category',item.name,item.catData)}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  const renderProductItem = ({item, index}) => (
    <ActionProductCard
      onPress={()=>navigateTo('Product')}
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  const  renderPopularProductItem = ({item, index}) => (
    <ActionProductCardHorizontal
      onPress={()=>navigation.navigate('Product',{itemValues:item})}
      onPressRemove={()=>console.log('test')}
      onPressAdd={()=>console.log('test')}
      swipeoutDisabled
      key={index}
      imageUri={item.imageUri}
      title={item.name}
      description={item.description}
      rating={item.rating}
      price={item.price}
      quantity={item.quantity}
      discountPercentage={item.discountPercentage}
      label={item.label}
    />
  );

  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <Heading6 style={styles.titleText}>Categories</Heading6>
                <LinkButton
                  title="View all"
                  titleStyle={styles.viewAllText}
                  onPress={()=>navigateTo('Categories')}
                />
              </View>

              <FlatList
                data={TotalFoodItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal={false}
                keyExtractor={item=>item.id}
                renderItem={renderCategoryItem}
                contentContainerStyle={styles.categoriesList}
              />
            </View>

            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Special Offers</Heading6>
            </View>

            <FlatList
              data={products}
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              keyExtractor={keyExtractor}
              renderItem={renderProductItem}
              contentContainerStyle={styles.productsList}
            />

            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Popular</Heading6>
              <LinkButton
                title="View all"
                titleStyle={styles.viewAllText}
                onPress={()=>navigateTo('SearchResults')}
              />
            </View>

            <FlatList
              data={popularItems}
              keyExtractor={keyExtractor}
              renderItem={renderPopularProductItem}
              contentContainerStyle={styles.popularProductsList}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  export default HomeA;

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
    },
    categoriesContainer: {
      paddingBottom: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    titleText: {
      fontWeight: '700',
      color:'#edac1a'
    },
    viewAllText: {
      color: Colors.primaryColor,
    },
    categoriesList: {
      paddingTop: 4,
      paddingRight: 16,
      paddingLeft: 8,
    },
    cardImg: {borderRadius: 4},
    card: {
      marginLeft: 8,
      width: 120,
      height: 100,
      resizeMode: 'cover',
    },
    cardOverlay: {
      flex: 1,
      borderRadius: 4,
      backgroundColor: Color(Colors.overlayColor).alpha(0.2),
      overflow: 'hidden',
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    cardTitle: {
      padding: 12,
      fontWeight: '500',
      fontSize: 16,
      color: Colors.white,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    productsList: {
      paddingBottom: 16,
      // spacing = paddingHorizontal + ActionProductCard margin = 12 + 4 = 16
      paddingHorizontal: 12,
    },
    popularProductsList: {
      // spacing = paddingHorizontal + ActionProductCardHorizontal margin = 12 + 4 = 16
      paddingHorizontal: 12,
      paddingBottom: 16,
    },
  });
  