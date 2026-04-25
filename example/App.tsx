import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ScreenContainer,
  ScreenScrollView,
  ScreenSystemProvider,
  StickyActionBar
} from '../src';
import { FocusControllerExample } from './FocusControllerExample';
import { FormFlowExample } from './FormFlowExample';
import { KeyboardInsetsExample } from './KeyboardInsetsExample';
import { ProviderAndLayoutExample } from './ProviderAndLayoutExample';
import { ScreenStatesExample } from './ScreenStatesExample';
import { ScrollCoordinatorExample } from './ScrollCoordinatorExample';

type ExampleId =
  | 'provider'
  | 'form'
  | 'focus'
  | 'scroll'
  | 'state'
  | 'keyboard';

interface ExampleRegistration {
  id: ExampleId;
  title: string;
  description: string;
  component: React.ComponentType<{ onBack: () => void }>;
}

const EXAMPLES: ExampleRegistration[] = [
  {
    id: 'provider',
    title: 'Provider and Layout',
    description:
      'Shows ScreenSystemProvider defaults, useScreenSystem, ScreenContainer, and StickyActionBar spacing.',
    component: ProviderAndLayoutExample
  },
  {
    id: 'form',
    title: 'Form Flow',
    description:
      'Shows ScreenScrollView, useFocusableField, keyboard-aware layout, and sticky submit actions.',
    component: FormFlowExample
  },
  {
    id: 'focus',
    title: 'Focus Controller',
    description:
      'Shows direct useFocusController calls: focusField, focusNext, focusPrevious, and focusFirstInvalid.',
    component: FocusControllerExample
  },
  {
    id: 'scroll',
    title: 'Scroll Coordinator',
    description:
      'Shows manual useScrollCoordinator scrolling and ScreenScrollView registration options.',
    component: ScrollCoordinatorExample
  },
  {
    id: 'state',
    title: 'Screen States',
    description:
      'Shows useScreenState and ScreenStateView handling loading, error, empty, and content.',
    component: ScreenStatesExample
  },
  {
    id: 'keyboard',
    title: 'Keyboard Insets',
    description:
      'Shows live useKeyboardInsets values while typing into fields near the bottom of the screen.',
    component: KeyboardInsetsExample
  }
];

function ExampleHome({
  onOpen
}: {
  onOpen: (id: ExampleId) => void;
}) {
  return (
    <ScreenContainer
      includeTopInset
      includeBottomInset
      extraTopInset={12}
      style={styles.homeScreen}
    >
      <ScreenScrollView contentContainerStyle={styles.homeContent}>
        <Text style={styles.eyebrow}>react-native-screen-system</Text>
        <Text style={styles.homeTitle}>Example Showcase</Text>
        <Text style={styles.homeDescription}>
          Each card demonstrates one part of the public API so the package can
          be evaluated screen by screen instead of from a tiny single example.
        </Text>

        {EXAMPLES.map((example) => (
          <Pressable
            key={example.id}
            onPress={() => onOpen(example.id)}
            style={styles.exampleCard}
          >
            <Text style={styles.exampleTitle}>{example.title}</Text>
            <Text style={styles.exampleBody}>{example.description}</Text>
          </Pressable>
        ))}
      </ScreenScrollView>

      <StickyActionBar divider style={styles.homeActionBar}>
        <Text style={styles.footerText}>
          Coverage: provider config, layout, scroll coordination, focus flows,
          keyboard insets, and state rendering.
        </Text>
      </StickyActionBar>
    </ScreenContainer>
  );
}

export default function App() {
  const [activeExampleId, setActiveExampleId] = useState<ExampleId | null>(null);

  const activeExample = useMemo(
    () => EXAMPLES.find((example) => example.id === activeExampleId) ?? null,
    [activeExampleId]
  );

  const ActiveComponent = activeExample?.component;

  return (
    <SafeAreaProvider>
      <ScreenSystemProvider
        keyboardVerticalOffset={8}
        actionBarBottomGap={16}
        defaultKeyboardBehavior="padding"
        defaultActionBarKeyboardBehavior="padding"
      >
        {ActiveComponent ? (
          <ActiveComponent onBack={() => setActiveExampleId(null)} />
        ) : (
          <ExampleHome onOpen={setActiveExampleId} />
        )}
      </ScreenSystemProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#F4F7FB'
  },
  homeContent: {
    padding: 20,
    gap: 14
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3563E9',
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A'
  },
  homeDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 8
  },
  exampleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DBE4F0'
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6
  },
  exampleBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563'
  },
  homeActionBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14
  },
  footerText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#475569'
  }
});
