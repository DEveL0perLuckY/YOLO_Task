import React, {useState, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
  Animated,
  Easing,
} from 'react-native';
import {FontFamily} from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';

const {width} = Dimensions.get('window');

const Yolo = () => {
  // State for CVV visibility
  const [cvvVisible, setCvvVisible] = useState(false);

  // State for freeze/unfreeze
  const [isFrozen, setIsFrozen] = useState(false);

  // Animation value for freeze effect
  const freezeAnim = useRef(new Animated.Value(0)).current;

  // 1. Copy details function
  const handleCopyDetails = () => {
    const cardDetails = `Card Number: 8124 1242 3033 9211\nExpiry: 01/28\nCVV: 123`;
    Clipboard.setString(cardDetails);
    ToastAndroid.show('Details copied!', ToastAndroid.SHORT);
  };

  // 2. Toggle CVV visibility
  const toggleCvvVisibility = () => {
    setCvvVisible(!cvvVisible);
  };

  // 3. Toggle freeze/unfreeze with animation
  const toggleFreeze = () => {
    if (isFrozen) {
      // Unfreeze animation
      Animated.timing(freezeAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setIsFrozen(false);
        ToastAndroid.show('Card unfrozen!', ToastAndroid.SHORT);
      });
    } else {
      // Freeze animation
      Animated.timing(freezeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setIsFrozen(true);
        ToastAndroid.show('Card frozen!', ToastAndroid.SHORT);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>select payment mode</Text>
      <Text style={styles.subText}>
        choose your preferred payment method to make payment.
      </Text>

      <View style={styles.paymentOptions}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText}>pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardText}>card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle}>YOUR DIGITAL DEBIT CARD</Text>

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Animated.View
            style={[
              styles.frostOverlay,
              {
                opacity: freezeAnim,
                transform: [
                  {
                    scale: freezeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={require('../assets/xyz.png')}
              style={styles.frostTexture}
            />
          </Animated.View>

          <Image
            style={[styles.cardBackground, isFrozen && styles.frozenCard]}
            source={require('../assets/card.png')}
          />
          <View style={styles.cardHeader}>
            <Image
              source={require('../assets/yolo.png')}
              style={styles.yoloLogo}
            />
            <Image
              source={require('../assets/yesbank.png')}
              style={styles.bankLogo}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.cardNumber}>{`    8124 
    1242
    3033
    9211`}</Text>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  top: width * 0.2,
                  left: width * 0.1,
                }}>
                <Text style={styles.detailLabel}>expiry</Text>
                <Text style={styles.detailValue}>01/28</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  top: width * 0.22,
                  left: width * 0.1,
                }}>
                <Text style={styles.detailLabel}>cvv</Text>
                <Text style={styles.detailValue}>
                  {cvvVisible ? '123' : '***'}
                </Text>
                <TouchableOpacity
                  onPress={toggleCvvVisibility}
                  style={styles.eyeIconContainer}>
                  <Ionicons
                    name={cvvVisible ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={cvvVisible ? 'white' : 'red'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.copyContainer}
            onPress={handleCopyDetails}>
            <Ionicons name="copy-outline" size={16} color="red" />
            <Text style={styles.copyText}>copy details</Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/Ruppay.png')}
            style={styles.rupayLogo}
          />
        </View>
        <View style={styles.freezeContainer}>
          <TouchableOpacity style={styles.freezeButton} onPress={toggleFreeze}>
            <Ionicons
              name="snow"
              size={20}
              color={isFrozen ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <Text style={styles.freezeText}>
            {isFrozen ? 'unfreeze' : 'freeze'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Yolo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    padding: width * 0.05,
  },
  header: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: width * 0.06,
    color: 'white',
    marginBottom: width * 0.02,
  },
  subText: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: width * 0.035,
    color: '#888',
    marginBottom: width * 0.06,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: width * 0.04,
    marginBottom: width * 0.06,
  },
  payButton: {
    backgroundColor: 'black',
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  payText: {
    fontFamily: FontFamily.poppinsBold,
    color: 'white',
    fontSize: width * 0.04,
    textTransform: 'lowercase',
  },
  cardButton: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.08,
    borderRadius: 30,
  },
  cardText: {
    fontFamily: FontFamily.poppinsBold,
    color: 'red',
    fontSize: width * 0.04,
    textTransform: 'lowercase',
  },
  cardTitle: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: width * 0.03,
    color: '#888',
    marginBottom: width * 0.03,
    marginLeft: width * 0.02,
  },
  cardWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  cardBackground: {
    width: width * 0.66,
    height: width * 1,
    position: 'absolute',
    top: width * 0.05,
    borderRadius: 20,
  },
  card: {
    width: width * 0.75,
    height: width * 0.45,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yoloLogo: {
    width: width * 0.25,
    height: width * 0.05,
    resizeMode: 'contain',
    top: width * 0.08,
    left: width * 0.01,
  },
  bankLogo: {
    width: width * 0.24,
    height: width * 0.1,
    resizeMode: 'contain',
    top: width * 0.08,
    right: width * 0.12,
  },
  cardNumber: {
    fontFamily: FontFamily.poppinsSemiBold,
    color: 'white',
    fontSize: width * 0.05,
    letterSpacing: 2,
    marginVertical: width * 0.04,
    top: width * 0.2,
  },
  detailLabel: {
    fontFamily: FontFamily.poppinsRegular,
    color: '#888',
    fontSize: width * 0.03,
  },
  detailValue: {
    fontFamily: FontFamily.poppinsSemiBold,
    color: 'white',
    fontSize: width * 0.04,
    marginTop: width * 0.005,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: width * 0.05,
    right: width * 0.33,
    zIndex: 20,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: width * 0.22,
    left: 20,
  },
  copyText: {
    fontFamily: FontFamily.poppinsMedium,
    color: 'red',
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
  },
  rupayLogo: {
    position: 'absolute',
    width: 90,
    height: 244,
    bottom: -290,
    right: 50,
    resizeMode: 'contain',
  },
  freezeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freezeButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: width * 0.03,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  freezeText: {
    fontFamily: FontFamily.poppinsRegular,
    color: 'white',
    fontSize: width * 0.03,
    marginTop: width * 0.01,
  },
  frostOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    borderRadius: 20,
    // overflow: 'hidden',
  },
  frostTexture: {
    width: width * 0.66,
    height: width * 1,
    position: 'absolute',
    top: width * 0.05,
    borderRadius: 20,
    ...StyleSheet.absoluteFillObject,
  },
  frozenCard: {
    opacity: 0.8,
  },
});
