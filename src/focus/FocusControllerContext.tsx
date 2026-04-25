import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import type { TextInput } from 'react-native';
import { devWarn } from '../internal/dev';

export interface RegisteredFocusField {
  id: string;
  order: number;
  ref: RefObject<TextInput | null>;
  disabled?: () => boolean;
}

export interface FocusControllerValue {
  registerField: (field: RegisteredFocusField) => () => void;
  focusField: (id: string) => boolean;
  focusNext: (currentId: string) => boolean;
  focusPrevious: (currentId: string) => boolean;
  focusFirstInvalid: (invalidIds: string[]) => boolean;
}

const FocusControllerContext = createContext<FocusControllerValue | null>(null);

function sortFields(fields: RegisteredFocusField[]) {
  return [...fields].sort((left, right) => {
    if (left.order === right.order) {
      return left.id.localeCompare(right.id);
    }

    return left.order - right.order;
  });
}

function canFocus(field: RegisteredFocusField | undefined): field is RegisteredFocusField {
  if (!field?.ref.current) {
    return false;
  }

  return !(field.disabled?.() ?? false);
}

export function FocusControllerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const fieldsRef = useRef<Map<string, RegisteredFocusField>>(new Map());

  const registerField = useCallback((field: RegisteredFocusField) => {
    if (!field.id) {
      devWarn('registerField called without a valid field id.');
    }

    if (fieldsRef.current.has(field.id)) {
      devWarn(`A focus field with id "${field.id}" is already registered. The latest registration will replace the previous one.`);
    }

    fieldsRef.current.set(field.id, field);

    return () => {
      fieldsRef.current.delete(field.id);
    };
  }, []);

  const focusField = useCallback((id: string) => {
    if (!id) {
      return false;
    }

    const field = fieldsRef.current.get(id);
    if (!canFocus(field)) {
      return false;
    }

    field.ref.current!.focus();
    return true;
  }, []);

  const focusRelative = useCallback((currentId: string, step: 1 | -1) => {
    if (!currentId) {
      return false;
    }

    const fields = sortFields(Array.from(fieldsRef.current.values()));
    const currentIndex = fields.findIndex((field) => field.id === currentId);

    if (currentIndex === -1) {
      return false;
    }

    for (
      let index = currentIndex + step;
      index >= 0 && index < fields.length;
      index += step
    ) {
      const field = fields[index];
      if (!canFocus(field)) {
        continue;
      }

      field.ref.current!.focus();
      return true;
    }

    return false;
  }, []);

  const focusNext = useCallback(
    (currentId: string) => focusRelative(currentId, 1),
    [focusRelative]
  );

  const focusPrevious = useCallback(
    (currentId: string) => focusRelative(currentId, -1),
    [focusRelative]
  );

  const focusFirstInvalid = useCallback(
    (invalidIds: string[]) => {
      for (const id of invalidIds) {
        if (focusField(id)) {
          return true;
        }
      }

      return false;
    },
    [focusField]
  );

  const value = useMemo<FocusControllerValue>(
    () => ({
      registerField,
      focusField,
      focusNext,
      focusPrevious,
      focusFirstInvalid
    }),
    [focusField, focusFirstInvalid, focusNext, focusPrevious, registerField]
  );

  return (
    <FocusControllerContext.Provider value={value}>
      {children}
    </FocusControllerContext.Provider>
  );
}

export function useFocusController(): FocusControllerValue {
  const value = useContext(FocusControllerContext);

  if (!value) {
    throw new Error('useFocusController must be used inside ScreenSystemProvider.');
  }

  return value;
}
