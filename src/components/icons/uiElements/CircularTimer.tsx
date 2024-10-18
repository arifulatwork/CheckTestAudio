import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Text, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

// @ts-ignore
const CircularTimer = ({ totalTime, isPlaying, onTimerEnd }) => {
  const animatedValue = useRef(new Animated.Value(totalTime)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [countdown, setCountdown] = useState(totalTime);
  const [isFinished, setIsFinished] = useState(false);

  const radius = 40;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    animatedValue.addListener(({ value }) => {
      setCountdown(Math.ceil(value));
      if (Math.ceil(value) === 0) {
        setIsFinished(true);
        if (onTimerEnd) {
          onTimerEnd();
        }
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [onTimerEnd]);

  useEffect(() => {
    if (isPlaying) {
      setIsFinished(false); // Reset the finished state
      animationRef.current = Animated.timing(animatedValue, {
        toValue: 0,
        duration: countdown * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      });
      animationRef.current.start(() => {
        if (countdown === 0) {
          setIsFinished(true);
          if (onTimerEnd) {
            onTimerEnd();
          }
        }
      });
    } else {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isPlaying]);

  const animatedStroke = animatedValue.interpolate({
    inputRange: [0, totalTime],
    outputRange: [0, circumference],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke="#5F29C4"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={animatedStroke}
        />
        <Text style={styles.timerText}>{isFinished ? '0' : countdown}</Text>
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 225,
    left: 125,
  },
  timerText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5F29C4',
    position: 'absolute',
    top: 40,
    left: 40,
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});

export default CircularTimer;
