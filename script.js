const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/index.html");

const introAlreadyShown =
    sessionStorage.getItem("portfolioIntroShown") === "true";

if (isHomePage && !introAlreadyShown) {

    sessionStorage.setItem("portfolioIntroShown", "true");

    document.body.classList.add("intro-active");

    const introScreen = document.createElement("div");

    introScreen.className = "intro-screen";

    introScreen.innerHTML = `
        <div class="intro__content">

            <div class="intro__initials">
                IV
            </div>

            <div class="intro__name">
                Ivana Valigura
            </div>

            <div class="intro__line"></div>

            <div class="intro__subtitle">
                · Web Developer ·
            </div>

        </div>
    `;

    document.body.prepend(introScreen);


    // -----------------------------------------
    // START OPENING
    // -----------------------------------------

    window.addEventListener("load", () => {

        setTimeout(() => {

            introScreen.classList.add("is-opening");

            document.body.classList.add("intro-revealing");

        }, 2800);


        setTimeout(() => {

            introScreen.classList.add("is-hidden");

            document.body.classList.remove("intro-active");

            document.body.classList.remove("intro-revealing");

        }, 5400);

    });

}

// =========================================
// EMAILJS
// =========================================

(function () {

    emailjs.init({
        publicKey: "mSbJfpSxD4Tjs4P-Z",
    });

})();


// =========================================
// CONTACT FORM
// =========================================

const form = document.getElementById("contact-form");

if (form) {

    const message = document.querySelector(".form-message");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        emailjs.sendForm(
            "portfolio",
            "template_eyaaj1q",
            this
        )
        .then(() => {

            message.textContent =
                "✓ Message sent successfully! I'll get back to you soon.";

            message.classList.add("show");

            form.reset();

        })
        .catch((error) => {

            message.textContent =
                "Something went wrong. Please try again.";

            message.classList.add("show");

            console.log(error);

        });

    });

}


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// =========================================
// STAGGER ANIMATION FOR CARDS
// =========================================

const animatedGroups = document.querySelectorAll(
    ".approach-grid, .projects-grid, .skills-grid"
);


animatedGroups.forEach((group) => {

    const items = group.children;

    Array.from(items).forEach((item, index) => {

        item.style.setProperty(
            "--animation-delay",
            `${index * 100}ms`
        );

        item.classList.add("stagger-item");

    });

});

// =========================================
// HAMBURGER MENU
// =========================================

const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav__list");

if (hamburger && navList) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("open");
        navList.classList.toggle("open");

    });

}


// =========================================
// ACTIVE NAVBAR LINKS
// =========================================

const sections = document.querySelectorAll("body > main > section");
const navLinks = document.querySelectorAll(".nav__list a");

if (sections.length && navLinks.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                current &&
                link.getAttribute("href") === `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    });

}


// =========================================
// PROJECT GALLERIES
// =========================================

const galleries = {

    "bbs-gallery": [
        "./assets/bbs-home.png",
        "./assets/bbs-book.png",
        "./assets/bbs-services.png",
        "./assets/bbs-contact.png"
    ],

    "nutri-gallery": [
        "./assets/nutri-week.png",
        "./assets/nutri-create.png",
        "./assets/nutri.login.png",
        "./assets/nutri-supplies.png",
        "./assets/nutri-basket.png"
    ],

    "centurion-gallery": [
        "./assets/centurion.png",
        "./assets/centurion-about.png",
        "./assets/centurion-work.png",
        "./assets/centurion-pics.png"
    ],

    "school-gallery": [
        "./assets/school-home.png",
        "./assets/school-faq.png",
        "./assets/school-lessons.png",
        "./assets/school-programs.png",
        "./assets/school-contact.png"
    ]

};


document.querySelectorAll(".project-gallery").forEach(gallery => {

    const images = galleries[gallery.id];

    if (!images) return;

    let current = 0;

    const img = gallery.querySelector(".gallery-image");
    const prev = gallery.querySelector(".prev");
    const next = gallery.querySelector(".next");

    const currentImage = gallery.querySelector(".current-image");
    const totalImages = gallery.querySelector(".total-images");

    if (
        !img ||
        !prev ||
        !next ||
        !currentImage ||
        !totalImages
    ) {
        return;
    }

    totalImages.textContent = images.length;


    function render() {

        img.classList.add("change");

        setTimeout(() => {

            img.src = images[current];

            currentImage.textContent = current + 1;

            img.classList.remove("change");

        }, 180);

    }


    // NEXT IMAGE

    next.addEventListener("click", () => {

        current++;

        if (current >= images.length) {

            current = 0;

        }

        render();

    });


    // PREVIOUS IMAGE

    prev.addEventListener("click", () => {

        current--;

        if (current < 0) {

            current = images.length - 1;

        }

        render();

    });


    // =========================================
    // SWIPE
    // =========================================

    let startX = 0;

    img.addEventListener("touchstart", (event) => {

        startX = event.touches[0].clientX;

    });


    img.addEventListener("touchend", (event) => {

        const endX = event.changedTouches[0].clientX;

        const distance = startX - endX;

        if (Math.abs(distance) < 40) return;


        if (distance > 0) {

            current++;

            if (current >= images.length) {

                current = 0;

            }

        } else {

            current--;

            if (current < 0) {

                current = images.length - 1;

            }

        }

        render();

    });

});