import React from 'react';
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
  useFocusableField
} from '../src';
import {
  ActionButton,
  ExampleHeader,
  ExampleSection,
  exampleStyles
} from './ExamplePrimitives';

export function FormFlowExample({
  onBack
}: {
  onBack: () => void;
}) {
  const fullName = useFocusableField({
    id: 'fullName',
    order: 1,
    submitBehavior: 'next'
  });
  const email = useFocusableField({
    id: 'email',
    order: 2,
    submitBehavior: 'next'
  });
  const phone = useFocusableField({
    id: 'phone',
    order: 3,
    targetId: 'password',
    submitBehavior: 'target'
  });
  const password = useFocusableField({
    id: 'password',
    order: 4,
    previousId: 'phone',
    submitBehavior: 'blur'
  });

  return (
    <ScreenContainer
      keyboardAware
      includeTopInset
      includeBottomInset
      style={exampleStyles.screen}
    >
      <ScreenScrollView
        scrollSystemId="form-flow"
        contentContainerStyle={exampleStyles.scrollContent}
        scrollToFocusedInputOffset={36}
        fallbackTopInset={20}
      >
        <ExampleHeader
          title="Form Flow"
          description="Shows a realistic form using ScreenScrollView plus useFocusableField to handle submit navigation and auto-scroll."
          onBack={onBack}
        />

        <ExampleSection title="Inputs">
          <View>
            <Text style={exampleStyles.label}>Full name</Text>
            <TextInput
              ref={fullName.ref}
              placeholder="Taylor Reed"
              returnKeyType="next"
              style={exampleStyles.input}
              onFocus={fullName.onFocus}
              onSubmitEditing={fullName.onSubmitEditing}
            />
          </View>

          <View>
            <Text style={exampleStyles.label}>Email</Text>
            <TextInput
              ref={email.ref}
              placeholder="taylor@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              style={exampleStyles.input}
              onFocus={email.onFocus}
              onSubmitEditing={email.onSubmitEditing}
            />
          </View>

          <View>
            <Text style={exampleStyles.label}>Phone</Text>
            <TextInput
              ref={phone.ref}
              placeholder="+1 555 123 4567"
              keyboardType="phone-pad"
              returnKeyType="next"
              style={exampleStyles.input}
              onFocus={phone.onFocus}
              onSubmitEditing={phone.onSubmitEditing}
            />
          </View>

          <View>
            <Text style={exampleStyles.label}>Password</Text>
            <TextInput
              ref={password.ref}
              placeholder="Create password"
              secureTextEntry
              returnKeyType="done"
              style={exampleStyles.input}
              onFocus={password.onFocus}
              onSubmitEditing={password.onSubmitEditing}
            />
          </View>
        </ExampleSection>

        <ExampleSection title="Hook Behaviors In This Demo">
          <View style={styles.behaviorCard}>
            <Text style={styles.behaviorText}>
              fullName and email submit to the next field automatically.
            </Text>
            <Text style={styles.behaviorText}>
              phone uses submitBehavior="target" and jumps directly to password.
            </Text>
            <Text style={styles.behaviorText}>
              password uses blur behavior for the last step.
            </Text>
          </View>
        </ExampleSection>

        <View style={exampleStyles.spacer} />
      </ScreenScrollView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <View style={exampleStyles.actionBarRow}>
          <ActionButton label="Focus Email" onPress={email.focusSelf} variant="ghost" />
          <ActionButton label="Focus Previous" onPress={password.focusPrevious} variant="ghost" />
          <ActionButton label="Create Account" onPress={() => {}} />
        </View>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  behaviorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  behaviorText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155'
  }
});
