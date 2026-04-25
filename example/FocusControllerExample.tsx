import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  ScreenContainer,
  ScreenScrollView,
  StickyActionBar,
  useFocusController,
  useFocusableField
} from '../src';
import {
  ActionButton,
  ExampleHeader,
  ExampleSection,
  exampleStyles
} from './ExamplePrimitives';

export function FocusControllerExample({
  onBack
}: {
  onBack: () => void;
}) {
  const [missingEmail, setMissingEmail] = useState(true);
  const [missingPostalCode, setMissingPostalCode] = useState(true);

  const firstName = useFocusableField({
    id: 'firstName',
    order: 1,
    submitBehavior: 'next'
  });
  const lastName = useFocusableField({
    id: 'lastName',
    order: 2,
    submitBehavior: 'next'
  });
  const email = useFocusableField({
    id: 'email',
    order: 3,
    submitBehavior: 'next'
  });
  const postalCode = useFocusableField({
    id: 'postalCode',
    order: 4,
    submitBehavior: 'blur'
  });

  const focusController = useFocusController();

  const invalidIds = useMemo(() => {
    const ids: string[] = [];
    if (missingEmail) {
      ids.push('email');
    }
    if (missingPostalCode) {
      ids.push('postalCode');
    }
    return ids;
  }, [missingEmail, missingPostalCode]);

  return (
    <ScreenContainer
      keyboardAware
      includeTopInset
      includeBottomInset
      style={exampleStyles.screen}
    >
      <ScreenScrollView contentContainerStyle={exampleStyles.scrollContent}>
        <ExampleHeader
          title="Focus Controller"
          description="This demo uses useFocusController directly for imperative focus commands on top of useFocusableField registration."
          onBack={onBack}
        />

        <ExampleSection title="Manual Validation Targets">
          <View style={styles.toggleRow}>
            <ActionButton
              label={missingEmail ? 'Email Missing' : 'Email Valid'}
              onPress={() => setMissingEmail((value) => !value)}
              variant={missingEmail ? 'secondary' : 'ghost'}
            />
            <ActionButton
              label={missingPostalCode ? 'Postal Missing' : 'Postal Valid'}
              onPress={() => setMissingPostalCode((value) => !value)}
              variant={missingPostalCode ? 'secondary' : 'ghost'}
            />
          </View>
          <Text style={exampleStyles.helperText}>
            focusFirstInvalid will target: {invalidIds.length > 0 ? invalidIds.join(', ') : 'none'}
          </Text>
        </ExampleSection>

        <ExampleSection title="Fields">
          <TextInput
            ref={firstName.ref}
            placeholder="First name"
            returnKeyType="next"
            style={exampleStyles.input}
            onFocus={firstName.onFocus}
            onSubmitEditing={firstName.onSubmitEditing}
          />
          <TextInput
            ref={lastName.ref}
            placeholder="Last name"
            returnKeyType="next"
            style={exampleStyles.input}
            onFocus={lastName.onFocus}
            onSubmitEditing={lastName.onSubmitEditing}
          />
          <TextInput
            ref={email.ref}
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              exampleStyles.input,
              missingEmail ? styles.invalidInput : null
            ]}
            onFocus={email.onFocus}
            onSubmitEditing={email.onSubmitEditing}
          />
          <TextInput
            ref={postalCode.ref}
            placeholder="Postal code"
            returnKeyType="done"
            style={[
              exampleStyles.input,
              missingPostalCode ? styles.invalidInput : null
            ]}
            onFocus={postalCode.onFocus}
            onSubmitEditing={postalCode.onSubmitEditing}
          />
        </ExampleSection>
      </ScreenScrollView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <View style={exampleStyles.actionBarRow}>
          <ActionButton label="Focus Email" onPress={() => focusController.focusField('email')} />
          <ActionButton
            label="Next After Email"
            onPress={() => focusController.focusNext('email')}
            variant="ghost"
          />
          <ActionButton
            label="Previous From Email"
            onPress={() => focusController.focusPrevious('email')}
            variant="ghost"
          />
          <ActionButton
            label="Focus First Invalid"
            onPress={() => focusController.focusFirstInvalid(invalidIds)}
            variant="secondary"
          />
        </View>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  invalidInput: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2'
  }
});
