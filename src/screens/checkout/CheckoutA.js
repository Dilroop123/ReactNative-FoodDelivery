/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, useState,useEffect} from 'react';
//import MapView, {Marker,Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapView ,{Marker} from 'react-native-maps';
//import  MapView  from 'expo';
import {
  I18nManager,
  Platform,
  SafeAreaView,Modal,
  StatusBar,
  Text,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as UserActions from '../../store/Actions/userAction';
import Swiper from 'react-native-swiper';
import { useSelector,useDispatch } from 'react-redux';
// import components
import { AsyncStorage } from 'react-native';
import * as cartAction from '../../store/Actions/cartAction';
import Button from '../../components/buttons/Button';
import CreditCard from '../../components/creditcard/CreditCard';
import InfoModal from '../../components/modals/InfoModal';
import LinkButton from '../../components/buttons/LinkButton';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { Input } from 'react-native-elements';
import * as orderAction from '../../store/Actions/ordersAction';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import { set } from 'react-native-reanimated';
import RNSettings from 'react-native-settings';
// CheckoutA Config
const isRTL = I18nManager.isRTL;
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;
const CHECKMARK_ICON =
  Platform.OS === 'ios'
    ? 'ios-checkmark-circle-outline'
    : 'md-checkmark-circle-outline';

// CheckoutA Styles
// CheckoutA
const CheckoutA=({navigation,route})=>{
  Geocoder.init("AIzaSyAugK5qRO81UHNZU1xGhVc4-owSFPyvA9E",{language : "en"});
  let del_address;
  const {checkoutPrice}=route.params;
  const[showModal,setShowModal]=useState(false);
  const[locationString,SetLocationFrom]=useState();
  const[status,setStatus]=useState('Pending');
  const TotalDelivery = useSelector(state => state.users.userSettingData);
  console.log(TotalDelivery);

  const dispatch=useDispatch();
  const[currentID,SetCurrentId]=useState();

  useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

          AsyncStorage.getItem('UserId').then((value)=>{
            SetCurrentId(value);
            dispatch(UserActions.fetchUserForSettingPage(value));

          });
          });
          
      }, [dispatch,TotalDelivery]);
    
  const[activeIndex,setActiveIndex]=useState(0);
  const[address,setAddress]=useState();
  const[city,setCity]=useState();
  const[zip,setZip]=useState();
  const[addressFocused,setAddressFocused]=useState();
  const[cityFocused,setCityFocused]=useState();
  const[zipFocused,setZipFocused]=useState();
  const[infoModalVisible,setInfoModalVisible]=useState();
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

let swiper;
  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;
  const LATITUDE = 37.8025259;
  const LONGITUDE = -122.4351431;
  
  
  const[latitude,setLatitude]=useState(LATITUDE);
  const[longitude,setLongitude]=useState(LONGITUDE);
//  const[routeCordinates,SetrouteCordinate]=useState([]);
  
const mapdata={latitude,
  longitude: longitude,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA}

const markerLatLng ={
  latitude: latitude,
  longitude: longitude,
}


  /*if(TotalDelivery.length>0 && TotalDelivery.length!=null){
    //console.log(UsersData);
  for(const key in TotalDelivery)
  {
  if(TotalDelivery[key].active==true){
   del_address=TotalDelivery[key];
//console.log("===============================================");
    //console.log(del_address);
  }
  }
  }*/



  if(TotalDelivery.length>0 && TotalDelivery.length!=null && TotalDelivery!=null){
 
  for(const key in TotalDelivery[0].deliveryAdress)
  {
  if(TotalDelivery[0].deliveryAdress[key].Address.active==true){
    del_address=TotalDelivery[0].deliveryAdress[key].Address;
 
  }
  }
  }


let cartItems=[];
  
  if(TotalDelivery.length>0 && TotalDelivery.length!=null && TotalDelivery!=null){
           console.log(TotalDelivery[0].cart);
    for(const key in TotalDelivery[0].cart.cartValues)
    {
    console.log('gdg');
      
      cartItems.push({
        name:   TotalDelivery[0].cart.cartValues[key].name,
        price: TotalDelivery[0].cart.cartValues[key].sum,
        Quantity: TotalDelivery[0].cart.cartValues[key].quantity,
      })

    }
    console.log(cartItems);
    }
    


  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
     // console.log(location);
     setLatitude(location.coords.latitude);
     setLongitude(location.coords.longitude);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });


      Geocoder.from(location.coords.latitude,location.coords.longitude)
      .then(json => {
       const stringaddress = json.results[0].formatted_address;
                  SetLocationFrom(stringaddress);
         // console.log(addressComponent);
      })
      .catch(error => console.warn(error))


    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };


