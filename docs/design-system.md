# Shared design system

Both Tour Studio and the assistant use styled-components. `ThemeProvider` supplies
`src/shared/styles/theme.ts`, and the existing server style registry renders the
initial styles without waiting for client hydration.

## Defaults and inheritance

- `tokens.ts` owns semantic colors, type sizes, fonts, the spacing scale, radii,
  control sizes and motion durations.
- `css-reset.ts` exposes theme tokens as inherited CSS custom properties and sets
  document typography, field sizing, keyboard focus, disabled controls and reduced
  motion. It does not hide horizontal overflow or force page heights.
- `primitives.ts` contains reusable `css` blocks for panel surfaces and buttons.
- Each feature and panel owns its scoped styled-components. Only deliberate
  component variations override the inherited defaults.
- Breakpoints are centralized in the typed theme because CSS custom properties
  cannot supply media-query conditions.

Change a token in `tokens.ts` to update every consumer. For example,
`--text-body` controls default text and form inputs; `--control-height` sets the
44px minimum control height; `--color-focus` controls keyboard-focus outlines.
A nested theme can override tokens for a future branded workspace. Keep palette
values in the theme rather than adding literal colors to components.

Artwork coordinates, layout-specific editor heights and accessibility clipping
retain local geometry: they do not represent reusable design decisions. Intrinsic
layout uses grid, flex, percentages and viewport units. Do not add a global
`overflow-x: hidden` to conceal layout defects.

The UI keeps the cream/green palette and serif editor. Small help text is 12px,
labels are 14px, inputs are 16px, and compact icon/segment controls are 44px.
Check desktop, mobile, keyboard focus, dialog controls and the legacy chat whenever
changing these defaults. Browser tests exercise the creative flow; they do not
claim complete cross-browser or accessibility conformance.
