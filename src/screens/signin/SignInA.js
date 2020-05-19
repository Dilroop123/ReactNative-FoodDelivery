/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component,useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useSelector,useDispatch } from 'react-redux';
// import components
import Button from '../../components/buttons/Button';
import InputModal from '../../components/modals/InputModal';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// SignInA Config
const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.4)';
const INPUT_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)';
const INPUT_BORDER_COLOR = 'rgba(0, 0, 0, 0.2)';
const INPUT_FOCUSED_BORDER_COLOR = '#000';
import * as UserActions from '../../store/Actions/userAction';
// SignInA Styles


// SignInA
const SignInA=({navigation,route})=>{

  const UsersData=useSelector(state=>state.users.UsersData);

    const dispatch=useDispatch();
    const[email,setEmail]=useState('');
  const[emailFocused,setEmailFocused]=useState(false);
  const[password,setPassword]=useState('');
  const[passwordFocused,setPasswordFocused]=useState(false);
  const[secureTextEntry,setSecureTextEntry]=useState(true);
  const[inputModalVisible,setInputModelVisiible]=useState(false);
  const[showIndicator,SetShowLoader]=useState();


  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (UsersData.length>0) {
      SetShowLoader(false);  
    }
  }, [UsersData,showIndicator]);


  const emailChange = text => {
    
    setEmail(text);
  };

  const emailFocus = () => {
    
    setEmailFocused(true);
    setPasswordFocused(false);
  };

  const passwordChange = text => {
    
    setPassword(text);
  };

   const passwordFocus = () => {
   
    setEmailFocused(false);
    setPasswordFocused(true);
  };

  const onTogglePress = () => {
    
    setSecureTextEntry(!secureTextEntry);
  };

  const focusOn = nextFiled => () => {
    /*if (nextFiled) {
      nextFiled.focus();
    }*/
  };

  const showInputModal = value => () => {
    
    setInputModelVisiible(value);
  };

  const navigateTo = screen => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const signIn = () => {
    SetShowLoader(true);
    setEmailFocused(false);
    setPasswordFocused(false);
    dispatch(UserActions.fetchUser(email,password))
    
 
  };

  if(UsersData.length>0){
    if(UsersData[0]=="NOT_FOUND"){
  console.log(UsersData);
    }
    else
{
  navigation.navigate('HomeNavigator');
 console.log(UsersData);
   
}
}


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
                value={email}
                onChangeText={emailChange}
                onFocus={emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={focusOn(password)}
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

              <UnderlinePasswordInput
                value={password}
                onChangeText={passwordChange}
                onFocus={passwordFocus}
                inputFocused={passwordFocused}
                onSubmitEditing={signIn}
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={secureTextEntry ? 'Show' : 'Hide'}
                onTogglePress={onTogglePress}
              />
              
              <View style={styles.buttonContainer}>
               
              {showIndicator ?
 <View style={{marginTop:30,justifyContent:'center',alignItems:'center'}}>
   <Text style={{marginVertical:10}}>Searching User</Text>
  <ActivityIndicator size="large" color='yellow' />
  </View>:
                <Button
                  onPress={signIn}
                  title={'Sign in'.toUpperCase()}
                />}
              </View>

              <View style={styles.forgotPassword}>
                <Text
                  // onPress={this.showInputModal(true)}
                  onPress={navigateTo('ForgotPassword')}
                  style={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </View>

              <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.buttonsGroup}>
                <Button
                  onPress={navigateTo('HomeNavigator')}
                  color="#3b5998"
                  socialIconName="facebook-square"
                  iconColor={Colors.white}
                  title={'Sign in with Facebook'.toUpperCase()}
                />
                <View style={styles.vSpacer} />
                <Button
                  onPress={navigateTo('HomeNavigator')}
                  color="#db4437"
                  socialIconName="google"
                  iconColor={Colors.white}
                  title={'Sign in with Google'.toUpperCase()}
                />
              </View>
            </View>

            <TouchableWithoutFeedback
              onPress={()=>navigateTo('TermsConditions')}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By signing in, you accepts our
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

        <InputModal
          title="Forgot password?"
          message="Enter your e-mail address to reset password"
          inputDefaultValue={email}
          inputPlaceholder="E-mail address"
          inputKeyboardType="email-address"
          onRequestClose={showInputModal(false)}
          buttonTitle={'Reset password'.toUpperCase()}
          onClosePress={showInputModal(false)}
          visible={inputModalVisible}
        />
      </SafeAreaView>
    );
  }
export default SignInA;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainerStyle: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: {marginBottom: 7},
  buttonContainer: {paddingTop: 23},
  forgotPassword: {paddingVertical: 23},
  forgotPasswordText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'center',
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
  buttonsGroup: {
    paddingTop: 23,
  },
  vSpacer: {
    height: 15,
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