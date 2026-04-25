import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native';
import { useScrollCoordinator, type ScrollToFieldOptions } from './ScrollCoordinatorContext';

export interface ScreenScrollViewProps extends ScrollViewProps {
  scrollSystemId?: string;
  autoRegister?: boolean;
  enabled?: boolean;
  scrollToFocusedInputOffset?: number;
  preventNegativeScrollOffset?: boolean;
  fallbackTopInset?: number;
}

export const ScreenScrollView = forwardRef<ScrollView, ScreenScrollViewProps>(
  function ScreenScrollView(
    {
      autoRegister = true,
      enabled = true,
      fallbackTopInset = 0,
      preventNegativeScrollOffset = true,
      scrollSystemId = 'default-scroll-view',
      scrollToFocusedInputOffset = 24,
      ...rest
    },
    forwardedRef
  ) {
    const localRef = useRef<ScrollView | null>(null);
    const { registerScrollView } = useScrollCoordinator();

    useImperativeHandle(forwardedRef, () => localRef.current as ScrollView, []);

    const defaultScrollToFieldOptions = useMemo<ScrollToFieldOptions>(
      () => ({
        additionalOffset: scrollToFocusedInputOffset,
        preventNegativeScrollOffset
      }),
      [preventNegativeScrollOffset, scrollToFocusedInputOffset]
    );

    useEffect(() => {
      if (!autoRegister) {
        return;
      }

      return registerScrollView({
        id: scrollSystemId,
        ref: localRef,
        enabled: () => enabled,
        defaultScrollToFieldOptions,
        defaultFallbackTopInset: fallbackTopInset
      });
    }, [
      autoRegister,
      defaultScrollToFieldOptions,
      enabled,
      fallbackTopInset,
      registerScrollView,
      scrollSystemId
    ]);

    return <ScrollView ref={localRef} {...rest} />;
  }
);
