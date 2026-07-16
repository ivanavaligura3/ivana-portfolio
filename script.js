//EMAILJS

(function(){

emailjs.init({
    publicKey:"mSbJfpSxD4Tjs4P-Z",
});

})();


const form = document.getElementById("contact-form");


form.addEventListener("submit", function(event){

    event.preventDefault();


    emailjs.sendForm(
        "portfolio",
        "template_eyaaj1q",
        this
    )
    .then(()=>{


    const message = document.querySelector(".form-message");

    message.textContent =
    "✓ Message sent successfully! I'll get back to you soon.";

    message.classList.add("show");

        form.reset();
    })

    .catch((error)=>{

    message.textContent =
    "Something went wrong. Please try again.";

    message.classList.add("show");

    console.log(error);

    });

});

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


// ================= PROJECT GALLERIES =================

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

    totalImages.textContent = images.length;

    function render() {

        img.classList.add("change");

        setTimeout(() => {

            img.src = images[current];

            currentImage.textContent = current + 1;

            img.classList.remove("change");

        },180);

    }

    next.addEventListener("click", () => {

        current++;

        if(current >= images.length){
            current = 0;
        }

        render();

    });

    prev.addEventListener("click", () => {

        current--;

        if(current < 0){
            current = images.length - 1;
        }

        render();

    });


    // ------------------------
    // SWIPE
    // ------------------------

    let startX = 0;

    img.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

    });

    img.addEventListener("touchend",(e)=>{

        const endX = e.changedTouches[0].clientX;

        const distance = startX - endX;

        if(Math.abs(distance) < 40) return;

        if(distance > 0){

            current++;

            if(current >= images.length){
                current = 0;
            }

        }else{

            current--;

            if(current < 0){
                current = images.length - 1;
            }

        }

        render();

    });

});