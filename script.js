gsap.registerPlugin(ScrollTrigger);

const main = document.querySelector("#main");
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let locoScrollInstance;

function initLocoScroll() {
    if (!window.LocomotiveScroll || !main) return;

    locoScrollInstance = new LocomotiveScroll({
        el: main,
        smooth: !isTouchDevice && !reduceMotion,
        lerp: 0.08,
        multiplier: 0.9,
        smartphone: {
            smooth: false
        },
        tablet: {
            smooth: !reduceMotion
        }
    });

    locoScrollInstance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(main, {
        scrollTop(value) {
            if (arguments.length) {
                locoScrollInstance.scrollTo(value, { duration: 0, disableLerp: true });
                return;
            }

            return locoScrollInstance.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: main.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScrollInstance.update());
    ScrollTrigger.refresh();

    window.addEventListener("resize", () => {
        locoScrollInstance.update();
        ScrollTrigger.refresh();
    });
}

function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#site-menu");

    if (!toggle || !menu) return;

    const closeMenu = () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
        const willOpen = toggle.getAttribute("aria-expanded") !== "true";

        toggle.setAttribute("aria-expanded", String(willOpen));
        menu.setAttribute("aria-hidden", String(!willOpen));
        menu.classList.toggle("is-open", willOpen);
        document.body.classList.toggle("menu-open", willOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

function initMagneticCursor(areaSelector, cursorSelector) {
    if (isTouchDevice || reduceMotion) return;

    const area = document.querySelector(areaSelector);
    const cursor = document.querySelector(cursorSelector);

    if (!area || !cursor) return;

    const quickX = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const quickY = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    area.addEventListener("mousemove", (event) => {
        quickX(event.clientX);
        quickY(event.clientY);
    });

    area.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
    });

    area.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
    });
}

function initPage2Animation() {
    if (reduceMotion) return;

    gsap.from(".elem h1", {
        yPercent: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page2",
            scroller: main,
            start: "top 70%",
            end: "top 35%",
            scrub: 1.5
        }
    });
}

function initSwiper() {
    if (!window.Swiper) return;

    new Swiper(".mySwiper", {
        slidesPerView: 1.15,
        spaceBetween: 16,
        loop: true,
        grabCursor: true,
        speed: reduceMotion ? 0 : 900,
        autoplay: reduceMotion
            ? false
            : {
                  delay: 2300,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
              },
        breakpoints: {
            480: {
                slidesPerView: 1.6,
                spaceBetween: 18
            },
            768: {
                slidesPerView: 2.4,
                spaceBetween: 22
            },
            1024: {
                slidesPerView: 3.6,
                spaceBetween: 24
            },
            1440: {
                slidesPerView: 4.2,
                spaceBetween: 28
            }
        }
    });
}

function initLoaderAnimation() {
    const timeline = gsap.timeline();

    timeline.from("#loader h3", {
        x: 40,
        opacity: 0,
        stagger: 0.1,
        duration: reduceMotion ? 0.01 : 1,
        ease: "power2.out"
    });

    timeline.to("#loader h3", {
        opacity: 0,
        x: -20,
        duration: reduceMotion ? 0.01 : 0.8,
        stagger: 0.08
    });

    timeline.to("#loader", {
        opacity: 0,
        display: "none",
        duration: reduceMotion ? 0.01 : 0.4
    });

    timeline.from("#page1-content h1 span", {
        yPercent: 100,
        opacity: 0,
        stagger: reduceMotion ? 0 : 0.06,
        duration: reduceMotion ? 0.01 : 0.7,
        ease: "power3.out"
    });
}

function refreshAfterMediaLoads() {
    const media = document.querySelectorAll("img, video");

    media.forEach((item) => {
        if (item.complete || item.readyState >= 1) {
            ScrollTrigger.refresh();
        }

        item.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        item.addEventListener("loadedmetadata", () => ScrollTrigger.refresh(), { once: true });
    });
}

initLocoScroll();
initMenu();
initMagneticCursor("#page1-content", "#cursor");
initMagneticCursor("#page4-content", "#cursor2");
initPage2Animation();
initSwiper();
initLoaderAnimation();
refreshAfterMediaLoads();
