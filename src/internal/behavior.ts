import { devWarn } from './dev';

export type KeyboardBehaviorMode = 'padding' | 'margin' | 'none';

const validKeyboardBehaviorModes: KeyboardBehaviorMode[] = [
  'padding',
  'margin',
  'none'
];

export function normalizeKeyboardBehavior(
  value: unknown,
  fallback: KeyboardBehaviorMode
): KeyboardBehaviorMode {
  if (typeof value === 'string' && validKeyboardBehaviorModes.includes(value as KeyboardBehaviorMode)) {
    return value as KeyboardBehaviorMode;
  }

  if (value != null) {
    devWarn(
      `Invalid keyboard behavior "${String(value)}" received. Falling back to "${fallback}".`
    );
  }

  return fallback;
}
