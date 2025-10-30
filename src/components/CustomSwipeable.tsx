import React, { FC, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export const CustomSwipeable: FC= ({ }) => {

    const renderRightActions = useCallback((
      _progress: SharedValue<number>,
      dragX: SharedValue<number>
    ) => {
      const animatedStyle = useAnimatedStyle(() => {
        const dragAmount = Math.abs(dragX.value);
        // Stretch with drag, minimum 80px, no maximum
        const width = Math.max(80, dragAmount);

        console.log('_progress.value', _progress.value);

        return {
          width,
        };
      });

      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Reanimated.View
            style={[
              {
                flex: 1,
                borderLeftWidth: 1,
                borderStyle: 'solid',
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              },
              animatedStyle,
            ]}
          >
          </Reanimated.View>
        </View>
      );
    }, []);

    const panGesture = Gesture.Pan();

    return (
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Swipeable
            renderRightActions={renderRightActions}
            rightThreshold={40}
            enableTrackpadTwoFingerGesture
            animationOptions={{ 
              velocity: 1,
            }}
            simultaneousWithExternalGesture={panGesture}
          >
            <View style={{ padding: 20, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
              <Text>Swipe me left!</Text>
            </View>
          </Swipeable>
        </GestureDetector>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
