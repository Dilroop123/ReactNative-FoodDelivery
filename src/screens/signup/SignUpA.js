/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useSelector,useDispatch } from 'react-redux';
// import components
import Button from '../../components/buttons/Button';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import * as UserActions from '../../store/Actions/userAction';
// SignUpA Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';

// SignUpA Styles
// SignUpA
const SignUpA=({navigation,route})=>{
  

  /*  this.state = {
      email: '',
      emailFocused: false,
      phone: '',
      phoneFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
    };*/
    const dispatch=useDispatch();
    const[name,setName]=useState('');
    const[nameFocused,setNameFocused]=useState(false);
  const[email,setEmail]=useState('');
  const[emailFocused,setEmailFocused]=useState(false);
  const[phone,setPhone]=useState('');
  const[phoneFocused,setPhoneFocused]=useState(false);
  const[password,setPassword]=useState('');
  const[passwordFocused,setPasswordFocused]=useState(false);
  const[secureTextEntry,SetSecureTextEntry]=useState(true);


  const nameChange=text=>{
    setName(text);
  }
  const nameFocus=()=>{
    setNameFocused(true);
    setEmailFocused(false);
    setPhoneFocused(false);
    setPasswordFocused(false);  
  }
  const emailChange = text => {
    /*this.setState({
      email: text,
    });*/
    setEmail(text);
  };

  const emailFocus = () => {
    /*this.setState({
      emailFocused: true,
      phoneFocused: false,
      passwordFocused: false,
    });*/
    setEmailFocused(true);
    setPhoneFocused(false);
    setPasswordFocused(false);
    setNameFocused(false);
  };

  const phoneChange = text => {
    /*this.setState({
      phone: text,
    });*/
    setPhone(text);
  };

  const phoneFocus = () => {
    /*this.setState({
      phoneFocused: true,
      emailFocused: false,
      passwordFocused: false,
    });*/
    setEmailFocused(false);
    setPhoneFocused(true);
    setPasswordFocused(false);
    setNameFocused(false)
  };

  const passwordChange = text => {
    /*this.setState({
      password: text,
    });*/
    setPassword(text);
  };

  const passwordFocus = () => {
    /*this.setState({
      passwordFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });*/
    setEmailFocused(false);
    setPhoneFocused(false);
    setPasswordFocused(true);
    setNameFocused(false);
  };

  const onTogglePress = () => {
    //const {secureTextEntry} = this.state;
    /*this.setState({
      secureTextEntry: !secureTextEntry,
    });*/
    SetSecureTextEntry(!secureTextEntry);
  };

  const navigateTo = screen => () => {
    //onst {navigation} = this.props;
    navigation.navigate(screen);
  };

 const createAccount = () => {
     /*const { email, phone, password } = this.state;
    this.setState(name,email,phone,password
      {
        emailFocused: false,
        phoneFocused: false,
        passwordFocused: false,
      });
      this.navigateTo('Verification'),
    */
   const datval=new Date();
   //console.log(datval)
   if(name && email && phone && password){
   dispatch(UserActions.AddUser( name, email,phone,password,datval));
   navigation.navigate('SignIn');
   }else{
     console.log('plz fill all fields')
   }
   
  };

  const focusOn = nextFiled => () => {
    console.log(nextFiled);
   /* if (nextFiled) {
      nextFiled.focus();
    }*/
  };


    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            <View />

            <View style={styles.form}>
            <UnderlineTextInput
                
                value={name}
                onChangeText={nameChange}
                onFocus={nameFocus}
                inputFocused={nameFocused}
                onSubmitEditing={focusOn(phone)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="Name"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />
             
              <UnderlineTextInput
                
                value={email}
                onChangeText={emailChange}
                onFocus={emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={focusOn(phone)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="E-mail"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlineTextInput
                value={phone}
                onChangeText={phoneChange}
                onFocus={phoneFocus}
                inputFocused={phoneFocused}
                onSubmitEditing={focusOn(password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="phone-pad"
                placeholder="Phone number"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlinePasswordInput
                value={password}
                onChangeText={passwordChange}
                onFocus={passwordFocus}
                inputFocused={passwordFocused}
                onSubmitEditing={createAccount}
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={secureTextEntry ? 'Show' : 'Hide'}
                onTogglePress={onTogglePress}
              />

              <View style={styles.buttonContainer}>
                <Button
                  onPress={createAccount}
                  title={'Create Account'.toUpperCase()}
                />
              </View>

              <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.buttonsGroup}>
                <Button
                  onPress={()=>createAccount}
                  color="#3b5998"
                  socialIconName="facebook-square"
                  iconColor={Colors.white}
                  title={'Sign up with Facebook'.toUpperCase()}
                />

                <View style={styles.vSpacer} />

                <Button
                  onPress={()=>createAccount}
                  color="#db4437"
                  socialIconName="google"
                  iconColor={Colors.white}
                  title={'Sign up with Google'.toUpperCase()}
                />
              </View>
            </View>

            <TouchableWithoutFeedback
              onPress={()=>navigateTo('TermsConditions')}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By registering, you accepts our
                </Text>
                <View style={styles.termsContainer}>
                  <Text style={[styles.footerText, styles.footerLink]}>
                    Terms & Conditions
                  </Text>
                  <Text style={styles.footerText}> and </Text>
                  <Text style={[styles.footerText, styles.footerLink]}>
                    Privacy Policy
                  </Text>
                  <Text style={styles.footerText}>.</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

export default SignUpA;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.primaryText,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

