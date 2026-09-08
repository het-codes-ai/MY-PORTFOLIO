/* =========================================================
   HET MODI PORTFOLIO
   JavaScript
========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuButton.classList.toggle("open");

});


/* Close menu when clicking a link */

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuButton.classList.remove("open");

    });

});


/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();


/* ================= TERMINAL TYPING ================= */

const typingElement = document.getElementById("typingCommand");

const commands = [
    "whoami",
    "build --project",
    "solve --daily",
    "learn --repeat",
    "git push origin main"
];

let commandIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeCommand() {

    const currentCommand = commands[commandIndex];

    if (!deleting) {

        typingElement.textContent =
            currentCommand.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentCommand.length) {

            deleting = true;

            setTimeout(typeCommand, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentCommand.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1) % commands.length;

        }

    }

    setTimeout(
        typeCommand,
        deleting ? 45 : 90
    );
}


typeCommand();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= COUNTER ANIMATION ================= */

const counters =
    document.querySelectorAll(".stat-number[data-target]");


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 40)
                    );


                function updateCounter() {

                    current += increment;

                    if (current >= target) {

                        counter.textContent = target;

                        return;
                    }

                    counter.textContent = current;

                    requestAnimationFrame(updateCounter);
                }


                updateCounter();

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.7
        }
    );


counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/* ================= CURSOR GLOW ================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* ================= PROJECT CARD TILT ================= */

const projectCard =
    document.querySelector(".project-card");


const busInterface =
    document.querySelector(".bus-interface");


if (projectCard && busInterface) {

    projectCard.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 900) {
                return;
            }

            const rect =
                projectCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;


            busInterface.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;

        }
    );


    projectCard.addEventListener(
        "mouseleave",
        () => {

            busInterface.style.transform =
                "rotate(2deg)";

        }
    );

}


/* ================= ACTIVE NAV ================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navItems.forEach((item) => {

                        item.classList.remove("active");

                        if (
                            item.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {

                            item.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-40% 0px -55% 0px"
        }
    );


sections.forEach((section) => {

    navObserver.observe(section);

});
