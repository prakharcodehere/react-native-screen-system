export type ScreenStatus = 'loading' | 'error' | 'empty' | 'content';

export interface UseScreenStateOptions {
  loading?: boolean;
  error?: unknown | null;
  empty?: boolean;
}

export function useScreenState({
  loading = false,
  error = null,
  empty = false
}: UseScreenStateOptions): ScreenStatus {
  if (loading) {
    return 'loading';
  }

  if (error) {
    return 'error';
  }

  if (empty) {
    return 'empty';
  }

  return 'content';
}
