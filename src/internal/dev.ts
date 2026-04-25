export function devWarn(message: string) {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.warn(`[react-native-screen-system] ${message}`);
  }
}
