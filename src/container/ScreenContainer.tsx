import React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScreenSystem } from '../context/ScreenSystemContext';
import { normalizeKeyboardBehavior } from '../internal/behavior';
import { sanitizeNonNegativeNumber, sanitizeNumber } from '../internal/number';
import { useKeyboardInsets } from '../keyboard/useKeyboardInsets';

export interface ScreenContainerProps extends ViewProps {
  keyboardAware?: boolean;
  keyboardBehavior?: 'padding' | 'margin' | 'none';
  keyboardVerticalOffset?: number;
  keyboardInsetOverride?: number;
  keyboardInsetAdjustment?: number;
  includeTopInset?: boolean;
  includeBottomInset?: boolean;
  topInsetOverride?: number;
  bottomInsetOverride?: number;
  extraTopInset?: number;
  extraBottomInset?: number;
}

export function ScreenContainer({
  children,
  style,
  keyboardAware = false,
  keyboardBehavior,
  keyboardVerticalOffset,
  keyboardInsetOverride,
  keyboardInsetAdjustment = 0,
  includeTopInset = false,
  includeBottomInset = true,
  topInsetOverride,
  bottomInsetOverride,
  extraTopInset = 0,
  extraBottomInset = 0,
  ...rest
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardInsets();
  const system = useScreenSystem();

  const resolvedKeyboardBehavior = normalizeKeyboardBehavior(
    keyboardBehavior,
    system.defaultKeyboardBehavior
  );
  const resolvedKeyboardVerticalOffset = sanitizeNonNegativeNumber(
    keyboardVerticalOffset,
    system.keyboardVerticalOffset
  );
  const resolvedKeyboardInset = sanitizeNonNegativeNumber(
    keyboardInsetOverride,
    keyboard.bottom
  );
  const resolvedKeyboardInsetAdjustment = sanitizeNumber(
    keyboardInsetAdjustment,
    0
  );

  const keyboardBottomInset = keyboardAware
    ? Math.max(
        resolvedKeyboardInset -
          resolvedKeyboardVerticalOffset +
          resolvedKeyboardInsetAdjustment,
        0
      )
    : 0;

  const topInset = sanitizeNonNegativeNumber(
    (includeTopInset ? topInsetOverride ?? insets.top : 0) + extraTopInset,
    0
  );
  const bottomInset =
    sanitizeNonNegativeNumber(
      (includeBottomInset ? bottomInsetOverride ?? insets.bottom : 0) +
        extraBottomInset,
      0
    );

  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          paddingTop: topInset,
          paddingBottom:
            bottomInset +
            (resolvedKeyboardBehavior === 'padding' ? keyboardBottomInset : 0),
          marginBottom:
            resolvedKeyboardBehavior === 'margin' ? keyboardBottomInset : 0
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