if(del_address){

  if(pickedLocation==undefined){
  getLocationHandler();
  }
  let pre_address=del_address.number+" "+del_address.street+" "+del_address.district

  if(address==null || address=="" || address==undefined){
  setAddress(pre_address);
  setCity(del_address.city);
  setZip(del_address.zip);
  }
}


  const navigateTo = (screen) => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const convertGeotoString=(data)=>{
    Geocoder.from(data.latitude,data.longitude)
    .then(json => {
     const stringaddress = json.results[0].formatted_address;
                SetLocationFrom(stringaddress);
       // console.log(addressComponent);
    })
  };

  const goBack = () => {
    //const {navigation} = this.props;
    navigation.goBack();
  };

  const clearInputs = () => {
address.clear();
  city.clear();
   zip.clear();
    //setAddress('');
    //setCity('');
    //setZip('');
  
  };

  const addressChange = (text) => {
    /*this.setState({
      address: text,
    });*/
    setAddress(text);
  };

  const addressFocus = () => {
    /*this.setState({
      addressFocused: true,
      cityFocused: false,
      zipFocused: false,
    });*/
    setAddressFocused(true);
    setCityFocused(false);
    setZipFocused(false);
  };

  const cityChange = (text) => {
    /*this.setState({
      city: text,
    });*/
    setCity(text);
  };

  const cityFocus = () => {
    /*this.setState({
      addressFocused: false,
      cityFocused: true,
      zipFocused: false,
    });*/
    setAddressFocused(false);
    setCityFocused(true);
    setZipFocused(false);
  };

  const zipChange = (text) => {
    /*this.setState({
      zip: text,
    });*/
    setZip(text);
  };

  const zipFocus = () => {
    /*this.setState({
      addressFocused: false,
      cityFocused: false,
      zipFocused: true,
    });*/
    setAddressFocused(false);
    setCityFocused(false);
    setZipFocused(true);
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  const onIndexChanged = (index) => {
    let activeIndex;
    if (isRTL) {
      activeIndex = 2 - index; // 2 = 3 steps - 1
    } else {
      activeIndex = index;
    }
    /*this.setState({
      activeIndex: activeIndex,
    });*/
    setActiveIndex(activeIndex);
  };

  const nextStep = () => {
    swiper.scrollBy(1, true);
  };

  const previousStep = () => {
  swiper.scrollBy(-1, true);
  };

  const showInfoModal = (value) => () => {
   /* this.setState({
      infoModalVisible: value,
    });*/
    setInfoModalVisible(value);
  };



const placeorder=()=>{

  setShowModal(true);
}
/*{
  orderNumber: '11',
  orderDate: '22 July, 2019',
  orderStatus: 'on-the-way',
  orderItems: [
    {
      name: 'Pizza',
      price: 4.99,
    },
    {
      name: 'Grill',
      price: 8.99,
    },
    {
      name: 'Pasta',
      price: 5.99,
    },
  ],
}*/
const handleResponse = data => {
  console.log(data);
  if (data.title === 'Error') {
    var orderdate= new Date().toJSON().slice(0,10);
    
    dispatch(orderAction.AddOrder(currentID,orderdate,cartItems,locationString))
    dispatch(cartAction.emptyCart())
      setShowModal(false);
      navigation.navigate('Home');
      setStatus("Complete");
  } else if (data.title === "cancel") {
      //this.setState({ showModal: false, status: "Cancelled" });
      setShowModal(false);
      setStatus("Cancelled");
  } else {
      return;
  }
};

  const closeInfoModal = (value) => () => {
    /*this.setState(
      {
        infoModalVisible: value,
      },
      () => {
        this.goBack();
      },
    );*/
    setInfoModalVisible(value);
    goBack();
  };

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.stepIndicator}>
              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 0 && styles.activeStepText,
                  ]}>
                  Delivery
                </Caption>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 0 && styles.activeStepText,
                  ]}>
                  address
                </Caption>
              </View>

              <View
                style={[styles.line, activeIndex > 0 && styles.activeLine]}
              />

              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 1 && styles.activeStepText,
                  ]}>
                  Place
                </Caption>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 1 && styles.activeStepText,
                  ]}>
                  order
                </Caption>
              </View>
       {/*
              <View
                style={[styles.line, activeIndex > 1 && styles.activeLine]}
              />

              <View style={styles.stepContainer}>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 2 && styles.activeStepText,
                  ]}>
                  Place
                </Caption>
                <Caption
                  style={[
                    styles.stepText,
                    activeIndex === 2 && styles.activeStepText,
                  ]}>
                  order
                </Caption>
                </View>*/}
            </View>
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={styles.swiperContainer}>
            <Swiper
              ref={(r) => {
                swiper = r;
              }}
              index={isRTL ? 2 : 0}
              onIndexChanged={onIndexChanged}
              loop={false}
              showsPagination={false}
              // scrollEnabled={false}
            >
              {/* STEP 1 */}
              <View style={styles.formContainer}>
                
                <View style={styles.form}>
                <MapView
                style={{height:'100%',width:'100%'}}
                loadingEnabled={true}
     region={mapdata} >
    <Marker draggable onDragEnd={e => {
              console.log('dragEnd', e.nativeEvent.coordinate);
              convertGeotoString(e.nativeEvent.coordinate);
            }} coordinate={markerLatLng} />
    </MapView>
                  
                  {/*}
                {del_address ?
                <View>
                  <Subtitle2 style={styles.overline}>Address</Subtitle2>
                  
<Input placeholder='BASIC INPUT' editable={false} value={address} style={styles.inputContainerStyle} />
                  <Subtitle2 style={styles.overline}>City</Subtitle2>
                
<Input placeholder='BASIC INPUT' value={city} editable={false} style={styles.inputContainerStyle} />
                  <Subtitle2 style={styles.overline}>ZIP Code</Subtitle2>
                 
<Input placeholder='BASIC INPUT' value={zip}  editable={false} style={styles.inputContainerStyle} />
</View>
                :<View style={{alignItems:'center'}}><Text style={{fontWeight:'bold'}}>Please Add Address.....</Text></View>}
                  <View>
                    <View style={{height:25}}/>
                    <LinkButton
                      onPress={()=>navigation.navigate('DeliveryAddress')}
                      title="Add Address"
                      titleStyle={styles.actionButton}
                    />
                  </View>
                  */}
                </View>
                
              </View>

              {/* STEP 2 */}
              {/*
              <View>
               
              <CreditCard
                  colors={['#784BA0', '#2B86C5']}
                  brand="visa"
                  last4Digits="3456"
                  cardHolder="Kristin Evans"
                  expiry="09 / 21"
                />

                <View>
                  <LinkButton
                    onPress={this.navigateTo('PaymentMethod')}
                    title="Edit details"
                    titleStyle={styles.actionButton}
                  />
                </View>
              </View>*/}

              <View style={styles.form}>
                <Subtitle2 style={styles.overline}>Delivery Address</Subtitle2>
                <Subtitle1
                  style={
                    styles.orderInfo
                  }>{locationString}</Subtitle1>

                {/*  <Subtitle2 style={[styles.overline, styles.pt16]}>
                  Payment Method
                </Subtitle2>
                <Subtitle1 style={styles.orderInfo}>
                  XXXX XXXX XXXX 3456
                </Subtitle1>*/}

                <Subtitle2 style={[styles.overline, styles.pt16]}>
                  Your Order
                </Subtitle2>
                <View style={styles.row}>
                  <Subtitle1 style={styles.orderInfo}>Total amount</Subtitle1>
                  <Subtitle1 style={styles.amount}>  {`$ ${parseFloat(Math.round(checkoutPrice * 100) / 100).toFixed(2)}`}
                 </Subtitle1>
                </View>
             
                    <Modal
                    visible={showModal}
                    onRequestClose={() =>setShowModal( false)}
                >
                    <WebView
                        source={{ uri: "https://react-shoping.web.app/?tagId="+currentID}}
                        onNavigationStateChange={data =>
                          handleResponse(data)
                      }
                  
                    />
                </Modal>
                <Text>Payment Status: {status}</Text>
              </View>
            </Swiper>

            <View style={styles.buttonContainer}>
              {activeIndex == 0 && (
                <Button
                  onPress={isRTL ? previousStep : nextStep}
                  title="Next"
                />
              )}

              {activeIndex === 1 && (
                <Button
                  onPress={placeorder}
                  title="Place Order"
                />
              )}

              {activeIndex === 0 && (
                <View style={styles.linkButtonContainer}>
                  <LinkButton
                    onPress={goBack}
                    title="Cancel"
                    titleStyle={styles.linkButton}
                  />
                </View>
              )}

              {activeIndex > 0 && (
                <View style={styles.linkButtonContainer}>
                  <LinkButton
                    onPress={isRTL ? nextStep : previousStep}
                    title="Back"
                    titleStyle={styles.linkButton}
                  />
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>

          <InfoModal
            iconName={CHECKMARK_ICON}
            iconColor={Colors.primaryColor}
            title={'Success!'.toUpperCase()}
            message="Order placed successfully. For more details check your orders."
            buttonTitle="Back to shopping"
            onButtonPress={closeInfoModal(false)}
            onRequestClose={closeInfoModal(false)}
            visible={infoModalVisible}
          />
        </View>
      </SafeAreaView>
    );
  }
export default CheckoutA;
const styles = StyleSheet.create({
  pt16: {paddingTop: 16},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: Colors.background,
    elevation: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#a7a7aa',
      },
    }),
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  stepContainer: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: '700',
    color: Color(Colors.black).alpha(0.56),
  },
  activeStepText: {
    color: Colors.primaryColor,
  },
  line: {
    width: 48,
    height: 2,
    backgroundColor: Color(Colors.black).alpha(0.32),
  },
  activeLine: {
    backgroundColor: Colors.primaryColor,
  },
  swiperContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        minHeight: Layout.SCREEN_HEIGHT - 3 * 56,
      },
    }),
  },
  formContainer: {
    flex: 1,
  },
  form: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 18,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  actionButton: {
    color: Colors.accentColor,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
  linkButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  linkButton: {
    color: Colors.black,
  },
  orderInfo: {
    paddingVertical: 8,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
  },
});

