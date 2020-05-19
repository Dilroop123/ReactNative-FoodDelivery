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
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Icon from '../icon/Icon';
import TouchableItem from '../TouchableItem';

// import colors
import Colors from '../../theme/colors';

// ActionProductCardHorizontal Config
const imgHolder = require('../../assets/img/imgholder.png');

const isRTL = I18nManager.isRTL;
const IOS = Platform.OS === 'ios';
const MINUS_ICON = IOS ? 'ios-remove' : 'md-remove';
const PLUS_ICON = IOS ? 'ios-add' : 'md-add';
const DELETE_ICON = IOS ? 'ios-close' : 'md-close';

// ActionProductCardHorizontal Styles
const styles = StyleSheet.create({
  swipeRow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.error).alpha(0.12).string(),
  },
  deleteButtonContainer: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    width: 88,
    overflow: 'hidden',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    backgroundColor: Colors.background,
  },
  container: {
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.surface,
  },
  productImg: {
    width: 116,
    height: 126,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  title: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
    color: Colors.primaryText,
    letterSpacing: 0.15,
    textAlign: 'left',
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  oldPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8e8e8e',
  },
  hr: {
    position: 'absolute',
    top: 10,
    width: '82%',
    height: 1,
    backgroundColor: '#8e8e8e',
  },
  price: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primaryColor,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  quantity: {
    top: -1,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondaryColor,
  },
  newLabelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primaryColor,
  },
  label: {
    fontSize: 12,
    color: 'black',
  },
});

// ActionProductCardHorizontal DeleteButton
const DeleteButton = ({onPress}) => (
  <View style={styles.deleteButtonContainer}>
    <TouchableItem onPress={onPress} style={styles.deleteButton}>
      <Icon name={DELETE_ICON} size={26} color={Colors.error} />
    </TouchableItem>
  </View>
);

// ActionProductCardHorizontal State
type State = {};

// ActionProductCardHorizontal Props
type Props = {
  onPress: () => {},
  onPressRemove: () => void,
  onPressAdd: () => void,
  activeOpacity: number,
  imageUri: string,
  title: string,
  price: number,
  showButton:boolean,
  sum:string,
  quantity: number,
  discountPercentage: number,
  swipeoutDisabled: boolean,
  swipeoutOnPressRemove: () => {},
  label: 'new',
};

// ActionProductCardHorizontal
export default class ActionProductCardHorizontal extends Component<
  Props,
  State,
> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onPressAdd = () => {
    const {onPressAdd = () => {}} = this.props;
    onPressAdd();
  };

  onPressRemove = () => {
    const {onPressRemove = () => {}} = this.props;
    onPressRemove();
  };

  renderLabel = (label) => {
    if (label === 'new') {
      return (
        <View style={styles.newLabelContainer}>
          <Text style={styles.label}>NEW</Text>
        </View>
      );
    }

    return <View />;
  };

  render() {
    const {
      activeOpacity,
      onPress,
      imageUri,
      sum=0,
      title,
      price = 0,
      quantity = 0,
      discountPercentage,
      swipeoutDisabled,
      swipeoutOnPressRemove,
      showButton,
      label,
    } = this.props;

    return (
      <View style={styles.container}>
        <SwipeRow
          disableLeftSwipe={isRTL ? true : swipeoutDisabled}
          disableRightSwipe={isRTL ? swipeoutDisabled : true}
          directionalDistanceChangeThreshold={16}
          rightOpenValue={isRTL ? 0 : -88}
          leftOpenValue={isRTL ? 88 : 0}
          style={styles.swipeRow}>
          <View style={styles.cardBack}>
            <DeleteButton onPress={swipeoutOnPressRemove} />
          </View>

          {/* FIX ME:
           * extra View was added because of iOS ToucableOpacity bug
           */}
          <View style={styles.bg}>
            <TouchableItem
              activeOpacity={activeOpacity}
              onPress={onPress}
              useForeground>
              <View style={styles.innerContainer}>
                <Image
                  defaultSource={imgHolder}
                  source={getImgSource(imageUri)}
                  style={styles.productImg}
                />

                <View style={styles.productInfo}>
                  <View style={styles.productDetails}>
                    <Text numberOfLines={2} style={styles.title}>
                      {title}
                    </Text>

                    {discountPercentage ? (
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                          {`$ ${(
                            ((100 - discountPercentage) / 100) *
                            price
                          ).toFixed(2)}`}
                        </Text>
                        <View>
                          <Text style={styles.oldPrice}>{`$ ${price.toFixed(
                            2,
                          )}`}</Text>
                          <View style={styles.hr} />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>{`$ ${price.toFixed(
                          2,
                        )}`}</Text>
                      </View>
                    )}
                  </View>
                       {showButton?
                  <View style={styles.actionContainer}>
                    {quantity > 0 && (
                      <View style={styles.actions}>
                        <TouchableItem onPress={this.onPressRemove} borderless>
                          <View style={styles.iconContainer}>
                            <Icon
                              name={MINUS_ICON}
                              size={20}
                              color={Colors.onPrimaryColor}
                            />
                          </View>
                        </TouchableItem>

                        <Text style={styles.quantity}>{quantity}</Text>
                      </View>
                    )}
                    <TouchableItem onPress={this.onPressAdd} borderless>
                      <View style={styles.iconContainer}>
                        <Icon
                          name={PLUS_ICON}
                          size={20}
                          color={Colors.onPrimaryColor}
                        />
                      </View>
                    </TouchableItem>
                  </View>:null}
                  {sum?<View style={{alignItems:'center',flexDirection:"row"}}>
                   <Text>Total Price/Quantity : </Text>       
                  <Text style={{fontWeight:'bold',fontSize:18,color:Colors.gold}}>{`$ ${sum.toFixed(
                          2,
                        )}`}</Text>
                  </View>:null}
                </View>

                {this.renderLabel(label)}
              </View>
            </TouchableItem>
          </View>
        </SwipeRow>
      </View>
    );
  }
}
