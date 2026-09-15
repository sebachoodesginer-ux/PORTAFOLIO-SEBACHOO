/* =========================================================
   ELEMENTOS
========================================================= */

const body =
    document.body;


const header =
    document.getElementById(
        "siteHeader"
    );


const headerBrand =
    document.getElementById(
        "headerBrand"
    );


const creativeMode =
    document.getElementById(
        "creativeMode"
    );


const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mainNav =
    document.getElementById(
        "mainNav"
    );


const currentYear =
    document.getElementById(
        "currentYear"
    );


const backToTop =
    document.getElementById(
        "backToTop"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   INTRO
========================================================= */

const intro =
    document.getElementById(
        "intro"
    );


const introLogo =
    document.getElementById(
        "introLogo"
    );


function playIntro() {


    if (
        !intro ||
        !introLogo ||
        !headerBrand
    ) {

        body.classList.remove(
            "page-loading"
        );

        return;

    }


    const entrance =
        introLogo.animate(

            [

                {

                    opacity: 0,

                    transform:
                        "scale(.4) rotate(-6deg)"

                },

                {

                    opacity: 1,

                    transform:
                        "scale(1.08) rotate(1deg)",

                    offset: .72

                },

                {

                    opacity: 1,

                    transform:
                        "scale(1)"

                }

            ],

            {

                duration: 820,

                easing:
                    "cubic-bezier(.22,.9,.25,1)",

                fill:
                    "forwards"

            }

        );


    entrance.finished

        .then(() => {


            return new Promise(
                resolve => {


                    setTimeout(
                        resolve,
                        160
                    );


                }
            );


        })

        .then(() => {


            const destination =
                headerBrand
                    .getBoundingClientRect();


            const logoRect =
                introLogo
                    .getBoundingClientRect();


            const dx =
                destination.left -
                logoRect.left;


            const dy =
                destination.top -
                logoRect.top;


            const scale =
                destination.width /
                logoRect.width;


            return introLogo.animate(

                [

                    {

                        transform:
                            "translate(0,0) scale(1)"

                    },

                    {

                        transform:
                            `translate(
                                ${dx * .35}px,
                                ${dy * .2 - 55}px
                            )
                            scale(.82)`,

                        offset: .35

                    },

                    {

                        transform:
                            `translate(
                                ${dx}px,
                                ${dy}px
                            )
                            scale(${scale})`

                    }

                ],

                {

                    duration: 800,

                    easing:
                        "cubic-bezier(.28,.08,.2,1)",

                    fill:
                        "forwards"

                }

            ).finished;


        })

        .then(() => {


            intro.classList.add(
                "finished"
            );


            body.classList.remove(
                "page-loading"
            );


        })

        .catch(() => {


            intro.classList.add(
                "finished"
            );


            body.classList.remove(
                "page-loading"
            );


        });

}

/* =========================================================
   INTRO - SOLO ESCRITORIO
========================================================= */

window.addEventListener(
    "load",
    () => {

        if (
            window.innerWidth <= 700
        ) {

            if (intro) {

                intro.classList.add(
                    "finished"
                );

            }

            body.classList.remove(
                "page-loading"
            );

            return;

        }


        playIntro();

    }
);



/* =========================================================
   CURSOR
========================================================= */

const customCursor =
    document.getElementById(
        "customCursor"
    );


const finePointer =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    customCursor &&
    finePointer
) {


    const interactiveSelector = [

        "a",
        "button",
        ".project-card",
        ".area-item"

    ].join(",");


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener(
        "mousemove",
        event => {


            mouseX =
                event.clientX;


            mouseY =
                event.clientY;


            customCursor.classList.add(
                "visible"
            );


            const interactive =
                event.target.closest(
                    interactiveSelector
                );


            customCursor.classList.toggle(
                "is-link",
                Boolean(interactive)
            );


        },
        {
            passive: true
        }
    );


    function animateCursor() {


        cursorX +=
            (
                mouseX -
                cursorX
            ) * .32;


        cursorY +=
            (
                mouseY -
                cursorY
            ) * .32;


        customCursor.style.left =
            `${cursorX}px`;


        customCursor.style.top =
            `${cursorY}px`;


        requestAnimationFrame(
            animateCursor
        );


    }


    animateCursor();


}



