// SCROLL REVEAL

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.style.transition = "all 0.8s ease";

        } else {

            element.style.opacity = "0";
            element.style.transform = "translateY(40px)";

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ACTIVE NAVBAR LINKS

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav__list a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if(window.scrollY >= sectionTop - 150){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }

    });

});