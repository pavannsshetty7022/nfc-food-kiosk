# NFC Food Kiosk

Contactless ordering kiosk for Nitte Food Canteen — an AngularJS + Bootstrap demo app for browsing a menu, building a cart, and simulating QR payment and a printable receipt.

This repository contains a small frontend-only kiosk UI intended for demos, prototypes, or classroom projects. It does not include a backend or real payment integrations; QR payment is simulated for demo purposes.

---

## Features

- Responsive, kiosk-optimized UI built with AngularJS (1.x) and Bootstrap 5
- Menu browsing with categories
- Add-to-cart, update quantities, and order summary with tax calculation
- Simulated QR payment flow with generated QR code
- Printable digital receipt
- Home screen CTAs for Dine In / Take Away flows
- Simple header branding and favicon

---

## Quick start (Windows)

1. Open a Command Prompt in the project root (e.g., `c:\Github-Projects\NFC-Kiosk`).

2. Serve the static files using Python (if installed):

```cmd
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

Alternatively use Node.js `http-server` (requires Node installed):

```cmd
npx http-server -p 8000
```

---

## Development notes

- Code is organized as simple static files:
  - `index.html` — app entry + header/footer
  - `style.css` — project styles
  - `app.js` — AngularJS module and route definitions
  - `controllers.js` — AngularJS controllers for flows
  - `data.js` — sample menu data
  - `views/` — AngularJS templates (home, menu, cart, payment, receipt)
  - `images/` — logo and food images

- The project uses Bootstrap 5 (CDN) and Bootstrap Icons (CDN). The bundled Bootstrap JS is used for the carousel and other interactive components.

- There is no backend. The cart and order flows live in `$rootScope` and are reset if the page reloads.

---

## Testing

Quick manual checks:

- Open the site and verify the home carousel auto-rotates.
- Go to Menu, add items to cart, check Cart summary, and proceed to Payment.
- On Payment, scan (simulated) QR code or click "Pay Now (Simulate Success)" to generate a receipt.
- On Receipt, try Print and Back to Home flows.

---

## Customization & future improvements

- Replace sample data in `data.js` with a dynamic API.
- Persist cart state to localStorage or a backend so page reloads keep the cart.
- Integrate with a real payment gateway or UPI flow.
- Add tests and linting (ESLint) for safer changes.
- Add unit/integration tests if migrating to a modern framework.

---

## License

This project is provided as-is for demonstration and learning purposes. Add a license if you plan to publish or share.

---

## Contact

If you want help extending this project (backend, deployment, or redesign), tell me what you need and I can assist.