/* =========================================================
   MODO CREATIVO
========================================================= */

const savedCreativeMode =
    localStorage.getItem(
        "sebachoCreativeMode"
    );


if (
    savedCreativeMode === "true"
) {

    body.classList.add(
        "creative-on"
    );

}


function updateCreativeButton() {


    if (!creativeMode) {

        return;

    }


    const enabled =
        body.classList.contains(
            "creative-on"
        );


    creativeMode.setAttribute(
        "aria-pressed",
        enabled
            ? "true"
            : "false"
    );


    creativeMode.setAttribute(
        "aria-label",
        enabled
            ? "Desactivar modo creativo"
            : "Activar modo creativo"
    );


}


updateCreativeButton();


if (creativeMode) {


    creativeMode.addEventListener(
        "click",
        () => {


            body.classList.toggle(
                "creative-on"
            );


            const enabled =
                body.classList.contains(
                    "creative-on"
                );


            localStorage.setItem(
                "sebachoCreativeMode",
                enabled
            );


            updateCreativeButton();


            creativeMode.animate(

                [

                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(.9) rotate(-3deg)"
                    },

                    {
                        transform:
                            "scale(1.08) rotate(2deg)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }

                ],

                {

                    duration: 420,

                    easing:
                        "cubic-bezier(.34,1.56,.64,1)"

                }

            );


        }
    );


}



/* =========================================================
   MENU MOBILE
========================================================= */

function closeMobileMenu() {


    if (
        !mobileMenuButton ||
        !mainNav
    ) {

        return;

    }


    mainNav.classList.remove(
        "open"
    );


    mobileMenuButton.classList.remove(
        "open"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    body.classList.remove(
        "menu-open"
    );


}


if (
    mobileMenuButton &&
    mainNav
) {


    mobileMenuButton.addEventListener(
        "click",
        () => {


            const open =
                mainNav.classList.toggle(
                    "open"
                );


            mobileMenuButton.classList.toggle(
                "open",
                open
            );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );


            body.classList.toggle(
                "menu-open",
                open
            );


        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(
            link => {


                link.addEventListener(
                    "click",
                    closeMobileMenu
                );


            }
        );


}



/* =========================================================
   HEADER SCROLL
========================================================= */

let previousScroll =
    window.scrollY;


let scrollTicking =
    false;


function updateHeader() {


    if (!header) {

        scrollTicking =
            false;

        return;

    }


    const current =
        window.scrollY;


    if (
        current <
        55
    ) {


        header.classList.remove(
            "header-hidden"
        );


        header.classList.add(
            "header-visible"
        );


        previousScroll =
            current;


        scrollTicking =
            false;


        return;

    }


    if (
        current >
        previousScroll + 7
    ) {


        header.classList.add(
            "header-hidden"
        );


        header.classList.remove(
            "header-visible"
        );


    }


    else if (
        current <
        previousScroll - 7
    ) {


        header.classList.remove(
            "header-hidden"
        );


        header.classList.add(
            "header-visible"
        );


    }


    previousScroll =
        Math.max(
            0,
            current
        );


    scrollTicking =
        false;


}


window.addEventListener(
    "scroll",
    () => {


        if (!scrollTicking) {


            requestAnimationFrame(
                updateHeader
            );


            scrollTicking =
                true;


        }


    },
    {
        passive: true
    }
);



/* =========================================================
   VOLVER ARRIBA
========================================================= */

function updateBackToTop() {


    if (!backToTop) {

        return;

    }


    backToTop.classList.toggle(
        "visible",
        window.scrollY > 500
    );


}


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


updateBackToTop();


if (backToTop) {


    backToTop.addEventListener(
        "click",
        () => {


            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });


        }
    );


}



