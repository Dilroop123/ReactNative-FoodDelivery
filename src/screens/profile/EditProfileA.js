/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Color from 'color';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Keyboard } from 'react-native'
// import components
import Avatar from '../../components/avatar/Avatar';
import Icon from '../../components/icon/Icon';
import {Subtitle2} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { useSelector,useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
// import colors
import Colors from '../../theme/colors';
import Button from '../../components/buttons/Button';
import * as UserActions from '../../store/Actions/userAction';
// EditProfileA Config
const AVATAR_SIZE = 100;
const IOS = Platform.OS === 'ios';
const CAMERA_ICON = IOS ? 'ios-camera' : 'md-camera';
const INPUT_FOCUSED_BORDER_COLOR = Colors.primaryColor;

// EditProfileA Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  whiteCircle: {
    marginTop: -18,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  cameraButtonContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryColor,
    overflow: 'hidden',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
  },
  editForm: {
    paddingHorizontal: 20,
  },
  overline: {
    color: Color(Colors.secondaryText).alpha(0.6),
    textAlign: 'left',
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 17,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

// EditProfileA
const EditProfileA=({navigation,route})=>{
 
    const {profiledata}=route.params;
  console.log(profiledata[0].date);
const [name,setName]=useState(profiledata[0].name);
const [nameFocused,setNameFocused]=useState();
const[email,setEmail]=useState(profiledata[0].email);
const[emailFocused,setEmailFocused]=useState();
const[phone,setPhone]=useState(profiledata[0].phone);
const[phoneFocused,setPhoneFocused]=useState();

const dispatch=useDispatch();

  const goBack = () => {
    //const {navigation} = this.props;
    navigation.goBack();
  };

  const nameChange = (text) => {
    setName(text);
  };

  const nameFocus = () => {
    
    setNameFocused(true);
    setEmailFocused(false);
    setPhoneFocused(false);
  };


  const emailChange = (text) => {
 
    setEmail(text);
  };

  const emailFocus = () => {
   
    setNameFocused(false);
    setEmailFocused(true);
    setPhoneFocused(false);
  };

  const phoneChange = (text) => {
  
    setPhone(text);
  };

  const createAccount=()=>{
    Keyboard.dismiss();
  }


const updateData=()=>{
  AsyncStorage.getItem('UserId').then((value)=>{
    console.log(value);
    if(value!=null){
      dispatch(UserActions.updateUserProfile(value,name,email,phone))
    }
  });
navigation.pop();
}


  const phoneFocus = () => {
 
    setNameFocused(false);
    setEmailFocused(false);
    setPhoneFocused(true);
  };

  const focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
    
  };

 
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView enableOnAndroid>
          
          <View style={{...styles.editForm,marginTop:40}}>
            <Subtitle2 style={styles.overline}>Name</Subtitle2>
            <UnderlineTextInput
              
              value={name}
              onChangeText={nameChange}
              onFocus={nameFocus}
              inputFocused={nameFocused}
              
          
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />

            <Subtitle2 style={styles.overline}>E-mail Address</Subtitle2>
            <UnderlineTextInput
           
              value={email}
              onChangeText={emailChange}
              onFocus={emailFocus}
              inputFocused={emailFocused}
             
        
              keyboardType="email-address"
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />

            <Subtitle2 style={styles.overline}>Phone Number</Subtitle2>
            <UnderlineTextInput
             
              value={phone}
              keyboardType="phone-pad"
              onChangeText={phoneChange}
              onFocus={phoneFocus}
              onSubmitEditing={createAccount}
              returnKeyType="done"
    
              inputFocused={phoneFocused}
              focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
        </KeyboardAwareScrollView>
        <Button title="save" onPress={updateData}/>
      </SafeAreaView>
    );
  }
export default EditProfileA;
