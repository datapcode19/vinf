# Swipe gesture — 08/11/2026

Implemented in the existing vanilla HTML/CSS/JavaScript project. No external carousel dependency or route/product-data changes.

## Coverage

| Area | Behavior |
| --- | --- |
| Home hero | Finger/mouse dragging, horizontal wheel input, looping, existing arrows and pagination |
| All home car/scooter model groups | Whole scene follows the pointer: vehicle, specifications, price and CTA. Picker and active model remain synchronized. |
| VF 3 exterior gallery (4 images) | Same shared carousel, arrows and pagination |
| Kinet color images (5 colors) | Swipe/drag, synchronized swatch, image, selection label and specification table |
| Overflowing tab lists and model pickers | Native touch/trackpad scrolling and mouse dragging; no unintended tab selection after dragging |

Static product-card grids, accessory grids, informational sections, single-image heroes and VF 6's single illustration remain static. VF 3 Eco/Plus configuration remains a button-based configuration choice, not an image gallery. No existing carousel was left using button-only navigation.

## Implementation

- `js/swipe.js`: shared `createSwipe(viewport, slides, onChange)` and `initHorizontalScroll()`.
- Pointer Events with horizontal direction locking; `touch-action: pan-y pinch-zoom` keeps vertical page scrolling available.
- `translate3d`, animation-frame updates while dragging, 250 ms settling transition, distance/velocity thresholds and short-drag return.
- Looping navigation, cancellation, click suppression after dragging, inert inactive slides, reduced-motion support, resize handling and stable maximum scene height.
- Eagerly load carousel images; if a target image is still loading, keep the current scene until decoding succeeds.
- Only horizontal-dominant wheel events are consumed. Trackpad momentum is grouped to avoid multiple accidental advances. Vertical wheels remain native.
- Removed the previous separate showcase animation to avoid competing animation controllers.

## Browser validation

`node tests/swipe.cjs`: **90/90 PASS** across 375, 390, 768, 1366 and 1440 px. Runs the static site mounted at `/vinf/`.

Includes home hero and VF 3 gallery at every width, mouse dragging both directions, short drag, fast flick, repeated gestures, wraparound, pagination, stable height, horizontal/vertical wheel events, desktop/mobile resizing, reduced motion, product scene synchronization, Kinet swatches, model-row scrolling, ordinary CTA clicks, missing assets and JavaScript errors.

Touch tests use Chromium CDP `Input.dispatchTouchEvent` (`touchStart`, multiple `touchMove`, `touchEnd`), separately from mouse tests. They assert movement during the gesture and verify that a vertical touch gesture scrolls the page without changing the slide. This is browser-emulated touch, not testing on physical phones or Safari.

`node tests/swipe-edge.cjs`: **5/5 PASS** for delayed image loading, touch cancellation and viewport coverage during dragging, dragging from a CTA without navigation, rapid navigation, and scooter carousel synchronization.

`node tests/home-interactions.cjs`: **8/8 PASS**, including all 37 models, existing menus, keyboard tabs, newsletter validation, account dialog, mobile navigation, local links and assets.

Results and screenshots:

- `tests/swipe/results.json`
- `tests/swipe/edge-results.json`
- `tests/swipe/390-during-touch.png` — two adjacent scenes while the finger is still down.
- `tests/swipe/{width}-home.png`, `tests/swipe/{width}-vf3.png`
- `tests/home-visual/interactions.json`

No deployment or Git-history changes were performed. The `/vinf/` mount was tested locally; physical-device performance and Safari remain unverified.
