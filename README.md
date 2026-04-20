# Rejouice Project

A front-end recreation of the Rejouice landing page experience built with HTML, CSS, JavaScript, GSAP, Locomotive Scroll, and Swiper.

## Screenshot

![Rejouice project start screen](img/Screenshot%20start.png)

![Rejouice project page screen](img/Screenshot%20enter.png)

## Features

- Full-screen video hero section
- Custom animated cursor interactions
- Smooth scrolling with Locomotive Scroll
- Scroll-based text animation with GSAP ScrollTrigger
- Hover video cards
- Swiper image carousel
- Responsive footer section
- Custom local fonts

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
├── Font/
│   ├── Rejouice-Regular.ttf
│   ├── SuisseIntl-Light.ttf
│   └── SuisseIntl-Regular.ttf
└── img/
    ├── swiper/
    ├── reel-full.mp4
    ├── reel-full_68kB1xPl.mp4
    └── other images and videos
```

## How To Run

Open `index.html` directly in your browser.

For a smoother local development experience, you can also use a local server such as the VS Code Live Server extension.

## External Libraries

The project loads these libraries from CDNs:

- GSAP
- GSAP ScrollTrigger
- Locomotive Scroll
- Swiper

## Files

- `index.html` contains the page markup and CDN links.
- `style.css` contains layout, animation styling, cursor styling, carousel styling, and footer styles.
- `script.js` contains smooth scroll setup, cursor movement, GSAP animations, loader animation, and Swiper initialization.

## Notes

Make sure the `Font` and `img` folders stay in the same directory as `index.html`, because the page uses relative paths for fonts, images, and videos.
