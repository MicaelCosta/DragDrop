/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {StyleSheet, PanResponder, Animated} from 'react-native';

const Draggable = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const [showDraggable, setShowDraggable] = useState(true);
  const [opacity] = useState(new Animated.Value(1));

  function isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
          if (isDropArea(gesture)) {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }).start(() =>
                setShowDraggable(false)
            );
          }
      },
    }),
  ).current;

    if (!showDraggable) {return null;}

  return (

    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
        styles.circle,
      ]}
    />

  );
};

let CIRCLE_RADIUS = 30;

let styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default Draggable;