/* =========================================================
   REVEAL
========================================================= */

const revealItems =
    document.querySelectorAll(
        ".reveal-item"
    );


if (
    "IntersectionObserver"
    in window
) {


    const revealObserver =
        new IntersectionObserver(

            entries => {


                entries.forEach(
                    entry => {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );


                        }


                    }
                );


            },

            {

                threshold: .1,

                rootMargin:
                    "0px 0px -35px 0px"

            }

        );


    revealItems.forEach(
        element => {


            revealObserver.observe(
                element
            );


        }
    );


}

else {


    revealItems.forEach(
        element => {


            element.classList.add(
                "is-visible"
            );


        }
    );


}



/* =========================================================
   CANVAS
========================================================= */

function createCanvasSystem(
    canvas
) {


    const ctx =
        canvas.getContext(
            "2d",
            {
                alpha: true
            }
        );


    let width = 0;
    let height = 0;


    function resize() {


        const rect =
            canvas
                .getBoundingClientRect();


        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                1.35
            );


        width =
            rect.width;


        height =
            rect.height;


        canvas.width =
            Math.max(
                1,
                Math.floor(
                    width *
                    ratio
                )
            );


        canvas.height =
            Math.max(
                1,
                Math.floor(
                    height *
                    ratio
                )
            );


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


    }


    return {

        ctx,

        resize,

        width() {

            return width;

        },

        height() {

            return height;

        }

    };


}



/* =========================================================
   PARTICULAS GENERALES
========================================================= */

const globalCanvas =
    document.getElementById(
        "globalParticles"
    );


if (globalCanvas) {


    const canvas =
        createCanvasSystem(
            globalCanvas
        );


    const ctx =
        canvas.ctx;


    let particles = [];


    function createParticle(
        randomY = true
    ) {


        const emphasis =
            Math.random();


        return {


            x:
                Math.random() *
                canvas.width(),


            y:
                randomY

                    ? Math.random() *
                      canvas.height()

                    : canvas.height() +
                      15,


            size:

                emphasis > .82

                    ? Math.random() *
                      2.4 +
                      2.5

                    : Math.random() *
                      2 +
                      1,


            speed:
                Math.random() *
                .58 +
                .2,


            drift:
                (
                    Math.random() -
                    .5
                ) *
                .35,


            type:
                Math.random(),


            alpha:

                emphasis > .82

                    ? Math.random() *
                      .22 +
                      .58

                    : Math.random() *
                      .3 +
                      .3


        };


    }


    function resetParticles() {


        canvas.resize();


        particles = [];


        const creative =
            body.classList.contains(
                "creative-on"
            );


        let total;


        if (
            window.innerWidth <
            700
        ) {


            total =
                creative
                    ? 88
                    : 72;


        }

        else {


            total =
                creative
                    ? 175
                    : 145;


        }


        for (
            let i = 0;
            i < total;
            i++
        ) {


            particles.push(
                createParticle()
            );


        }


    }


    function animateParticles() {


        if (
            document.hidden
        ) {


            requestAnimationFrame(
                animateParticles
            );


            return;


        }


        ctx.clearRect(
            0,
            0,
            canvas.width(),
            canvas.height()
        );


        const creative =
            body.classList.contains(
                "creative-on"
            );


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {


            const particle =
                particles[i];


            particle.y -=
                particle.speed;


            particle.x +=
                particle.drift;


            if (
                particle.y <
                -15
            ) {


                Object.assign(
                    particle,
                    createParticle(
                        false
                    )
                );


            }


            if (
                particle.x <
                -20
            ) {


                particle.x =
                    canvas.width() + 10;


            }


            if (
                particle.x >
                canvas.width() + 20
            ) {


                particle.x =
                    -10;


            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            if (creative) {


                if (
                    particle.type <
                    .42
                ) {


                    ctx.fillStyle =
                        `rgba(
                            238,
                            31,
                            31,
                            ${particle.alpha}
                        )`;


                }

                else if (
                    particle.type <
                    .72
                ) {


                    ctx.fillStyle =
                        `rgba(
                            0,
                            237,
                            255,
                            ${Math.min(
                                particle.alpha + .08,
                                .9
                            )}
                        )`;


                }

                else {


                    ctx.fillStyle =
                        `rgba(
                            255,
                            255,
                            255,
                            ${Math.min(
                                particle.alpha + .12,
                                .95
                            )}
                        )`;


                }


            }

            else {


                if (
                    particle.type <
                    .72
                ) {


                    ctx.fillStyle =
                        `rgba(
                            238,
                            31,
                            31,
                            ${particle.alpha}
                        )`;


                }

                else {


                    ctx.fillStyle =
                        `rgba(
                            255,
                            255,
                            255,
                            ${Math.min(
                                particle.alpha + .12,
                                .9
                            )}
                        )`;


                }


            }


            ctx.fill();


        }


        requestAnimationFrame(
            animateParticles
        );


    }


    resetParticles();


    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {


            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    resetParticles,
                    180
                );


        }
    );


    if (creativeMode) {


        creativeMode.addEventListener(
            "click",
            () => {


                setTimeout(
                    resetParticles,
                    70
                );


            }
        );


    }


    animateParticles();


}



