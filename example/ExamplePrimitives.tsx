import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export function ExampleHeader({
  title,
  description,
  onBack
}: {
  title: string;
  description: string;
  onBack: () => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export function ExampleSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function InfoCard({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

export function ActionButton({
  label,
  onPress,
  variant = 'primary'
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const buttonStyle = [
    styles.actionButton,
    variant === 'secondary'
      ? styles.actionButtonSecondary
      : variant === 'ghost'
        ? styles.actionButtonGhost
        : styles.actionButtonPrimary
  ];
  const textStyle = [
    styles.actionButtonText,
    variant === 'ghost' ? styles.actionButtonGhostText : null
  ];

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

export const exampleStyles = StyleSheet.create({
  screen: {
    backgroundColor: '#F7FAFC'
  },
  scrollContent: {
    padding: 20,
    gap: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  helperText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B'
  },
  spacer: {
    height: 120
  },
  actionBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14
  },
  actionBarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  noteCard: {
    backgroundColor: '#E8F0FE',
    borderRadius: 16,
    padding: 16
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 6
  },
  noteBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1E3A8A'
  }
});

const styles = StyleSheet.create({
  header: {
    gap: 8
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A'
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#475569'
  },
  section: {
    gap: 10
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    gap: 4
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#64748B'
  },
  cardValue: {
    fontSize: 16,
    color: '#0F172A'
  },
  actionButton: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  actionButtonPrimary: {
    backgroundColor: '#2563EB'
  },
  actionButtonSecondary: {
    backgroundColor: '#0F172A'
  },
  actionButtonGhost: {
    backgroundColor: '#E2E8F0'
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  actionButtonGhostText: {
    color: '#0F172A'
  }
});
