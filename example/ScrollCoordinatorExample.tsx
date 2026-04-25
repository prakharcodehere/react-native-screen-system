import React, { useRef } from 'react';
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
  useScrollCoordinator
} from '../src';
import {
  ActionButton,
  ExampleHeader,
  ExampleSection,
  exampleStyles
} from './ExamplePrimitives';

export function ScrollCoordinatorExample({
  onBack
}: {
  onBack: () => void;
}) {
  const promoCodeRef = useRef<TextInput | null>(null);
  const notesRef = useRef<TextInput | null>(null);
  const { scrollToField } = useScrollCoordinator();

  return (
    <ScreenContainer
      keyboardAware
      includeTopInset
      includeBottomInset
      style={exampleStyles.screen}
    >
      <ScreenScrollView
        scrollSystemId="manual-scroll-demo"
        contentContainerStyle={exampleStyles.scrollContent}
        fallbackTopInset={24}
        scrollToFocusedInputOffset={48}
      >
        <ExampleHeader
          title="Scroll Coordinator"
          description="Demonstrates manual scrolling to fields through useScrollCoordinator while ScreenScrollView handles registration."
          onBack={onBack}
        />

        <ExampleSection title="How It Works">
          <View style={styles.noteBlock}>
            <Text style={styles.noteText}>
              Press the action buttons below to scroll to hidden inputs, even if
              they are far down the content.
            </Text>
          </View>
        </ExampleSection>

        {Array.from({ length: 8 }, (_, index) => (
          <View key={index} style={styles.storyCard}>
            <Text style={styles.storyTitle}>Content block {index + 1}</Text>
            <Text style={styles.storyBody}>
              This filler section exists to push the target fields deeper into the
              scroll view so the coordinator has real work to do.
            </Text>
          </View>
        ))}

        <ExampleSection title="Target Fields">
          <TextInput
            ref={promoCodeRef}
            placeholder="Promo code"
            style={exampleStyles.input}
          />
          <TextInput
            ref={notesRef}
            placeholder="Delivery notes"
            multiline
            style={[exampleStyles.input, styles.notesInput]}
          />
        </ExampleSection>

        <View style={exampleStyles.spacer} />
      </ScreenScrollView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <View style={exampleStyles.actionBarRow}>
          <ActionButton
            label="Scroll to Promo"
            onPress={() =>
              scrollToField(promoCodeRef, {
                additionalOffset: 56,
                preventNegativeScrollOffset: true
              })
            }
          />
          <ActionButton
            label="Scroll to Notes"
            onPress={() =>
              scrollToField(notesRef, {
                additionalOffset: 24,
                preventNegativeScrollOffset: false
              })
            }
            variant="secondary"
          />
        </View>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  noteBlock: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155'
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  storyBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569'
  },
  notesInput: {
    minHeight: 120,
    textAlignVertical: 'top'
  }
});