/* =========================================================
   PARTICULAS FOOTER
========================================================= */

const footerCanvas =
    document.getElementById(
        "footerFire"
    );


if (footerCanvas) {


    const canvas =
        createCanvasSystem(
            footerCanvas
        );


    const ctx =
        canvas.ctx;


    let sparks = [];


    function createSpark(
        randomY = true
    ) {


        return {


            x:
                Math.random() *
                canvas.width(),


            y:
                randomY

                    ? Math.random() *
                      canvas.height()

                    : canvas.height(),


            radius:
                Math.random() *
                2.5 +
                .7,


            speed:
                Math.random() *
                .85 +
                .3,


            drift:
                (
                    Math.random() -
                    .5
                ) *
                .28,


            alpha:
                Math.random() *
                .45 +
                .18,


            glow:
                Math.random()


        };


    }


    function resetFooter() {


        canvas.resize();


        sparks = [];


        const total =
            window.innerWidth <
            700

                ? 34

                : 68;


        for (
            let i = 0;
            i < total;
            i++
        ) {


            sparks.push(
                createSpark(
                    true
                )
            );


        }


    }


    function animateFooter() {


        if (
            document.hidden
        ) {


            requestAnimationFrame(
                animateFooter
            );


            return;


        }


        ctx.clearRect(
            0,
            0,
            canvas.width(),
            canvas.height()
        );


        for (
            let i = 0;
            i < sparks.length;
            i++
        ) {


            const spark =
                sparks[i];


            spark.y -=
                spark.speed;


            spark.x +=
                spark.drift;


            if (
                spark.y <
                -12
            ) {


                Object.assign(
                    spark,
                    createSpark(
                        false
                    )
                );


            }


            ctx.beginPath();


            ctx.arc(
                spark.x,
                spark.y,
                spark.radius,
                0,
                Math.PI * 2
            );


            if (
                spark.glow >
                .82
            ) {


                ctx.fillStyle =
                    `rgba(
                        255,
                        130,
                        130,
                        ${spark.alpha}
                    )`;


            }

            else {


                ctx.fillStyle =
                    `rgba(
                        255,
                        35,
                        35,
                        ${spark.alpha}
                    )`;


            }


            ctx.fill();


        }


        requestAnimationFrame(
            animateFooter
        );


    }


    resetFooter();


    let footerResizeTimer;


    window.addEventListener(
        "resize",
        () => {


            clearTimeout(
                footerResizeTimer
            );


            footerResizeTimer =
                setTimeout(
                    resetFooter,
                    180
                );


        }
    );


    animateFooter();


}



/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {


        if (
            window.innerWidth >
            900
        ) {


            closeMobileMenu();


        }


    }
);