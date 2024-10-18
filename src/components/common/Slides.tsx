import { Children, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  showSlideNumber: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

const Slides = ({ children, showSlideNumber, duration = 200, style }: PropsWithChildren<Props>) => {
  const numberOfChildren = Children.toArray(children).length;
  const [currentIndex, setCurrentIndex] = useState(showSlideNumber);

  /* ANIMATION */
  const windowWidth = Dimensions.get('window').width;
  const positions = {
    leftOutsideScreen: -windowWidth,
    center: 0,
    rightOutsideScreen: windowWidth,
  };

  /* ANIMATION REFERENCES */
  const translateXValue = useRef(new Animated.Value(positions.center)).current;

  useEffect(() => {
    if (currentIndex === showSlideNumber) return;
    const direction = showSlideNumber > currentIndex ? 'forward' : 'backward';

    Animated.timing(translateXValue, {
      toValue: direction === 'forward' ? positions.leftOutsideScreen : positions.rightOutsideScreen,
      duration,
      useNativeDriver: true,
    }).start(() => {
      // animation has finished, time to render the next element
      translateXValue.setValue(
        direction === 'forward' ? positions.rightOutsideScreen : positions.leftOutsideScreen
      );
      setCurrentIndex(Math.min(Math.max(0, showSlideNumber), numberOfChildren - 1));

      Animated.timing(translateXValue, {
        toValue: positions.center,
        duration,
        useNativeDriver: true,
      }).start();
    });
  }, [showSlideNumber]);

  return (
    <View style={[{ flex: 1 }, style]}>
      <Animated.View style={{ transform: [{ translateX: translateXValue }] }}>
        {Children.toArray(children)[currentIndex]}
      </Animated.View>
    </View>
  );
};

export default Slides;
