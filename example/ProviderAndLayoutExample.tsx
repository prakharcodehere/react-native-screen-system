import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ScreenContainer,
  ScreenScrollView,
  StickyActionBar,
  useScreenSystem
} from '../src';
import {
  ExampleHeader,
  ExampleSection,
  InfoCard,
  exampleStyles
} from './ExamplePrimitives';

export function ProviderAndLayoutExample({
  onBack
}: {
  onBack: () => void;
}) {
  const system = useScreenSystem();

  return (
    <ScreenContainer
      includeTopInset
      includeBottomInset
      extraTopInset={12}
      extraBottomInset={12}
      style={[exampleStyles.screen, styles.screen]}
    >
      <ScreenScrollView contentContainerStyle={exampleStyles.scrollContent}>
        <ExampleHeader
          title="Provider and Layout"
          description="Reads app-level defaults from useScreenSystem and shows how ScreenContainer and StickyActionBar consume those defaults."
          onBack={onBack}
        />

        <ExampleSection title="Resolved Provider Config">
          <InfoCard
            label="keyboardVerticalOffset"
            value={String(system.keyboardVerticalOffset)}
          />
          <InfoCard
            label="actionBarBottomGap"
            value={String(system.actionBarBottomGap)}
          />
          <InfoCard
            label="defaultKeyboardBehavior"
            value={system.defaultKeyboardBehavior}
          />
          <InfoCard
            label="defaultActionBarKeyboardBehavior"
            value={system.defaultActionBarKeyboardBehavior}
          />
        </ExampleSection>

        <ExampleSection title="What This Screen Uses">
          <View style={styles.listCard}>
            <Text style={styles.listItem}>
              ScreenContainer is applying top and bottom safe-area spacing.
            </Text>
            <Text style={styles.listItem}>
              extraTopInset and extraBottomInset add screen-specific breathing room.
            </Text>
            <Text style={styles.listItem}>
              StickyActionBar falls back to the provider bottom gap unless you override it.
            </Text>
            <Text style={styles.listItem}>
              The plain style prop still controls colors and layout visuals.
            </Text>
          </View>
        </ExampleSection>

        <ExampleSection title="Layout Preview">
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Top content block</Text>
            <Text style={styles.previewBody}>
              This screen intentionally uses a custom background color and visual
              cards through normal React Native styling, while the package handles
              insets and keyboard layout behavior.
            </Text>
          </View>
          <View style={styles.previewCardAlt}>
            <Text style={styles.previewTitleAlt}>Inset-aware content block</Text>
            <Text style={styles.previewBodyAlt}>
              This is the simplest usage pattern for non-form screens that still
              need safe areas and a bottom action region.
            </Text>
          </View>
        </ExampleSection>
      </ScreenScrollView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <Text style={styles.actionText}>
          StickyActionBar is using provider defaults here. Override
          keyboardBehavior, safeAreaAware, or bottomOffset when a screen needs
          different behavior.
        </Text>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#EEF4FF'
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#D7E3F4'
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155'
  },
  previewCard: {
    backgroundColor: '#1D4ED8',
    borderRadius: 20,
    padding: 18
  },
  previewCardAlt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#D7E3F4'
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8
  },
  previewBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#DBEAFE'
  },
  previewTitleAlt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  previewBodyAlt: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569'
  },
  actionText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#475569'
  }
});
