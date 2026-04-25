import React from 'react';
import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScreenSystem } from '../context/ScreenSystemContext';
import { normalizeKeyboardBehavior } from '../internal/behavior';
import { sanitizeNonNegativeNumber } from '../internal/number';
import { useKeyboardInsets } from '../keyboard/useKeyboardInsets';

export interface StickyActionBarProps extends ViewProps {
  keyboardAware?: boolean;
  keyboardBehavior?: 'padding' | 'margin' | 'none';
  safeAreaAware?: boolean;
  keyboardVerticalOffset?: number;
  keyboardInsetOverride?: number;
  safeAreaInsetOverride?: number;
  divider?: boolean;
  dividerColor?: string;
  bottomOffset?: number;
}

export function StickyActionBar({
  children,
  style,
  keyboardAware = true,
  keyboardBehavior,
  safeAreaAware = true,
  keyboardVerticalOffset,
  keyboardInsetOverride,
  safeAreaInsetOverride,
  divider = false,
  dividerColor = '#D1D5DB',
  bottomOffset,
  ...rest
}: StickyActionBarProps) {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardInsets();
  const system = useScreenSystem();

  const resolvedBottomOffset = sanitizeNonNegativeNumber(
    bottomOffset,
    system.actionBarBottomGap
  );
  const resolvedKeyboardBehavior = normalizeKeyboardBehavior(
    keyboardBehavior,
    system.defaultActionBarKeyboardBehavior
  );
  const resolvedKeyboardVerticalOffset = sanitizeNonNegativeNumber(
    keyboardVerticalOffset,
    system.keyboardVerticalOffset
  );
  const safeAreaInset = safeAreaAware
    ? sanitizeNonNegativeNumber(safeAreaInsetOverride, insets.bottom)
    : 0;
  const keyboardInset = keyboardAware
    ? Math.max(
        sanitizeNonNegativeNumber(keyboardInsetOverride, keyboard.bottom) -
          resolvedKeyboardVerticalOffset,
        0
      )
    : 0;
  const bottomSpacing = safeAreaInset + resolvedBottomOffset;

  return (
    <View
      {...rest}
      style={[
        styles.base,
        divider ? [styles.divider, { borderTopColor: dividerColor }] : null,
        {
          paddingBottom:
            bottomSpacing +
            (resolvedKeyboardBehavior === 'padding' ? keyboardInset : 0),
          marginBottom:
            resolvedKeyboardBehavior === 'margin' ? keyboardInset : 0
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%'
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
