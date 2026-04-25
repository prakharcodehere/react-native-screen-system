import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import type { ScrollView } from 'react-native';
import { findNodeHandle, UIManager } from 'react-native';
import { devWarn } from '../internal/dev';
import { sanitizeNonNegativeNumber } from '../internal/number';

export interface ScrollToFieldOptions {
  additionalOffset?: number;
  preventNegativeScrollOffset?: boolean;
}

export interface RegisteredScrollView {
  id: string;
  ref: RefObject<ScrollView | null>;
  enabled?: () => boolean;
  defaultScrollToFieldOptions?: ScrollToFieldOptions;
  defaultFallbackTopInset?: number;
}

export interface ScrollCoordinatorValue {
  registerScrollView: (scrollView: RegisteredScrollView) => () => void;
  scrollToField: (
    fieldRef: RefObject<unknown>,
    options?: ScrollToFieldOptions
  ) => boolean;
}

type ScrollResponderHandle = ScrollView & {
  getScrollResponder?: () => ScrollResponderHandle;
  scrollResponderScrollNativeHandleToKeyboard?: (
    nodeHandle: number,
    additionalOffset?: number,
    preventNegativeScrollOffset?: boolean
  ) => void;
  scrollTo?: (options: { x?: number; y?: number; animated?: boolean }) => void;
};

const ScrollCoordinatorContext = createContext<ScrollCoordinatorValue | null>(null);

function findActiveScrollView(
  scrollViews: Map<string, RegisteredScrollView>
): RegisteredScrollView | undefined {
  const registered = Array.from(scrollViews.values());

  for (let index = registered.length - 1; index >= 0; index -= 1) {
    const scrollView = registered[index];
    const isEnabled = scrollView.enabled?.() ?? true;
    if (isEnabled && scrollView.ref.current) {
      return scrollView;
    }
  }

  return undefined;
}

export function ScrollCoordinatorProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const scrollViewsRef = useRef<Map<string, RegisteredScrollView>>(new Map());

  const registerScrollView = useCallback((scrollView: RegisteredScrollView) => {
    if (!scrollView.id) {
      devWarn('registerScrollView called without a valid scroll view id.');
    }

    if (scrollViewsRef.current.has(scrollView.id)) {
      devWarn(
        `A scroll view with id "${scrollView.id}" is already registered. The latest registration will replace the previous one.`
      );
    }

    scrollViewsRef.current.set(scrollView.id, scrollView);

    return () => {
      scrollViewsRef.current.delete(scrollView.id);
    };
  }, []);

  const scrollToField = useCallback(
    (fieldRef: RefObject<unknown>, options?: ScrollToFieldOptions) => {
      if (!fieldRef.current) {
        return false;
      }

      const activeScrollView = findActiveScrollView(scrollViewsRef.current);
      const fieldHandle = findNodeHandle(fieldRef.current as React.Component | null);
      const scrollRef = activeScrollView?.ref.current as ScrollResponderHandle | null;

      if (!activeScrollView || !fieldHandle || !scrollRef) {
        return false;
      }

      const resolvedOptions = {
        additionalOffset:
          options?.additionalOffset ??
          activeScrollView.defaultScrollToFieldOptions?.additionalOffset ??
          24,
        preventNegativeScrollOffset:
          options?.preventNegativeScrollOffset ??
          activeScrollView.defaultScrollToFieldOptions?.preventNegativeScrollOffset ??
          true
      };

      const responder = (scrollRef.getScrollResponder?.() as ScrollResponderHandle | undefined) ?? scrollRef;
      const scrollNativeHandleToKeyboard =
        responder.scrollResponderScrollNativeHandleToKeyboard;

      if (scrollNativeHandleToKeyboard) {
        scrollNativeHandleToKeyboard(
          fieldHandle,
          resolvedOptions.additionalOffset,
          resolvedOptions.preventNegativeScrollOffset
        );

        return true;
      }

      const scrollHandle = findNodeHandle(scrollRef);
      if (!scrollHandle || !responder.scrollTo) {
        return false;
      }

      UIManager.measureLayout(
        fieldHandle,
        scrollHandle,
        () => {
          devWarn('Failed to measure field position for scroll fallback.');
        },
        (_x, y) => {
          const fallbackTopInset = sanitizeNonNegativeNumber(
            activeScrollView.defaultFallbackTopInset,
            0
          );
          const targetY =
            y -
            sanitizeNonNegativeNumber(resolvedOptions.additionalOffset, 24) -
            fallbackTopInset;

          responder.scrollTo?.({
            x: 0,
            y: resolvedOptions.preventNegativeScrollOffset
              ? Math.max(targetY, 0)
              : targetY,
            animated: true
          });
        }
      );

      return true;
    },
    []
  );

  const value = useMemo<ScrollCoordinatorValue>(
    () => ({
      registerScrollView,
      scrollToField
    }),
    [registerScrollView, scrollToField]
  );

  return (
    <ScrollCoordinatorContext.Provider value={value}>
      {children}
    </ScrollCoordinatorContext.Provider>
  );
}

export function useScrollCoordinator(): ScrollCoordinatorValue {
  const value = useContext(ScrollCoordinatorContext);

  if (!value) {
    throw new Error('useScrollCoordinator must be used inside ScreenSystemProvider.');
  }

  return value;
}
