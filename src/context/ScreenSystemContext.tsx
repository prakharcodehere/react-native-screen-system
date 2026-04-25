import React, { createContext, useContext, useMemo } from 'react';
import { FocusControllerProvider } from '../focus/FocusControllerContext';
import { normalizeKeyboardBehavior } from '../internal/behavior';
import { ScrollCoordinatorProvider } from '../scroll/ScrollCoordinatorContext';
import { sanitizeNonNegativeNumber } from '../internal/number';

export interface ScreenSystemConfig {
  keyboardVerticalOffset: number;
  actionBarBottomGap: number;
  defaultKeyboardBehavior: 'padding' | 'margin' | 'none';
  defaultActionBarKeyboardBehavior: 'padding' | 'margin' | 'none';
}

export interface ScreenSystemProviderProps extends Partial<ScreenSystemConfig> {
  children: React.ReactNode;
}

const defaultConfig: ScreenSystemConfig = {
  keyboardVerticalOffset: 0,
  actionBarBottomGap: 12,
  defaultKeyboardBehavior: 'padding',
  defaultActionBarKeyboardBehavior: 'padding'
};

const ScreenSystemContext = createContext<ScreenSystemConfig>(defaultConfig);

export function ScreenSystemProvider({
  children,
  keyboardVerticalOffset = 0,
  actionBarBottomGap = 12,
  defaultKeyboardBehavior = 'padding',
  defaultActionBarKeyboardBehavior = 'padding'
}: ScreenSystemProviderProps) {
  const resolvedKeyboardVerticalOffset = sanitizeNonNegativeNumber(
    keyboardVerticalOffset,
    0
  );
  const resolvedActionBarBottomGap = sanitizeNonNegativeNumber(
    actionBarBottomGap,
    12
  );
  const resolvedDefaultKeyboardBehavior = normalizeKeyboardBehavior(
    defaultKeyboardBehavior,
    'padding'
  );
  const resolvedDefaultActionBarKeyboardBehavior = normalizeKeyboardBehavior(
    defaultActionBarKeyboardBehavior,
    'padding'
  );

  const value = useMemo(
    () => ({
      keyboardVerticalOffset: resolvedKeyboardVerticalOffset,
      actionBarBottomGap: resolvedActionBarBottomGap,
      defaultKeyboardBehavior: resolvedDefaultKeyboardBehavior,
      defaultActionBarKeyboardBehavior: resolvedDefaultActionBarKeyboardBehavior
    }),
    [
      resolvedActionBarBottomGap,
      resolvedDefaultActionBarKeyboardBehavior,
      resolvedDefaultKeyboardBehavior,
      resolvedKeyboardVerticalOffset
    ]
  );

  return (
    <ScreenSystemContext.Provider value={value}>
      <ScrollCoordinatorProvider>
        <FocusControllerProvider>
          {children}
        </FocusControllerProvider>
      </ScrollCoordinatorProvider>
    </ScreenSystemContext.Provider>
  );
}

export function useScreenSystem(): ScreenSystemConfig {
  return useContext(ScreenSystemContext);
}
