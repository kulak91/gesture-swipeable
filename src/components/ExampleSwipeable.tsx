import React, { useRef } from 'react';
import { Text, Animated, StyleSheet, View } from 'react-native';

import {
  Swipeable,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('[R] showLeftProgress:', prog.value);
    console.log('[R] appliedTranslation:', drag.value);

    return {
      transform: [{ translateX: drag.value - 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.leftAction}>Text</Text>
    </Reanimated.View>
  );
}

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('[R] showRightProgress:', prog.value);
    console.log('[R] appliedTranslation:', drag.value);

    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.rightAction}>Text</Text>
    </Reanimated.View>
  );
}

function LegacyLeftAction(prog: any, drag: any) {
  prog.addListener((value: any) => {
    console.log('[L] showLeftProgress:', value.value);
  });
  drag.addListener((value: any) => {
    console.log('[L] appliedTranslation:', value.value);
  });

  const trans = Animated.subtract(drag, 50);

  return (
    <Animated.Text
      style={[
        styles.leftAction,
        {
          transform: [{ translateX: trans }],
        },
      ]}>
      Text
    </Animated.Text>
  );
}

function LegacyRightAction(prog: any, drag: any) {
  prog.addListener((value: any) => {
    console.log('[L] showRightProgress:', value.value);
  });
  drag.addListener((value: any) => {
    console.log('[L] appliedTranslation:', value.value);
  });

  const trans = Animated.add(drag, 50);

  return (
    <Animated.Text
      style={[
        styles.rightAction,
        {
          transform: [{ translateX: trans }],
        },
      ]}>
      Text
    </Animated.Text>
  );
}

export function LegacySwipable() {
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const legacyRef = useRef<Swipeable>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.separator} />

      <View style={styles.controlPanelWrapper}>
        <Text>Programatical controls</Text>
        <View style={styles.controlPanel}>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.openLeft();
              legacyRef.current?.openLeft();
            }}>
            <Text>open left</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.close();
              legacyRef.current!.close();
            }}>
            <Text>close</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.reset();
              legacyRef.current!.reset();
            }}>
            <Text>reset</Text>
          </Pressable>
          <Pressable
            style={styles.control}
            onPress={() => {
              reanimatedRef.current!.openRight();
              legacyRef.current!.openRight();
            }}>
            <Text>open right</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.separator} />

      <ReanimatedSwipeable
        ref={reanimatedRef}
        containerStyle={styles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={LeftAction}
        renderRightActions={RightAction}>
        <Text>[Reanimated] Swipe me!</Text>
      </ReanimatedSwipeable>

      <View style={styles.separator} />

      <Swipeable
        ref={legacyRef}
        containerStyle={styles.swipeable}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderLeftActions={LegacyLeftAction}
        renderRightActions={LegacyRightAction}>
        <Text>[Legacy] Swipe me!</Text>
      </Swipeable>

      <View style={styles.separator} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAction: { width: 50, height: 50, backgroundColor: 'crimson' },
  rightAction: { width: 50, height: 50, backgroundColor: 'purple' },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  controlPanelWrapper: {
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlPanel: {
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    flex: 1,
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});