import React from 'react';
import type { ScreenStatus } from './useScreenState';
import { useScreenState } from './useScreenState';

export interface ScreenStateViewProps {
  state?: ScreenStatus;
  loading?: boolean;
  error?: unknown | null;
  empty?: boolean;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: unknown) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderContent?: () => React.ReactNode;
  children: React.ReactNode;
}

export function ScreenStateView({
  state,
  loading = false,
  error = null,
  empty = false,
  renderLoading,
  renderError,
  renderEmpty,
  renderContent,
  children
}: ScreenStateViewProps) {
  const derivedStatus = useScreenState({ loading, error, empty });
  const status: ScreenStatus = state ?? derivedStatus;

  switch (status) {
    case 'loading':
      return <>{renderLoading?.() ?? null}</>;
    case 'error':
      return <>{renderError?.(error) ?? null}</>;
    case 'empty':
      return <>{renderEmpty?.() ?? null}</>;
    case 'content':
    default:
      return <>{renderContent?.() ?? children}</>;
  }
}
