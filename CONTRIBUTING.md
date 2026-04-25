# Contributing to react-native-screen-system

Thank you for taking the time to contribute.

This package is behavior-first infrastructure for React Native. The goal is to keep it small, predictable, and useful without becoming opinionated about design or navigation.

---

## Core principles

Before contributing, keep these in mind:

- **Behavior over visuals.** This package handles interaction, not styling. Avoid adding visual defaults.
- **Small and focused.** Each export should do one thing well. Resist the urge to add convenience wrappers that blur responsibilities.
- **Explicit over implicit.** Behavior should be controllable via props or options. Avoid hidden state that surprises developers.
- **Platform honest.** If something works differently on iOS and Android, document it clearly rather than papering over it.

---

## Local setup

```bash
npm install
npm run build
npm run typecheck
```

There are no runtime dependencies beyond `react`, `react-native`, and `react-native-safe-area-context`.

---

## How to contribute

### Reporting a bug

Open an issue with:

- React Native version
- Platform: iOS, Android, or both
- A minimal reproduction (ideally a snippet or Expo Snack)
- What you expected to happen
- What actually happened

### Suggesting a feature

Open an issue describing:

- The problem you're trying to solve (not just the solution)
- Which screens or use cases are affected
- Whether this belongs in this package or in the app layer

Check [PLAN.md](./PLAN.md) first — the feature may already be on the roadmap.

### Submitting a pull request

1. Fork the repository or create a feature branch off `main`.
2. Make focused changes. One fix or feature per pull request.
3. Run `npm run build` and `npm run typecheck` — both must pass.
4. Update `README.md` if the public API changed.
5. Update `example/` if the new behavior should be demonstrated.
6. Open a pull request with a clear title and a short description of what changed and why.

A good PR description answers:
- What does this change?
- Why is this the right approach?
- Are there any trade-offs or known limitations?

---

## Code style

- TypeScript types should be explicit at public API boundaries.
- Internal helpers can rely on inference.
- Avoid adding comments that just describe what the code does — name things well instead.
- Prefer `const` and pure functions where possible.
- Platform-specific branches should be clearly isolated.

---

## What belongs in this package

Changes are welcome if they:

- solve a real, recurring screen interaction problem
- fit within the existing primitives (keyboard, focus, scroll, state)
- keep the package size low and the public API surface narrow

Changes are out of scope if they:

- add visual styling or component design
- require a navigation framework as a dependency
- introduce form validation logic
- duplicate what React Native provides natively

---

## Commit style

Use a short, descriptive commit message in the present tense:

```
fix: prevent negative scroll offset in fallback path
feat: add blurOnSubmit auto-detection to useFocusableField
docs: expand customization examples in README
```

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
