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
  ImageBackground,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';
import {FontAwesome as FAIcon} from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

// import components
import Avatar from '../../components/avatar/Avatar';
import GradientContainer from '../../components/gradientcontainer/GradientContainer';
import {
  Caption,
  Heading5,
  Subtitle1,
  Subtitle2,
} from '../../components/text/CustomText';
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

// AboutUsA Config
const isRTL = I18nManager.isRTL;
const FACEBOOK_ICON = 'facebook';
const INSTAGRAM_ICON = 'instagram';
const YELP_ICON = 'yelp';
const OVERLAY_COLOR = 'rgba(185, 0, 57, 0.4)';
const AVATAR_SIZE = 54;

// AboutUsA Styles
const styles = StyleSheet.create({
  pb6: {paddingBottom: 6},
  pl8: {paddingLeft: 8},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swiperContainer: {
    width: '100%',
    height: 252,
  },
  paginationStyle: {
    bottom: 14,
    transform: [{scaleX: isRTL ? -1 : 1}],
  },
  dot: {backgroundColor: Color(Colors.white).alpha(0.48)},
  activeDot: {backgroundColor: Colors.white},
  bgImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  swiperContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: AVATAR_SIZE + 2,
    height: AVATAR_SIZE + 2,
    borderRadius: (AVATAR_SIZE + 4) / 2,
    backgroundColor: Colors.white,
  },
  info: {
    fontWeight: '500',
  },
  infoText: {
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    textAlign: 'left',
  },
  caption: {
    color: Color(Colors.white).alpha(0.87),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 4,
    textAlign: 'left',
  },
  description: {
    maxWidth: '80%',
  },
  phone: {
    marginTop: 8,
    color: Colors.primaryColor,
  },
  social: {
    flexDirection: 'row',
    marginTop: 8,
    fontWeight: '500',
    marginBottom: 20,
  },
  socialButton: {
    margin: 8,
    borderRadius: 22,
    backgroundColor: Colors.primaryColor,
  },
  socialIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  footer: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  footerButtonText: {
    fontWeight: '500',
    color: Colors.primaryColor,
  },
});

// AboutUsA
export default class AboutUsA extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  callPhone = () => {
    Linking.openURL(`tel:${1601234567}`);
  };

  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.content}>
          <View style={styles.swiperContainer}>
            <Swiper
              loop={false}
              index={isRTL ? 2 : 0} // number of slides - 1
              paginationStyle={styles.paginationStyle}
              activeDotStyle={styles.activeDot}
              dotStyle={styles.dot}>
              <ImageBackground
                source={require('../../assets/img/about_1.jpg')}
                style={styles.bgImg}>
                <GradientContainer
                  colors={
                    isRTL
                      ? ['transparent', OVERLAY_COLOR]
                      : [OVERLAY_COLOR, 'transparent']
                  }
                  start={isRTL ? {x: 0, y: 0} : {x: 0.1, y: 0}}
                  end={isRTL ? {x: 0.4, y: 0} : {x: 1, y: 0}}
                  containerStyle={styles.swiperContent}>
                  <View style={styles.row}>
                    <View style={styles.avatarWrapper}>
                      <Avatar
                        imageUri={require('../../assets/img/profile_2.jpeg')}
                        size={AVATAR_SIZE}
                        rounded
                      />
                    </View>

                    <View style={styles.pl8}>
                      <Subtitle1 style={[styles.info, styles.infoText]}>
                        Natalie Garcia
                      </Subtitle1>
                      <Caption style={styles.caption}>Main Chef</Caption>
                    </View>
                  </View>

                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>
                      Exquisite and fashionable cuisine from the famous cooks.
                      Try our dishes and you will never want something else.
                    </Subtitle1>
                  </View>
                </GradientContainer>
              </ImageBackground>

              <ImageBackground
                source={require('../../assets/img/about_2.jpg')}
                style={styles.bgImg}>
                <GradientContainer
                  colors={
                    isRTL
                      ? ['transparent', OVERLAY_COLOR]
                      : [OVERLAY_COLOR, 'transparent']
                  }
                  start={isRTL ? {x: 0, y: 0} : {x: 0.1, y: 0}}
                  end={isRTL ? {x: 0.4, y: 0} : {x: 1, y: 0}}
                  containerStyle={styles.swiperContent}>
                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>
                      Our street-style food is bold, imaginative, and
                      deliciously messy. We use locally sourced ingedients, and
                      offer vegan-friendly dishes.
                    </Subtitle1>
                  </View>
                </GradientContainer>
              </ImageBackground>

              <ImageBackground
                source={require('../../assets/img/about_3.jpg')}
                style={styles.bgImg}>
                <GradientContainer
                  colors={
                    isRTL
                      ? ['transparent', OVERLAY_COLOR]
                      : [OVERLAY_COLOR, 'transparent']
                  }
                  start={isRTL ? {x: 0, y: 0} : {x: 0.1, y: 0}}
                  end={isRTL ? {x: 0.4, y: 0} : {x: 1, y: 0}}
                  containerStyle={styles.swiperContent}>
                  <View style={styles.row}>
                    <View>
                      <Caption style={[styles.caption, styles.pb6]}>
                        ADDRESS
                      </Caption>
                      <Subtitle1 style={[styles.info, styles.infoText]}>
                        384 K Las Vegas Blvd,
                      </Subtitle1>
                      <Subtitle1 style={[styles.info, styles.infoText]}>
                        Las Vegas, MS 85701
                      </Subtitle1>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Subtitle1 style={styles.infoText}>
                      We are not just a team, we are family. Visit us.
                    </Subtitle1>
                  </View>
                </GradientContainer>
              </ImageBackground>
            </Swiper>
          </View>

          <View style={styles.center}>
            <Subtitle2>CALL US</Subtitle2>
            <Heading5 style={styles.phone} onPress={this.callPhone}>
              1-60-123-456-7
            </Heading5>
          </View>

          <View style={styles.center}>
            <Subtitle2>FOLLOW US</Subtitle2>
            <View style={styles.social}>
              <View style={styles.socialButton}>
                <TouchableItem rippleColor={Colors.white} borderless>
                  <View style={styles.socialIconContainer}>
                    <FAIcon
                      name={FACEBOOK_ICON}
                      size={20}
                      color={Colors.white}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View style={styles.socialButton}>
                <TouchableItem rippleColor={Colors.white} borderless>
                  <View style={styles.socialIconContainer}>
                    <FAIcon
                      name={INSTAGRAM_ICON}
                      size={22}
                      color={Colors.white}
                    />
                  </View>
                </TouchableItem>
              </View>

              <View style={styles.socialButton}>
                <TouchableItem rippleColor={Colors.white} borderless>
                  <View style={styles.socialIconContainer}>
                    <FAIcon name={YELP_ICON} size={21} color={Colors.white} />
                  </View>
                </TouchableItem>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableItem>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>www.fooddelivery.com</Text>
            </View>
          </TouchableItem>
        </View>
      </SafeAreaView>
    );
  }
}
