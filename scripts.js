function configureNavbarAutoCollapse() {
    const hideNavbar = () => {
        $(".navbar").css("top", "-65px");
    };

    const showNavbar = () => {
        $(".navbar").css("top", "0");
    };

    const navbarOnScroll = () => {
        const timeout = () => {
            console.log("timeout");
            if (!$(".navbar").is(":hover")) {
                hideNavbar();
            }
        };

        showNavbar();
        clearTimeout(timeout);
        setTimeout(timeout, 1000);
    };
    if ($(window).width() < 768) return;
    $(window).scroll(navbarOnScroll);

    if ($(window).width() < 768) return;
    $(".navbar").mouseenter(showNavbar);
    $(".navbar").mouseleave(hideNavbar);
}

function loadFonts() {
    const chintzyFont = new FontFace("Chintzy", "url(assets/fonts/chintzy.ttf)");
    const whiteRabbitFont = new FontFace("White Rabbit", "url(assets/fonts/white-rabbit.ttf)");

    chintzyFont.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
    });

    whiteRabbitFont.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
    });
}

function heroTypewriter() {
    const stepLengthMs = 100;
    function typewrite(elementId, text) {
        const element = $(elementId);
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.text(element.text() + text[index]);
                index++;
                setTimeout(type, stepLengthMs);
            }
        }
        type();
    }

    const titleText = "Hi, There!  I'm Bryce";
    const subtitleText = "I'm a Software Developer.";

    // typewrite the title and once it's done, typewrite the subtitle
    typewrite("#hero-title", titleText);

    setTimeout(() => {
        typewrite("#hero-subtitle", subtitleText);
    }, titleText.length * stepLengthMs);
}

function animateOnFirstInteraction() {
    // animated classes have the "animated__{animation-name}" class
    // on intersection, add the {animation-name} animation to the element
    const animatedElements = document.querySelectorAll(".animated");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationName = entry.target.classList.forEach(className => {
                    if (className.startsWith("animated__")) {
                        const animationName = className.split("__")[1];
                        entry.target.style.animation = `${animationName} 2s ease-in-out`;
                        observer.unobserve(entry.target);
                    }
                });
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

$(document).ready(() => {
    loadFonts();
    configureNavbarAutoCollapse();
    heroTypewriter();
    animateOnFirstInteraction();
});
