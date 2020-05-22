/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import components
import ActivityIndicatorModal from '../../components/modals/ActivityIndicatorModal';
import Button from '../../components/buttons/Button';
import {Caption, Paragraph} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import * as UserAction from '../../store/Actions/userAction';
// import colors
import Colors from '../../theme/colors';
import { useSelector,useDispatch } from 'react-redux';
// AddAddressA Config
const HOME_ICON = 'home-variant-outline';
const OFFICE_ICON = 'briefcase-outline';
const APARTMAN_ICON = 'office-building';
const ICON_COLOR = 'rgb(35, 47, 52)';
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';

// AddAddressA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  instructionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
  },
  touchArea: {
    marginHorizontal: 16,
    marginBottom: 6,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(35, 47, 52, 0.12)',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  instruction: {
    marginTop: 32,
    paddingHorizontal: 32,
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    margin: 8,
  },
  small: {
    flex: 2,
  },
  large: {
    flex: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

// AddAddressA
const AddAddressA=({navigation,route})=>{
 const dispatch=useDispatch();
   const[addressType,setAddressType]=useState('home');
  const[number,setNumber]=useState('');
  const[numberFocused,setNumberFocused]=useState(false);
  const[street,SetStreet]=useState('');
  const[streetFocused,SetStreetFocused]=useState(false);
  const[district,setDistrict]=useState('');
  const[districtFocused,setDistrictFocused]=useState(false);
  const[zip,setZip]=useState('');
  const[zipFocused,SetZipFocused]=useState(false);
  const[city,setCity]=useState('');
  const[cityFocused,SetCityFocused]=useState(false);
  const[modalVisible,setModelVisible]=useState(false);
const{userDta}=route.params;

const ChangeNumber=text=>{
setNumber(text);
}
const ChangeStreet=text=>{
  SetStreet(text);
}
const changeDistrict=text=>{
setDistrict(text);
}
const changeZip=text=>{
setZip(text);
}
const ChangeCity=text=>{
setCity(text);
}

  /*componentDidMount = () => {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  };*/

  // avoid memory leak
  /*componentWillUnmount = () => {
    clearTimeout(this.timeout);
    this.keyboardDidHideListener.remove();
  };*/

  const keyboardDidHide = () => {
    /*this.setState({
      numberFocused: false,
      streetFocused: false,
      districtFocused: false,
      zipFocused: false,
      cityFocused: false,
    });*/
  };

  const goBack = () => {
    //onst {navigation} = this.props;
    navigation.goBack();
  };

  const setAddressTypee = (type) => () => {
    /*this.setState({
      addressType: type,
    });*/
    console.log('inn');
    setAddressType(type)
  };

  const onChangeText = (key) => (text) => {
    /*this.setState({
      [key]: text,
    });*/
    //sconsole.log(text);
  };

  const onFocus = (key) => () => {
    let focusedInputs = {
      numberFocused: false,
      streetFocused: false,
      districtFocused: false,
      zipFocused: false,
      cityFocused: false,
    };
    focusedInputs[key] = true;

    /*this.setState({
      ...focusedInputs,
    });*/
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };

  const saveAddress = () => {
    Keyboard.dismiss();
    const customId=new Date();
    const addressData=
     { id: customId,
      type: addressType,
      street: street,
      district:district,
      city: city,
      zip: zip,
      number: number,
      active: false,
     };
    dispatch(UserAction.updateDriverData( addressData,userDta));
    navigation.pop();
    /*this.setState(
      {
        modalVisible: true,
        emailFocused: false,
      },
      () => {
        // for demo purpose after 3s close modal
        this.timeout = setTimeout(() => {
          this.closeModal();
        }, 3000);
      },
    );*/
  };

  const closeModal = () => {
    // for demo purpose clear timeout if user request close modal before 3s timeout
    clearTimeout(timeout);
    /*this.setState(
      {
        modalVisible: false,
      },
      () => {
        this.goBack();
      },
    );*/
  };

  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.row}>
            <View style={styles.picker}>
              <View
                style={[
                  styles.touchArea,
                  addressType == 'apartment' && {
                    backgroundColor: Colors.primaryColor,
                  },
                ]}>
                <TouchableItem onPress={setAddressTypee('apartment')}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={APARTMAN_ICON}
                      size={19}
                      color={
                        addressType == 'apartment'
                          ? Colors.onPrimaryColor
                          : ICON_COLOR
                      }
                    />
                  </View>
                </TouchableItem>
              </View>
              <Caption>Apartment</Caption>
            </View>

            <View style={styles.picker}>
              <View
                style={[
                  styles.touchArea,
                  addressType == 'home' && {
                    backgroundColor: Colors.primaryColor,
                  },
                ]}>
                <TouchableItem onPress={setAddressTypee('home')}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={HOME_ICON}
                      size={19}
                      color={
                        addressType == 'home'
                          ? Colors.onPrimaryColor
                          : ICON_COLOR
                      }
                    />
                  </View>
                </TouchableItem>
              </View>
              <Caption>Home</Caption>
            </View>

            <View style={styles.picker}>
              <View
                style={[
                  styles.touchArea,
                  addressType == 'office' && {
                    backgroundColor: Colors.primaryColor,
                  },
                ]}>
                <TouchableItem onPress={setAddressTypee('office')}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={OFFICE_ICON}
                      size={19}
                      color={
                        addressType == 'office'
                          ? Colors.onPrimaryColor
                          : ICON_COLOR
                      }
                    />
                  </View>
                </TouchableItem>
              </View>
              <Caption>Office</Caption>
            </View>
          </View>

          <View style={styles.instructionContainer}>
            <Paragraph style={styles.instruction}>
              Enter your delivery address details
            </Paragraph>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <UnderlineTextInput
              value={number}
                onChangeText={ChangeNumber}
                onFocus={onFocus('numberFocused')}
                inputFocused={numberFocused}
                onSubmitEditing={focusOn(street)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Number"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              />
            </View>

            <View style={styles.inputContainer}>
              <UnderlineTextInput
                value={street}
                onChangeText={ChangeStreet}
                onFocus={onFocus('streetFocused')}
                inputFocused={streetFocused}
                onSubmitEditing={focusOn(district)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Street name"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              />
            </View>

            <View style={styles.inputContainer}>
              <UnderlineTextInput
                value={district}
                onChangeText={changeDistrict}
                onFocus={onFocus('districtFocused')}
                inputFocused={districtFocused}
                onSubmitEditing={focusOn(zip)}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="District"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.small]}>
                <UnderlineTextInput
                  value={zip}
                  onChangeText={changeZip}
                  onFocus={onFocus('zipFocused')}
                  inputFocused={zipFocused}
                  onSubmitEditing={focusOn(city)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  placeholder="ZIP Code"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                />
              </View>

              <View style={[styles.inputContainer, styles.large]}>
                <UnderlineTextInput
                  value={city}
                  onChangeText={ChangeCity}
                  onFocus={onFocus('cityFocused')}
                  inputFocused={cityFocused}
                  onSubmitEditing={saveAddress}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  placeholder="City"
                  placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                  inputTextColor={INPUT_TEXT_COLOR}
                  borderColor={INPUT_BORDER_COLOR}
                  focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={saveAddress}
              disabled={false}
              small
              title={'Save address'.toUpperCase()}
            />
          </View>

          <ActivityIndicatorModal
            message="Please wait . . ."
            onRequestClose={closeModal}
            title="Saving address"
            visible={modalVisible}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
export default AddAddressA;
