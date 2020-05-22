/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  I18nManager,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Color from 'color';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from '../../components/TouchableItem';
import {Heading6} from '../../components/text/CustomText';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['name', 'price'];
// import colors
import Colors from '../../theme/colors';
import { useSelector,useDispatch } from 'react-redux';
// SearchA Config
const isRTL = I18nManager.isRTL;
const SEARCH_ICON = 'magnify';
const imgHolder = require('../../assets/img/imgholder.png');

// SearchA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  titleText: {
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: '700',
    textAlign: 'left',
  },
  inputContainer: {
    marginHorizontal: 16,
    paddingBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.16)',
    paddingLeft: 8,
    paddingRight: 51,
    height: 46,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: isRTL ? 'right' : 'left',
  },
  searchButtonContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
  },
  categoriesList: {
    paddingBottom: 10,
  },
  cardImg: {borderRadius: 4},
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
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
    padding: 16,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

// SearchA
const SearchA=({navigation,route})=>{
  const TotalFoodItems = useSelector(state => state.foodItem.availableProducts);

//console.log(TotalFoodItems[0]);
  let transformedCartItems = [];
            if(TotalFoodItems.length>0){
    for (const key in TotalFoodItems) {
   //   console.log(TotalFoodItems[key].name)
      for(const index in TotalFoodItems[key].catData){
        transformedCartItems.push(TotalFoodItems[key].catData[index]);
        
            
      }
      
    }
  }
//console.log(transformedCartItems);
    
    const[filteredEmails,setFilterEmails] =useState('');

    /*useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
    //      dispatch(foodDataActions.fetchProducts())
    
  },[filteredEmails]);*/
    
  useEffect(() => {
    
  }, [filteredEmails]);

  const navigateToItemDetail = (screen,itemData) =>{
    //const {navigation} = this.props;
    
    navigation.navigate(screen,{itemValues:itemData});
  };       
    

  const navigateTo = (screen,title,itemData) =>{
    //const {navigation} = this.props;
               
    navigation.navigate(screen,{title_name:title,catData:itemData});
  };      

  const keyExtractor = (item, index) => index.toString();

  const renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.imageUri)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={()=>navigateToItemDetail('Product',item)}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );



  const renderCategoryItemCustom = ({item, index}) => (
    <ImageBackground
      key={index}
      defaultSource={imgHolder}
      source={getImgSource(item.image)}
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


  const searchUpdated=(term)=> {
    //this.setState({ searchTerm: term })
    //SetSearchTerm(term)
    const searchResult = transformedCartItems.filter(createFilter(term, KEYS_TO_FILTERS));  
    setFilterEmails(searchResult);
    if(term==''||term==undefined||term==null){
      setFilterEmails('');
    }
  }

  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.titleContainer}>
          <Heading6 style={styles.titleText}>Search</Heading6>
        </View>

        <View style={styles.inputContainer}>
        <SearchInput 
          onChangeText={(term) => {searchUpdated(term) }} 
          style={styles.textInput}
          placeholder="Food Name..."
          />
        
         {/* <View style={styles.searchButtonContainer}>
            <TouchableItem
              onPress={this.navigateTo('SearchResults')}
              // borderless
            >
              <View style={styles.searchButton}>
                <Icon
                  name={SEARCH_ICON}
                  size={23}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>
    </View>*/}
        </View>

        <View style={styles.container}>
          {filteredEmails?
          <FlatList 
            data={filteredEmails}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.categoriesList}
          />:
          <FlatList 
            data={TotalFoodItems}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            renderItem={renderCategoryItemCustom}
            contentContainerStyle={styles.categoriesList}
          />}
        </View>
      </SafeAreaView>
    );
  }
export default SearchA;
