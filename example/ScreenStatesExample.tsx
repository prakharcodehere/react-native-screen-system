import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  ScreenContainer,
  ScreenScrollView,
  StickyActionBar,
  ScreenStateView,
  useScreenState
} from '../src';
import {
  ActionButton,
  ExampleHeader,
  ExampleSection,
  exampleStyles
} from './ExamplePrimitives';

type Mode = 'loading' | 'error' | 'empty' | 'content';

export function ScreenStatesExample({
  onBack
}: {
  onBack: () => void;
}) {
  const [mode, setMode] = useState<Mode>('content');

  const flags = useMemo(
    () => ({
      loading: mode === 'loading',
      error: mode === 'error' ? new Error('Network request failed.') : null,
      empty: mode === 'empty'
    }),
    [mode]
  );

  const derivedState = useScreenState(flags);

  return (
    <ScreenContainer includeTopInset includeBottomInset style={exampleStyles.screen}>
      <ScreenStateView
        loading={flags.loading}
        error={flags.error}
        empty={flags.empty}
        renderLoading={() => (
          <View style={styles.centerState}>
            <Text style={styles.stateTitle}>Loading state</Text>
            <Text style={styles.stateBody}>
              Use this branch for skeletons, spinners, or placeholder layouts.
            </Text>
          </View>
        )}
        renderError={(error) => (
          <View style={styles.centerState}>
            <Text style={styles.stateTitle}>Error state</Text>
            <Text style={styles.stateBody}>
              {error instanceof Error ? error.message : 'Unknown error'}
            </Text>
          </View>
        )}
        renderEmpty={() => (
          <View style={styles.centerState}>
            <Text style={styles.stateTitle}>Empty state</Text>
            <Text style={styles.stateBody}>
              No results are available for the current filters.
            </Text>
          </View>
        )}
      >
        <ScreenScrollView contentContainerStyle={exampleStyles.scrollContent}>
          <ExampleHeader
            title="Screen States"
            description="This demo derives a ScreenStatus from booleans with useScreenState and renders the correct branch through ScreenStateView."
            onBack={onBack}
          />

          <ExampleSection title="Derived State">
            <View style={styles.stateCard}>
              <Text style={styles.stateLabel}>Current mode</Text>
              <Text style={styles.stateValue}>{mode}</Text>
            </View>
            <View style={styles.stateCard}>
              <Text style={styles.stateLabel}>useScreenState output</Text>
              <Text style={styles.stateValue}>{derivedState}</Text>
            </View>
          </ExampleSection>

          <ExampleSection title="Content Renderer">
            <View style={styles.contentCard}>
              <Text style={styles.contentTitle}>Order history</Text>
              <Text style={styles.contentBody}>Recent activity would render here when the screen is in content mode.</Text>
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.contentTitle}>Saved addresses</Text>
              <Text style={styles.contentBody}>This block exists to make the content branch visibly different from empty or loading.</Text>
            </View>
          </ExampleSection>
        </ScreenScrollView>
      </ScreenStateView>

      <StickyActionBar divider style={exampleStyles.actionBar}>
        <View style={exampleStyles.actionBarRow}>
          <ActionButton label="Loading" onPress={() => setMode('loading')} variant="ghost" />
          <ActionButton label="Error" onPress={() => setMode('error')} variant="ghost" />
          <ActionButton label="Empty" onPress={() => setMode('empty')} variant="ghost" />
          <ActionButton label="Content" onPress={() => setMode('content')} />
        </View>
      </StickyActionBar>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F7FAFC'
  },
  stateTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8
  },
  stateBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
    textAlign: 'center'
  },
  stateCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    gap: 4
  },
  stateLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#64748B'
  },
  stateValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A'
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  contentBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569'
  }
});
