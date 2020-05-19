/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';
import {useSelector,useDispatch} from 'react-redux';
// import components
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cardImg: {borderRadius: 4},
  card: {
    marginVertical: 6,
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
    borderRadius: 4,
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

const CategoriesA=({navigation,route})=>{
  
  const TotalFoodItems = useSelector(state => state.foodItem.availableProducts)
    
    
    
  const goBack = () => {
    //const {navigation} = this.props;
    navigation.pop();
  };

  const navigateTo = (screen,title,itemData) =>{
    //const {navigation} = this.props;
    navigation.navigate(screen,{title_name:title,catData:itemData});
  };              

  const keyExtractor = (item, index) => index.toString();

  const renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
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

  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={TotalFoodItems}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={keyExtractor}
            renderItem={renderCategoryItem}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </SafeAreaView>
    );
    }
    export default CategoriesA;
