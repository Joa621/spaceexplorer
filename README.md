# Cosmic Explorer

**Author:** Joanna Korban  
**Submission Date:** July 1, 2025

---

## API Used: NASA Astronomy Picture of the Day (APOD)

This project integrates the [NASA APOD API](https://api.nasa.gov/planetary/apod), which provides a new high-quality astronomy image each day, along with its title and a detailed scientific description. The APOD API is a public RESTful service requiring a (free) API key.

- **Endpoint Example:** `https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY`
- **Data returned:** JSON object with fields such as `url` (image URL), `title`, and `explanation`.
- **Usage in project:**  
  - The APOD data is fetched dynamically using ES6 `fetch()`.
  - On the "APOD" page, the image, title, and explanation are displayed in a styled Bootstrap card.
  - Loading states (spinner) and error handling are implemented for UX and robustness.

---

## Project Description

**Cosmic Explorer** is a front-end, interactive web application for learning about the solar system and astronomy.  
Built with semantic HTML5, CSS3 (with Flexbox, custom transitions, variables, and gradients), Bootstrap 5, Tailwind CSS utility classes, and modern ES6 JavaScript classes, this site demonstrates educational content, creativity, and solid engineering.

### Key Features

- **Single Page Application (SPA) Feel:**  
  Dynamic navigation and page state handled via ES6 classes—no page reloads, just DOM updates.
- **Multi-Page Layout:**
  - **Home:** Animated SVG solar system, call-to-action.
  - **Game:** Responsive planet cards grid, 3D card flip effect, planet quizzes, interactive progress tracking.
  - **Collection:** View and track planet badges, with real-time collection updates.
  - **APOD:** Daily image from NASA’s Astronomy Picture of the Day API, displayed in a styled Bootstrap card with full error handling.
  - **About:** App instructions, mission, and contact/legal modals.
- **Custom Responsive Card Grid & Flip Effect:**  
  (see “Custom Requirement” below)
- **UX/Polish:**  
  - Modals (Contact, Privacy Policy, Terms) using custom modal manager class
  - Glassmorphism, gradients, SVG illustrations, smooth transitions, mobile-friendly layout
  - Sticky responsive header and footer

---

## Custom Requirement: Responsive Card Grid Layout with Hover Effects

**Requirement:**  
"Design a responsive card grid layout with hover effects"

**Implementation:**
- **Game Page:** Features a fully responsive grid of planet cards.
- **Grid:**  
  - Tailwind utility classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Card Effect:**  
  - Each card has a 3D flip effect (`transform: rotateY(180deg)` with `transition: transform 0.8s`)
  - Flip is triggered by "Explore" button using ES6 class logic
  - SVG artwork for each planet
- **Commenting:**  
  - The requirement and effect are clearly commented in both CSS and HTML.

---

## Requirements Checklist

| Requirement                              | Implemented? | Details/Location                |
|-------------------------------------------|:------------:|---------------------------------|
| Semantic HTML5                            |      ✅      | See `index.html`                |
| CSS3 (modern, with effects)               |      ✅      | See `styles.css`                |
| Flexbox & Bootstrap 5                     |      ✅      | Bootstrap and layout grid       |
| Responsive design principles              |      ✅      | Grid adapts at all breakpoints  |
| ES6 JavaScript Classes Only               |      ✅      | All logic in `script.js`        |
| Real functionality (dynamic JS)           |      ✅      | SPA nav, game, modals           |
| 3+ pages + navigation                     |      ✅      | Home, Game, Collection, About, APOD |
| Consistent navigation bar                 |      ✅      | Header/nav always visible       |
| Manual/dynamic routing                    |      ✅      | Via JS classes                  |
| Public API integration                    |      ✅      | NASA APOD (APOD page)           |
| Data display + error handling (API)       |      ✅      | Loading/error/empty state       |
| At least 2 CSS transitions                |      ✅      | Card flip, buttons, progress bars |
| Unique UI requirement                     |      ✅      | Card grid & 3D flip (Game)      |
| Modal(s) (Bootstrap/custom)               |      ✅      | Contact, Privacy, Terms, etc.   |
| Footer                                    |      ✅      | Responsive, sticky, full info   |
| UX design & polish                        |      ✅      | Gradients, SVG, glass, etc.     |
| Creativity, additions                     |      ✅      | SVG solar system, progress bars |

---

## Contact

*Email:* joanna_korban@hotmail.com  
*Phone:* +961 71 736 929

---
