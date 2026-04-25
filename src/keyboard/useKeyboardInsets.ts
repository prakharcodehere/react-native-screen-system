import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface KeyboardInsetsState {
  visible: boolean;
  keyboardHeight: number;
  bottom: number;
  animationDuration: number;
}

const initialState: KeyboardInsetsState = {
  visible: false,
  keyboardHeight: 0,
  bottom: 0,
  animationDuration: 0
};

export function useKeyboardInsets(): KeyboardInsetsState {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<KeyboardInsetsState>(initialState);

  useEffect(() => {
    const updateFromEvent = (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      const bottom = Math.max(keyboardHeight - insets.bottom, 0);

      setState({
        visible: true,
        keyboardHeight,
        bottom,
        animationDuration: event.duration ?? 0
      });
    };

    const reset = () => {
      setState(initialState);
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const changeFrameEvent =
      Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const subscriptions = [
      Keyboard.addListener(showEvent, updateFromEvent),
      Keyboard.addListener(changeFrameEvent, updateFromEvent),
      Keyboard.addListener(hideEvent, reset)
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, [insets.bottom]);

  return state;
}
