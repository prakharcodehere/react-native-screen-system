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
  useKeyboardInsets,
  useFocusableField
} from '../src';
import {
  ExampleHeader,
  ExampleSection,
  InfoCard,
  exampleStyles
} from './ExamplePrimitives';

export function KeyboardInsetsExample({
  onBack
}: {
  onBack: () => void;
}) {
  const keyboard = useKeyboardInsets();
  const message = useFocusableField({
    id: 'message',
    order: 1,
    submitBehavior: 'next'
  });
  const reply = useFocusableField({
    id: 'reply',
    order: 2,
    submitBehavior: 'blur'
  });

  return (
    <ScreenContainer
      keyboardAware
      keyboardInsetAdjustment={12}
      includeTopInset
      includeBottomInset
      style={exampleStyles.screen}
    >
      <ScreenScrollView
        contentContainerStyle={exampleStyles.scrollContent}
        scrollToFocusedInputOffset={40}
      >
        <ExampleHeader
          title="Keyboard Insets"
          description="Open the keyboard and watch the hook values update while ScreenContainer keeps the lower content visible."
          onBack={onBack}
        />

        <ExampleSection title="Live Keyboard Metrics">
          <InfoCard label="visible" value={String(keyboard.visible)} />
          <InfoCard label="keyboardHeight" value={`${keyboard.keyboardHeight}px`} />
          <InfoCard label="bottom inset" value={`${keyboard.bottom}px`} />
          <InfoCard
            label="animationDuration"
            value={`${keyboard.animationDuration}ms`}
          />
        </ExampleSection>

        <View style={styles.fillerCard}>
          <Text style={styles.fillerTitle}>Scroll down to the composer</Text>
          <Text style={styles.fillerBody}>
            The inputs are intentionally near the bottom so you can see both the
            hook data and the keyboard-aware spacing behavior at the same time.
          </Text>
        </View>

        <View style={styles.largeSpacer} />

        <ExampleSection title="Composer">
          <TextInput
            ref={message.ref}
            placeholder="Message"
            style={exampleStyles.input}
            onFocus={message.onFocus}
            onSubmitEditing={message.onSubmitEditing}
          />
          <TextInput
            ref={reply.ref}
            placeholder="Quick reply"
            style={exampleStyles.input}
            onFocus={reply.onFocus}
            onSubmitEditing={reply.onSubmitEditing}
          />
        </ExampleSection>
      </ScreenScrollView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <Text style={styles.actionHint}>
          useKeyboardInsets reports the raw keyboard values. ScreenContainer and
          StickyActionBar consume those values to keep the layout usable.
        </Text>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fillerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  fillerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  fillerBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569'
  },
  largeSpacer: {
    height: 280
  },
  actionHint: {
    fontSize: 13,
    lineHeight: 18,
    color: '#475569'
  }
});
