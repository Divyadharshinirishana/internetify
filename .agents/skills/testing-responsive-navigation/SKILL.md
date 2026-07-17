---
name: testing-responsive-navigation
description: Test Internetify anchor navigation and breakpoint layouts on the public frontend. Use when changing the navbar, section offsets, responsive grids, contact form, or floating actions.
---

# Responsive navigation testing

## Devin Secrets Needed

None.

## Setup

1. Build and deploy the frontend.
2. Open the public deployment in the existing Chrome browser.
3. Attach Playwright to `http://localhost:29229` and set the page viewport.
4. Maximize Chrome before recording.

## Viewports

- Mobile: 390×844
- Tablet: 768×1024
- Desktop: 1440×900

## Procedure

At each viewport:

1. Navigate to the deployment root.
2. Click the visible **Why Us** link.
3. Verify `location.hash === "#why-us"`.
4. Compare the Why Us heading top to the fixed navbar bottom; the heading must be lower.
5. Verify the card grid has one, two, then four columns across the three viewports.
6. Click the visible **Contact** link.
7. Verify `location.hash === "#contact"` and the heading clears the navbar.
8. Verify Name and Email stack on mobile and share a row on tablet and desktop.
9. Verify `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
10. Confirm the green floating action shows the WhatsApp logo and links to the configured `wa.me` URL.

Use visible clicks for navigation. Use browser evaluation only for objective geometry, hash, and overflow assertions.
