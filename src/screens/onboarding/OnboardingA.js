/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

// import components
import {Heading5, Paragraph} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// OnboardingA Config
const isRTL = I18nManager.isRTL;
const BUTTON_HEIGHT = 58; // pagination button height
const BUTTON_WIDTH = 92; // pagination button width

const slide1Img = require('../../assets/img/slider/1.jpg');
const slide2Img = require('../../assets/img/slider/2.jpg');
const slide3Img = require('../../assets/img/slider/3.jpg');
const slide4Img = require('../../assets/img/slider/4.jpg');

const slides = [
  {
    id: 'slide1',
    img: slide1Img,
    title: 'Find your flavour',
    description:
      'Easy and fast way to order food from the best local restaurant.',
  },
  {
    id: 'slide2',
    img: slide2Img,
    title: 'Choose your meal',
    description: 'Browse through menu and reviews to find the food you like.',
  },
  {
    id: 'slide3',
    img: slide3Img,
    title: 'Easy payment',
    description: 'Pay online with credit card. Click, sit back and relax.',
  },
  {
    id: 'slide4',
    img: slide4Img,
    title: 'Delivered fast',
    description: 'Get food to your door in minutes. We deliver, you enjoy!',
  },
];

// OnboardingA Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  swiperContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  slideImg: {
    borderRadius: 8,
    width: 232,
    height: 192,
    resizeMode: 'cover',
  },
  title: {
    paddingTop: 24,
    color:Colors.gold,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 23,
    color: Colors.gold,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.12)',
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    width: BUTTON_WIDTH,
  },
  leftButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 10,
    paddingRight: 12,
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    paddingLeft: 12,
    paddingRight: 10,
  },
  actionButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.gold,
  },
  dot: {
    margin: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bgDark: {
    backgroundColor: Colors.gold,
  },
  bgLight: {
    backgroundColor: Colors.primaryColorDark,
    opacity: 0.3,
  },
});

export default class OnboardingA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onIndexChanged = (index) => {
    let activeIndex;
    if (isRTL) {
      activeIndex = slides.length - 1 - index;
    } else {
      activeIndex = index;
    }
    this.setState({
      activeIndex: activeIndex,
    });
  };

  previousSlide = () => {
    this.swiper.scrollBy(-1, true);
  };

  nextSlide = () => {
    this.swiper.scrollBy(1, true);
  };

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {activeIndex} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.swiperContainer}>
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            index={isRTL ? slides.length - 1 : 0}
            onIndexChanged={this.onIndexChanged}
            loop={false}
            showsPagination={false}>
            {slides.map((item) => (
              <View key={item.id} style={styles.slide}>
                <Image source={item.img} style={styles.slideImg} />
                <Heading5 style={styles.title}>{item.title}</Heading5>
                <View style={styles.descriptionContainer}>
                  <Paragraph style={styles.descriptionText}>
                    {item.description}
                  </Paragraph>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.paginationContainer}>
          <View style={styles.buttonContainer}>
            {activeIndex > 0 ? (
              <TouchableItem
                onPress={isRTL ? this.nextSlide : this.previousSlide}>
                <View style={[styles.row, styles.leftButton]}>
                  <Icon
                    name={isRTL ? 'chevron-right' : 'chevron-left'}
                    size={24}
                    color={Colors.gold}
                  />
                  <Text style={styles.buttonText}>{'back'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo('Welcome')}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{'skip'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>

          <View style={styles.row}>
            {slides.map((item, i) => (
              <View
                key={`dot_${item.id}`}
                style={[
                  styles.dot,
                  activeIndex === i ? styles.bgDark : styles.bgLight,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {activeIndex < slides.length - 1 ? (
              <TouchableItem
                onPress={isRTL ? this.previousSlide : this.nextSlide}>
                <View style={[styles.row, styles.rightButton]}>
                  <Text style={styles.buttonText}>{'next'.toUpperCase()}</Text>
                  <Icon
                    name={isRTL ? 'chevron-left' : 'chevron-right'}
                    size={24}
                    color={Colors.gold}
                  />
                </View>
              </TouchableItem>
            ) : (
              <TouchableItem onPress={this.navigateTo('Welcome')}>
                <View style={styles.actionButton}>
                  <Text style={styles.buttonText}>{'done'.toUpperCase()}</Text>
                </View>
              </TouchableItem>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
