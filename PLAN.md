# Roadmap

## What's shipped in v0.0.1

The first release covers the core screen interaction system:

**Layout & keyboard**
- `ScreenContainer` — keyboard-aware, safe-area-aware screen wrapper
- `StickyActionBar` — bottom action area that lifts above the keyboard
- `useKeyboardInsets` — raw keyboard height and safe-area-adjusted bottom inset

**Focus orchestration**
- `useFocusableField` — per-field focus, next/previous navigation, auto-scroll on focus
- `useFocusController` — imperative field registry, focus by id, focus first invalid

**Scroll coordination**
- `ScreenScrollView` — scroll view that auto-registers with the scroll coordinator
- `useScrollCoordinator` — scrolls the focused input into view across any registered scroll view

**Screen state**
- `useScreenState` — converts booleans into `loading | error | empty | content`
- `ScreenStateView` — renders the right UI for each state

---

## Principles this package will not break

- No visual opinions. Styling stays with the app.
- No navigation coupling. Works with any router.
- No validation logic. That belongs in the form layer.
- Small and tree-shakeable. Every export is independently useful.
- Predictable over magic. Behavior is explicit via props and options.

---

## What comes next

### v0.1 — Stability and coverage

- [ ] Full test coverage for focus navigation edge cases
- [ ] Android keyboard behavior parity audit
- [ ] Multi-scroll-view per screen (nested coordinators)
- [ ] `FocusControllerProvider` isolation per form section (not just per screen)

### v0.2 — Developer experience

- [ ] TypeScript strict mode compatibility pass
- [ ] Dev-mode validation for common misuse patterns (duplicate ids, missing order)
- [ ] Improved warning messages with actionable guidance

### v0.3 — Extended primitives

- [ ] `useHeaderVisibility` — hide/show navigation header based on scroll position
- [ ] `useBottomTabVisibility` — hide/show tab bar during keyboard interaction
- [ ] `ScreenKeyboardView` — alternative to `KeyboardAvoidingView` using the inset system

### Future / under consideration

- Virtualized list support for focus scrolling (`FlatList`, `SectionList`)
- Multi-step form coordinator with shared state across steps
- Scroll coordinator support for horizontal scroll views
- Optional animation hooks on keyboard show/hide

---

## What will never be in scope

- Navigation stack
- Modal / sheet / toast management
- Form validation rules
- Visual component kit
- Business logic

---

## Versioning policy

This package follows semantic versioning.

- Patch: bug fixes, non-breaking internal improvements
- Minor: new exports, new optional props, new hooks
- Major: breaking changes to existing public API

Until v1.0, minor versions may include breaking changes. They will be clearly documented in the changelog.
