# Example Showcase

This folder is now a small showcase app instead of a single minimal demo.

## Why Use It

Use `react-native-screen-system` when your app keeps repeating the same screen problems:

- forms that get covered by the keyboard
- inputs that should jump to the next field cleanly
- sticky bottom CTA bars that should stay usable
- screens that need safe-area spacing without rewriting the same padding logic
- loading, error, empty, and content states that should stay consistent
- long scrollable forms where focused inputs need to scroll into view

The point of the package is not visual styling. The point is behavior orchestration at the screen level.

Instead of rebuilding keyboard math, focus order, scroll-to-input handling, and bottom action spacing on every screen, this package gives one shared system for those jobs.

## Common Use Cases

Teams will usually get value from this package in screens like:

- sign in, sign up, forgot password, OTP, and account recovery flows
- checkout, payment, shipping address, and order confirmation screens
- profile edit, account settings, and preferences forms
- onboarding flows with multiple text fields and bottom CTA buttons
- support/contact forms with long scrollable input sections
- search and filter screens with loading, empty, and error states
- KYC, banking, insurance, and other compliance-heavy form flows
- admin or internal tools where many screens repeat the same input behavior
- health, education, or commerce apps where form usability directly affects conversion

## Benefits For Users

What a user gets from it:

- fewer one-off screen hacks
- more consistent form and checkout behavior
- less repeated safe-area and keyboard code
- a cleaner way to compose screen containers, scroll areas, and bottom actions
- small focused hooks for teams that do not want a large framework

More concrete benefits:

- faster screen development because common screen behavior is already handled
- fewer regressions when the keyboard opens on different devices
- better input UX because focus order and submit behavior stay predictable
- better conversion on forms and checkout flows because CTA buttons stay reachable
- less duplicated code across teams working on different screens
- easier maintenance because behavior rules live in one package instead of many local hacks
- easier onboarding for new developers because they can follow one shared screen pattern
- more consistent handling of loading, error, empty, and content states
- more reusable examples for product teams building similar screens again and again

## What It Does Not Try To Be

This package is not a design system, router, or visual component library.

It does not try to choose:

- your colors
- your typography
- your brand layout
- your navigation library

It focuses on the interaction layer underneath those choices:

- keyboard behavior
- safe-area spacing
- field focus flow
- field scrolling
- sticky actions
- screen state rendering

Files:

- `App.tsx` wires `SafeAreaProvider`, `ScreenSystemProvider`, and a simple home screen for switching between demos.
- `ProviderAndLayoutExample.tsx` demonstrates `ScreenSystemProvider`, `useScreenSystem`, `ScreenContainer`, and `StickyActionBar`.
- `FormFlowExample.tsx` demonstrates `ScreenScrollView` and `useFocusableField` on a realistic form screen.
- `FocusControllerExample.tsx` demonstrates direct `useFocusController` usage for manual focus jumps and invalid-field handling.
- `ScrollCoordinatorExample.tsx` demonstrates `useScrollCoordinator` and manual `scrollToField()` behavior.
- `ScreenStatesExample.tsx` demonstrates `useScreenState` and `ScreenStateView`.
- `KeyboardInsetsExample.tsx` demonstrates `useKeyboardInsets` with keyboard-aware layout.
- `ExamplePrimitives.tsx` contains shared presentation helpers used by the showcase screens.

Coverage:

- Provider defaults and layout orchestration
- Keyboard-aware containers
- Scroll registration and manual field scrolling
- Focus ordering and imperative focus control
- Sticky action bars
- Loading, error, empty, and content state rendering
- Live keyboard inset inspection

This example app is intended to show how the exported APIs fit together across actual screen patterns, not just isolated snippets.
