/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component,useEffect,useCallback,useState} from 'react';
import {
  I18nManager,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Button from '../../components/buttons/Button';
import {Caption, Heading5, SmallText} from '../../components/text/CustomText';
import Icon from '../../components/icon/Icon';
import SizePicker from '../../components/pickers/SizePicker';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';
import { render } from 'react-dom';

// ProductA Config
const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const FAVORITE_ICON = IOS ? 'md-heart' : 'md-heart';
const CLOSE_ICON = IOS ? 'ios-close' : 'md-close';
import { useSelector,useDispatch } from 'react-redux';
const imgHolder = require('../../assets/img/imgholder.png');
import * as cartActions from '../../store/Actions/cartAction';
import * as  foodDataActions from '../../store/Actions/foodDataAction';
// ProductA Styles

// ProductA
const ProductA=({navigation,route})=>{

  const{itemValues}=route.params;
  console.log(itemValues);
  
 
    const[product,setProduct]=useState({
      images: [
        itemValues.imageUri,
        itemValues.imageUri,
        itemValues.imageUri,
        
      ],
      name: itemValues.name,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      price: itemValues.price,
      quantity: itemValues.quantity,
      servingSize: 1,
      sideDish: 20,
      total: itemValues.price,
    favorite: false,
    id:itemValues.id
  
    })
      
    const dispatch = useDispatch();
    
    React.useLayoutEffect(() => {
      setProduct(product)
    }, [product]);
  





  const goBack = () => {
    //const {navigation} = this.props;
    //console.log('back');
    navigation.pop();
  };

  const onPressAddToFavorites = () => {
    //const {favorite} = this.state;
         product.favorite=!product.favorite;
         setProduct({...product});
         dispatch(foodDataActions.toggleFavorite(product));
    /*this.setState({
      favorite: !favorite,
    });*/
   // console.log('fav');
    product.favorite=true;
  };


   const onPressIncreaseAmount =() => {
   // console.log("working");
    //console.log('incremnet');
    let {quantity} = product;
    const {servingSize} = product;

    quantity += 1;
    product.quantity = quantity;

    const total = quantity * product.price * servingSize;
    product.total = total;

   setProduct({...product});
    //console.log(product);
    
  }
  
const addToCart=()=>{
  
    dispatch(cartActions.addToCart(product));
    navigation.pop();
}
   

  const onPressDecreaseAmount = () => {
    //const {product} = this.state;
    let {quantity} = product;
    const {servingSize} = product;

    quantity -= 1;
    quantity = quantity < 1 ? 1 : quantity;
    product.quantity = quantity;

    const total = quantity * product.price * servingSize;
    product.total = total;
        
    setProduct({...product});
//console.log(product);
  };

  const setServingSize = (servingSize) => {
    //const {product} = this.state;
    
    //const {quantity} = product;

    product.servingSize = servingSize;

    const total =product.quantity * product.price * servingSize;
    product.total = total;
        // console.log(product);
    setProduct({...product});
  };

  const setSideDish = (sideDish) => {
    //const {product} = this.state;
    product.sideDish = sideDish;
    setProduct({...product});
    /*this.setState({
      product,
    });*/
  };

  
   

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <ScrollView>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              paginationStyle={styles.paginationStyle}
              activeDotStyle={styles.activeDot}
              dotStyle={styles.dot}
              index={isRTL ? product.images.length - 1 : 0}>
              {product.images.map((item, i) => (
                <Image
                  key={`image_${i}`}
                  defaultSource={imgHolder}
                  source={getImgSource(item)}
                  style={styles.slideImg}
                />
              ))}
            </Swiper>

            <View style={[styles.topButton, styles.left]}>
              <TouchableItem onPress={goBack} borderless>
                <View style={styles.buttonIconContainer}>
                  <Icon
                    name={CLOSE_ICON}
                    size={22}
                    color={Colors.gold}
                  />
                </View>
              </TouchableItem>
            </View>

            <View
              style={[
                styles.topButton,
                styles.right,
                product.favorite && styles.favorite,
              ]}>
              <TouchableItem onPress={onPressAddToFavorites} borderless>
                <View style={styles.buttonIconContainer}>
                  <Icon
                    name={FAVORITE_ICON}
                    size={22}
                    color={
                      product.favorite ? Colors.gold : Colors.secondaryText
                    }
                  />
                </View>
              </TouchableItem>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.productTitleContainer}>
              <Heading5 style={styles.productTitle}>{product.name}</Heading5>
              <Text style={styles.priceText}>{`$ ${(
                product.price * product.servingSize
              ).toFixed(2)}`}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <SmallText style={styles.shortDescription}>{product.description}</SmallText>
          </View>

          <View style={styles.pickerGroup}>
            <View style={styles.pickerContainer}>
              <Caption style={styles.caption}>SIZE</Caption>
              <SizePicker
                title="Small"
                onPress={()=>setServingSize(1)}
                picked={product.servingSize === 1}
              />
              <SizePicker
                title="Medium"
                onPress={()=>setServingSize(1.5)}
                picked={product.servingSize === 1.5}
              />
              <SizePicker
                title="Large"
                onPress={()=>setServingSize(2)}
                picked={product.servingSize === 2}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Caption style={styles.caption}>SIDE DISH</Caption>
              <SizePicker
                title="Mayonaise"
                onPress={()=>setSideDish(20)}
                picked={product.sideDish === 20}
              />
              <SizePicker
                title="Cheese"
                onPress={()=>setSideDish(30)}
                picked={product.sideDish === 30}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.amountContainer}>
          <View style={styles.amountButtonsContainer}>
            <TouchableItem onPress={onPressDecreaseAmount} borderless>
              <View style={styles.iconContainer}>
                <Icon
                  name={MINUS_ICON}
                  size={20}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>

            <Text style={styles.quantity}>{product.quantity}</Text>

            <TouchableItem onPress={onPressIncreaseAmount} borderless>
              <View style={styles.iconContainer}>
                <Icon
                  name={PLUS_ICON}
                  size={20}
                  color={Colors.onPrimaryColor}
                />
              </View>
            </TouchableItem>
          </View>
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button onPress={addToCart} title={'Add to Cart'.toUpperCase()} />
          <View style={styles.buttonPriceContainer}>
            <Text style={styles.buttonPriceText}>
              {`$ ${product.total.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  
}
export default ProductA;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  swiperContainer: {
    width: '100%',
    height: 228,
  },
  paginationStyle: {
    bottom: 12,
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  dot: {backgroundColor: Colors.background},
  activeDot: {backgroundColor: Colors.primaryColor},
  slideImg: {                                                                            
    width: '100%',
    height: 228,
    resizeMode: 'cover',
  },
  topButton: {
    position: 'absolute',
    top: 16,
    borderRadius: 18,
    backgroundColor: Colors.background,
  },
  left: {left: 16},
  right: {right: 16},
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  favorite: {
    backgroundColor: Colors.secondaryColor,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10,
  },
  productTitle: {
    fontWeight: '700',
    color:Colors.gold
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    color:Colors.gold,
  },
  shortDescription: {
    paddingBottom: 8,
    textAlign: 'left',
    color:Colors.gold
  },
  pickerGroup: {
    marginTop: 24,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  caption: {
    width: 80,
    textAlign: 'left',
    color:Colors.gold
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondaryColor,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  buttonPriceContainer: {
    position: 'absolute',
    top: 0,
    left: 40,
    height: 48,
    justifyContent: 'center',
  },
  buttonPriceText: {
    fontSize: 16,
    lineHeight: 18,
    color: Colors.onPrimaryColor,
  },
});
