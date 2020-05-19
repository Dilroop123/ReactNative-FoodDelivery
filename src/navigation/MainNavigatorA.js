/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import * as React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import components
import HeaderIconButton from '../components/navigation/HeaderIconButton';

// import Onboarding screen
import Onboarding from '../screens/onboarding/OnboardingA';

// import Welcome screen
import Welcome from '../screens/welcome/WelcomeA';

// import SignUp screen
import SignUp from '../screens/signup/SignUpA';

// import Verification screen
import Verification from '../screens/verification/VerificationA';

// import SignIn screen
import SignIn from '../screens/signin/SignInA';

// import ForgotPassword screen
import ForgotPassword from '../screens/forgotpassword/ForgotPasswordA';

// import TermsConditions screen
import TermsConditions from '../screens/terms/TermsConditionsA';

// import HomeNavigator
import HomeNavigator from './HomeNavigatorA';

// import Product screen
import Product from '../screens/product/ProductA';

// import Categories screen
import Categories from '../screens/categories/CategoriesA';
import Category from '../screens/categories/CategoryA';

// import Search results screen
import SearchResults from '../screens/search/SearchResultsA';

// import Checkout screen
import Checkout from '../screens/checkout/CheckoutA';

// import EditProfile screen
import EditProfile from '../screens/profile/EditProfileA';

// import DeliveryAddress screen
import DeliveryAddress from '../screens/address/DeliveryAddressA';

// import AddAddress screen
import AddAddress from '../screens/address/AddAddressA';

// import EditAddress screen
import EditAddress from '../screens/address/EditAddressA';

// import Payment screen
import PaymentMethod from '../screens/payment/PaymentMethodA';

// import AddCreditCard screen
import AddCreditCard from '../screens/payment/AddCreditCardA';

// import Notifications screen
import Notifications from '../screens/notifications/NotificationsA';

// import Orders screen
import Orders from '../screens/orders/OrdersA';

// import AboutUs screen
import AboutUs from '../screens/about/AboutUsA';

// import colors
import Colors from '../theme/colors';

// MainNavigatorA Config
const SAVE_ICON = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

// create stack navigator
const Stack = createStackNavigator();

// MainNavigatorA
function MainNavigatorA() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardOverlayEnabled: false,
          headerStyle: {
            elevation: 1,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: Colors.onBackground,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Create Account',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: 'Forgot Password?',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'Terms and Conditions',
          }}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            title: 'All Categories',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ route }) => ({ title: route.params.title_name })}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{
            title: 'Search Results',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            title: 'Checkout',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation}) => ({
            title: 'Edit Profile'
            
          })}
        />
        <Stack.Screen
          name="DeliveryAddress"
          component={DeliveryAddress}
          options={({navigation}) => ({
            title: 'Delivery Address'
            
          })}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            title: 'Add New Address',
          }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{
            title: 'Edit Address',
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            title: 'Payment Method',
          }}
        />
        <Stack.Screen
          name="AddCreditCard"
          component={AddCreditCard}
          options={{
            title: 'Add Credit Card',
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'My Orders',
          }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            title: 'About Us',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigatorA;
