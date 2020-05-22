/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import node modules
import React, { useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

// import components
import OrderItem from '../../components/cards/OrderItemA';
import {useSelector} from 'react-redux';
// import colors
import Colors from '../../theme/colors';

// OrdersA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  productsContainer: {
    paddingVertical: 8,
  },
});
let transformedCartItems=[];
// OrdersA
const OrdersA=({navigation,route})=> {
 


  const UsersData=useSelector(state=>state.users.userSettingData);
//let del_address=[];
transformedCartItems=[];

  if(UsersData.length>0 && UsersData.length!=null && UsersData!=null){

    for(const key in UsersData[0].orders)
    {
  
     // del_address=UsersData[0].orders;
      transformedCartItems.push({
          orderNumber: key,
          orderDate:UsersData[0].orders[key].orderDate,
          orderStatus: UsersData[0].orders[key].orderStatus,
          orderItems: UsersData[0].orders[key].orderItems,
        
       orderLocation: UsersData[0].orders[key].location,
     
      });
    
    }
    console.log(transformedCartItems);
    }



//console.log(UsersData);
    const [orders,setOrders]=useState(
      [
        {
          orderNumber: '11',
          orderDate: '22 July, 2019',
          orderStatus: 'on-the-way',
          orderItems: [
            {
              name: 'Pizza',
              price: 4.99,
            }
          ],
        },
        {
          orderNumber: '10',
          orderDate: '10 July, 2019',
          orderStatus: 'pending',
          orderItems: [
            {
              name: 'Pizza One',
              price: 7.99,
            },
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
        {
          orderNumber: '09',
          orderDate: '05 July, 2019',
          orderStatus: 'delivered',
          orderItems: [
            {
              name: 'Pizza Mozzarella',
              price: 8.99,
            },
            {
              name: 'Pizza Gorgonzola',
              price: 6.99,
            },
            {
              name: 'Pizza Funghi',
              price: 9.99,
            },
          ],
        },
      ]
    )
      
  

  const goBack = () => {
    //const {navigation} = this.props;
    navigation.goBack();
  };

  const navigateTo = screen => () => {
    //const {navigation} = this.props;
    navigation.navigate(screen);
  };

  const keyExtractor = item => item.orderNumber.toString();

  const renderItem = ({item, index}) => (
    <OrderItem
      key={index}
      activeOpacity={0.8}
      orderNumber={item.orderNumber}
      orderDate={item.orderDate}
      orderItems={item.orderItems}
      orderStatus={item.orderStatus}
      orderLocation={item.orderLocation}
      onPress={navigateTo('Product')}
    />
  );

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={transformedCartItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.productsContainer}
          />
        </View>
      </SafeAreaView>
    );
  }
export default OrdersA;
