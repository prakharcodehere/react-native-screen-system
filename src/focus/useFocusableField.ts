import { useCallback, useEffect, useRef } from 'react';
import type { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import { useFocusController } from './FocusControllerContext';
import { devWarn } from '../internal/dev';
import { useScrollCoordinator } from '../scroll/ScrollCoordinatorContext';

export interface UseFocusableFieldOptions {
  id: string;
  order: number;
  nextId?: string;
  previousId?: string;
  targetId?: string;
  disabled?: boolean;
  blurOnSubmit?: boolean;
  submitBehavior?: 'next' | 'previous' | 'target' | 'blur' | 'none';
  autoScrollOnFocus?: boolean;
  scrollToFocusedInputOffset?: number;
  preventNegativeScrollOffset?: boolean;
  onFocus?: () => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

export interface UseFocusableFieldResult {
  ref: React.RefObject<TextInput | null>;
  onFocus: () => void;
  onSubmitEditing: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  focusNext: () => boolean;
  focusPrevious: () => boolean;
  focusSelf: () => boolean;
}

export function useFocusableField({
  id,
  order,
  nextId,
  previousId,
  targetId,
  disabled = false,
  blurOnSubmit = false,
  submitBehavior,
  autoScrollOnFocus = true,
  scrollToFocusedInputOffset,
  preventNegativeScrollOffset,
  onFocus,
  onSubmitEditing
}: UseFocusableFieldOptions): UseFocusableFieldResult {
  const ref = useRef<TextInput | null>(null);
  const { registerField, focusField, focusNext, focusPrevious } = useFocusController();
  const { scrollToField } = useScrollCoordinator();

  useEffect(() => {
    if (!id) {
      devWarn('useFocusableField requires a non-empty "id".');
    }

    if (submitBehavior === 'target' && !(targetId || nextId)) {
      devWarn(
        `Field "${id}" uses submitBehavior="target" but does not provide targetId or nextId.`
      );
    }
  }, [id, nextId, submitBehavior, targetId]);

  useEffect(() => {
    return registerField({
      id,
      order,
      ref,
      disabled: () => disabled
    });
  }, [disabled, id, order, registerField]);

  const handleFocus = useCallback(() => {
    onFocus?.();

    if (!autoScrollOnFocus) {
      return;
    }

    scrollToField(ref, {
      additionalOffset: scrollToFocusedInputOffset,
      preventNegativeScrollOffset
    });
  }, [
    autoScrollOnFocus,
    onFocus,
    preventNegativeScrollOffset,
    scrollToField,
    scrollToFocusedInputOffset
  ]);

  const handleSubmitEditing = useCallback(
    (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmitEditing?.(event);

      const resolvedSubmitBehavior =
        submitBehavior ??
        (targetId || nextId
          ? 'target'
          : previousId
            ? 'previous'
            : blurOnSubmit
              ? 'blur'
              : 'next');

      switch (resolvedSubmitBehavior) {
        case 'target':
          if (targetId || nextId) {
            focusField(targetId ?? nextId ?? id);
            return;
          }
          return;
        case 'previous':
          if (previousId) {
            focusField(previousId);
            return;
          }
          focusPrevious(id);
          return;
        case 'blur':
          ref.current?.blur();
          return;
        case 'none':
          return;
        case 'next':
        default:
          focusNext(id);
      }
    },
    [
      blurOnSubmit,
      focusField,
      focusNext,
      focusPrevious,
      id,
      nextId,
      onSubmitEditing,
      previousId,
      submitBehavior,
      targetId
    ]
  );

  return {
    ref,
    onFocus: handleFocus,
    onSubmitEditing: handleSubmitEditing,
    focusNext: () => focusNext(id),
    focusPrevious: () => focusPrevious(id),
    focusSelf: () => focusField(id)
  };
}
