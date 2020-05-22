/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {useCallback,useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { AsyncStorage } from 'react-native';
import { Ionicons as Ionicon } from "@expo/vector-icons";
// import components
import Icon from '../../components/icon/Icon';
import {Caption, Subtitle1, Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import { useSelector,useDispatch } from 'react-redux';
// import colors
import Colors from '../../theme/colors';
import * as UserActions from '../../store/Actions/userAction';
import Button from '../../components/buttons/Button';
// DeliveryAddressA Config
const IOS = Platform.OS === 'ios';
const RADIO_OFF_ICON = IOS ? 'ios-radio-button-off' : 'md-radio-button-off';
const RADIO_ON_ICON = IOS ? 'ios-radio-button-on' : 'md-radio-button-on';
const EDIT_ICON = IOS ? 'ios-more' : 'md-more';
const FAB_ICON = IOS ? 'ios-add' : 'md-add';
const HOME_ICON = IOS ? 'ios-home' : 'md-home';
const LOCATION_ICON = IOS ? 'ios-pin' : 'md-pin';

// DeliveryAddressA Styles

// DeliveryAddressA Props
type Props = {
  onPress: () => {},
  onPressEdit: () => {},
  type: string,
  street: string,
  district: string,
  city: string,
  zip: string,
  number: string,
  active: boolean,
};

// DeliveryAddressA Components
const Address = ({
  onPress,
  onPressEdit,
  type,
  street,
  district,
  city,
  zip,
  number,
  active,
}: Props) => (
  <TouchableItem onPress={onPress} useForeground>
    <View style={styles.addressCard}>
      <View style={styles.leftAddresContainer}>
        <View style={styles.radioIconContainer}>
          {active ? (
            <Icon
              name={RADIO_ON_ICON}
              size={21}
              color={Colors.secondaryColor}
            />
          ) : (
            <Icon
              name={RADIO_OFF_ICON}
              size={21}
              color={Colors.secondaryColor}
            />
          )}
        </View>

        <View style={styles.addressInfo}>
          {type !== '' && (
            <Caption style={styles.caption}>
              {`${type.toUpperCase()} ADDRESS`}
            </Caption>
          )}
          <Subtitle1 style={styles.addressText}>
            {`${number} ${street}, ${district}`}
          </Subtitle1>
          <Subtitle2 style={styles.addressText}>{`${city} ${zip}`}</Subtitle2>
        </View>
      </View>

      <View style={{height: 50}}>
        <TouchableItem onPress={onPressEdit} borderless>
          <View style={styles.editIconContainer}>
            <Icon name={EDIT_ICON} size={24} color={Colors.black} />
          </View>
        </TouchableItem>
      </View>
    </View>
  </TouchableItem>
);

// DeliveryAddressA
const DeliveryAddressA=({navigation,route})=>{
  //const {userdata}=route.params;
  //console.log(userdata[0])
  const[addresses,SetAddress]=useState();
  const TotalDelivery = useSelector(state => state.users.deliverydata);
 console.log(TotalDelivery);
  const dispatch=useDispatch();
  const[currentID,SetCurrentId]=useState();

  useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

          AsyncStorage.getItem('UserId').then((value)=>{
            SetCurrentId(value);
            dispatch(UserActions.fetchUserDelivery(value));

          });
          });
          
      }, [dispatch,TotalDelivery,addresses]);


if(TotalDelivery.length>0 && (addresses==null||addresses==undefined||addresses=='')){
  SetAddress(TotalDelivery);
  //console.log(TotalDelivery);
}
const saveSelectedDelivery =()=> {
  for(let i=0;i<addresses.length;i++){
  dispatch(UserActions.updateDeliveryStatus(addresses[i].active,currentID,addresses[i].id));
}
navigation.pop();
}

  const goBack = () => {
    //const {navigation} = this.props;
    navigation.goBack();
  };

const navigateTo = (screen) => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const setDeliveryAddress = (item) => () => {
    //const {addresses} = this.state;
    const index = addresses.indexOf(item);
    const activeIndex = addresses.findIndex((e) => e.active === true);
         // console.log(activeIndex);
          if(activeIndex==-1){
            addresses[index].active = true;
            SetAddress([...addresses]);
          }
    else if (activeIndex !== index && activeIndex>-1) {
      addresses[activeIndex].active = false;
      addresses[index].active = true;

      /*this.setState({
        addresses: [...addresses],
      });*/
      SetAddress([...addresses]);
    }
   // console.log(addresses);
  };

  const keyExtractor = (item, index) => index.toString();

  const renderAddressItem = ({item}) => (
    <Address
      key={item.id}
      onPress={setDeliveryAddress(item)}
      onPressEdit={navigateTo('EditAddress')}
      type={item.type}
      street={item.street}
      district={item.district}
      city={item.city}
      zip={item.zip}
      number={item.number}
      active={item.active}
    />
  );

  const handleFabPress = () => {
    // alert('FAB Pressed');
  };

  const renderFAB_ICON = () => (
    <Icon name={FAB_ICON} size={24} color={Colors.onAccentColor} />
  );

  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />
        <Button title="Save" onPress={saveSelectedDelivery}/>
        <View style={styles.container}>
          <FlatList
            data={addresses}
            keyExtractor={item=>item.id}
            renderItem={renderAddressItem}
            contentContainerStyle={styles.addressList}
          />

          <ActionButton
            buttonColor={Colors.accentColor}
            onPress={handleFabPress}
            offsetX={20}
            offsetY={20}
            renderIcon={renderFAB_ICON}
            bgColor="rgba(255, 255, 255, 0.56)"
            hideShadow
            fixNativeFeedbackRadius>
            <ActionButton.Item
              buttonColor={Colors.primaryColor}
              textContainerStyle={{
                backgroundColor: 'rgba(35, 47, 52, 0.1)',
              }}
              title="Add new address"
              onPress={()=>navigation.navigate('AddAddress',{userDta:currentID})}>
              <Icon name={HOME_ICON} size={22} color={Colors.onPrimaryColor} />
            </ActionButton.Item>
            
          </ActionButton>
        </View>
      </SafeAreaView>
    );
  }
export default DeliveryAddressA;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  addressList: {
    paddingVertical: 8,
  },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
  },
  leftAddresContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addressInfo: {
    flex: 1,
    marginRight: 6,
  },
  caption: {
    paddingVertical: 2,
    color: Colors.accentColor,
    textAlign: 'left',
  },
  radioIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 24,
    height: 24,
  },
  addressText: {
    paddingVertical: 4,
    textAlign: 'left',
  },
  editIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
});
