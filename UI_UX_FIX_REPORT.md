# UI/UX fixes — 08/11/2026

## Production files changed in this update

- `js/swipe.js`: retain ambiguous diagonal gestures until direction is clear; defer font/image measurements during gestures; settle in 250 ms.
- `js/home-chrome.js`: identify dropdown indicators with `.nav-chevron`.
- `css/home-reference.css`: fixed-width indicator slot, 120 ms opacity transition on desktop hover/focus/open state, always visible for touch/mobile, reduced-motion support.
- `css/home.css`: explicit centered, contained product cutouts and contained hero images.
- `css/vf3.css`: complete photo proportions for hero/gallery; mobile hero text occupies its own row so it does not obscure the uncropped image.
- `css/kinet.css`: explicit contained and centered Kinet image presentation.

No product data, routes, dependencies, Git author or Git history were changed.

## Causes and fixes

1. Reproduced a failed touch swipe before the fix: starting with displacement (-9, -8), then continuing left to (-150, -16), left the hero at index 0 instead of index 1. The old direction test rejected the entire gesture on its first ambiguous diagonal movement. The new test waits for a clear horizontal or vertical direction, while preserving native vertical scrolling.
2. `document.fonts.ready` called `measure()`, which unconditionally cleared an active drag. Measurements without a width change now wait until the interaction settles; real resizing still invalidates stale gesture coordinates. A controlled font-readiness promise resolving midway through CDP touch input validates this regression.
3. The slide transition was 350 ms; it is now 250 ms. The existing controller still handles cancellation, image loading, looping, click suppression and reduced motion.
4. Header chevrons were always visible. Their width remains reserved, so changing opacity does not shift labels or sibling menu items. Touch uses the existing tap-to-open menu and retains the indicator.
5. VF 3 mobile hero/gallery used `cover` with ratios different from their source images, cutting the photo composition. They now use the source ratios (12:5 hero, 16:9 gallery) with `contain` and centered positioning. The home VF 3 cutout was inspected: visible subject bounds at alpha >16 are x=198..1002 in a 1200 px canvas, already centered. No arbitrary horizontal transform, margin correction or raster edit was applied. Kinet was checked visually at all requested widths and remains fully visible.

## Validation

- `node tests/ui-ux-fixes.cjs`: **30/30 PASS**. Tests 1440, 1366, 768, 390 and 375 px; desktop hover/focus, actual emulated touch taps on mobile menus, indicator opacity and unchanged menu geometry, VF 3 subject bounds, hero/gallery aspect ratios, Kinet visibility, overflow and JavaScript errors. Includes diagonal touch regressions for hero/car/scooter/VF 3 gallery and late font readiness during a drag.
- `node tests/swipe.cjs`: **90/90 PASS**, gesture regression suite at the same five widths; detailed results in `tests/swipe/results.json`.
- `node tests/swipe-edge.cjs`: **5/5 PASS**, delayed images, touch cancellation, no gaps between scenes during dragging, CTA drag suppression, rapid navigation and scooter synchronization.
- `node tests/home-interactions.cjs`: **8/8 PASS**, including all 37 model selections and existing navigation/forms.
- `node --check js/swipe.js` and `git diff --check` passed.

Screenshots: `tests/ui-ux-fixes/`; structured result: `tests/ui-ux-fixes/results.json`. Local static hosting was tested under `/vinf/`.

## Limits

Touch input is Chromium CDP emulation (`Input.dispatchTouchEvent`), separately tested from mouse input. Physical phones and Safari were not tested.

The supplied `D:/download/nânna.pdf` was inspected and has zero bytes. It contains no readable source for comparison; no instruction or source content was taken from it. The fixes above use the existing repository and its local image assets.
