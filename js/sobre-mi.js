document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const body =
        document.body;

    const html =
        document.documentElement;

    const creativeButton =
        document.getElementById("creativeMode");

    const currentYear =
        document.getElementById("currentYear");

    const backToTop =
        document.getElementById("backToTop");


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    body.classList.remove(
        "page-loading"
    );


    const intro =
        document.getElementById("intro");


    if (intro) {
        intro.remove();
    }


    /* =====================================================
       AÑO
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       VARIABLES
    ===================================================== */

    let creativeSyncFrame = null;
    let resizeTimer = null;
    let scrollFrame = null;


    const magneticElements =
        document.querySelectorAll(
            ".about-primary-button, .final-project-button"
        );


    const tools =
        document.querySelectorAll(
            ".tool-card"
        );


    const canUseMagnetic =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    /* =====================================================
       LIMPIAR TRANSFORMS
    ===================================================== */

    function clearInteractiveTransforms() {

        magneticElements.forEach(
            (element) => {

                element.style.transform = "";

            }
        );


        tools.forEach(
            (tool) => {

                tool.style.transform = "";

            }
        );

    }


    /* =====================================================
       DETECTAR MODO CREATIVO
    ===================================================== */

    function detectCreativeMode() {

        const buttonActive =
            creativeButton?.getAttribute(
                "aria-pressed"
            ) === "true";


        const bodyActive =
            body.classList.contains(
                "creative-mode"
            ) ||

            body.classList.contains(
                "creative-active"
            ) ||

            body.classList.contains(
                "creative-mode-active"
            ) ||

            body.classList.contains(
                "creative"
            ) ||

            body.classList.contains(
                "modo-creativo"
            );


        const htmlActive =
            html.classList.contains(
                "creative-mode"
            ) ||

            html.classList.contains(
                "creative-active"
            ) ||

            html.classList.contains(
                "creative-mode-active"
            ) ||

            html.classList.contains(
                "creative"
            );


        return (
            buttonActive ||
            bodyActive ||
            htmlActive
        );

    }


    /* =====================================================
       SINCRONIZAR CREATIVO
    ===================================================== */

    function syncCreativeMode() {

        creativeSyncFrame = null;


        const active =
            detectCreativeMode();


        const wasActive =
            body.classList.contains(
                "creative-on"
            );


        if (active !== wasActive) {

            body.classList.toggle(
                "creative-on",
                active
            );


            if (active) {

                clearInteractiveTransforms();

            }

        }

    }


    function requestCreativeSync() {

        if (
            creativeSyncFrame !== null
        ) {
            return;
        }


        creativeSyncFrame =
            requestAnimationFrame(
                syncCreativeMode
            );

    }


    syncCreativeMode();


    /* =====================================================
       OBSERVAR MODO CREATIVO
    ===================================================== */

    const creativeObserver =
        new MutationObserver(
            requestCreativeSync
        );


    creativeObserver.observe(
        html,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    creativeObserver.observe(
        body,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    if (creativeButton) {

        creativeObserver.observe(
            creativeButton,
            {
                attributes: true,

                attributeFilter: [
                    "class",
                    "aria-pressed"
                ]
            }
        );


        creativeButton.addEventListener(
            "click",
            () => {

                requestAnimationFrame(
                    requestCreativeSync
                );

            }
        );

    }


    /* =====================================================
       REVEAL AL HACER SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-reveal"
        );


    let revealObserver = null;


    if (
        "IntersectionObserver" in window
    ) {

        revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "about-visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },

                {
                    threshold: .08,

                    rootMargin:
                        "0px 0px -30px 0px"
                }

            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "about-visible"
                );

            }
        );

    }


    /* =====================================================
       HABILIDADES
    ===================================================== */

    const skillItems =
        document.querySelectorAll(
            ".skill-item"
        );


    function animateNumber(
        element,
        target,
        duration = 1100
    ) {

        if (!element) {
            return;
        }


        const startTime =
            performance.now();


        function updateNumber(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.round(
                    target * eased
                );


            element.textContent =
                `${value}%`;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    updateNumber
                );

            }

            else {

                element.textContent =
                    `${target}%`;

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    }


    function animateSkill(
        skillItem
    ) {

        if (
            skillItem.dataset.animated ===
            "true"
        ) {
            return;
        }


        const progress =
            skillItem.querySelector(
                ".skill-progress"
            );


        const percent =
            skillItem.querySelector(
                ".skill-percent"
            );


        if (!progress) {
            return;
        }


        const rawValue =
            Number(
                skillItem.dataset.skill
            );


        const value =
            Number.isFinite(rawValue)

                ? Math.max(
                    0,
                    Math.min(
                        rawValue,
                        100
                    )
                )

                : 0;


        skillItem.dataset.animated =
            "true";


        progress.style.width =
            "0%";


        requestAnimationFrame(
            () => {

                progress.style.width =
                    `${value}%`;

            }
        );


        animateNumber(
            percent,
            value,
            1100
        );

    }


    let skillsObserver = null;


    if (
        "IntersectionObserver" in window
    ) {

        skillsObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            animateSkill(
                                entry.target
                            );


                            skillsObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },

                {
                    threshold: .25
                }

            );


        skillItems.forEach(
            (item) => {

                skillsObserver.observe(
                    item
                );

            }
        );

    }

    else {

        skillItems.forEach(
            animateSkill
        );

    }


    /* =====================================================
       MAGNETISMO
       SOLO DESKTOP
    ===================================================== */

    if (canUseMagnetic) {

        magneticElements.forEach(
            (element) => {

                let magneticFrame = null;


                element.addEventListener(
                    "mousemove",
                    (event) => {

                        if (
                            body.classList.contains(
                                "creative-on"
                            )
                        ) {
                            return;
                        }


                        if (
                            magneticFrame !== null
                        ) {
                            return;
                        }


                        magneticFrame =
                            requestAnimationFrame(
                                () => {

                                    magneticFrame = null;


                                    const rect =
                                        element
                                            .getBoundingClientRect();


                                    const x =
                                        event.clientX -
                                        rect.left -
                                        rect.width / 2;


                                    const y =
                                        event.clientY -
                                        rect.top -
                                        rect.height / 2;


                                    element.style.transform =
                                        `translate3d(
                                            ${x * .08}px,
                                            ${y * .08}px,
                                            0
                                        )`;

                                }
                            );

                    },
                    {
                        passive: true
                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        if (
                            body.classList.contains(
                                "creative-on"
                            )
                        ) {
                            return;
                        }


                        element.style.transform = "";

                    }
                );

            }
        );

    }


    /* =====================================================
       MOVIMIENTO HERRAMIENTAS
    ===================================================== */

    if (canUseMagnetic) {

        tools.forEach(
            (tool) => {

                let toolFrame = null;


                tool.addEventListener(
                    "mousemove",
                    (event) => {

                        if (
                            body.classList.contains(
                                "creative-on"
                            )
                        ) {
                            return;
                        }


                        if (
                            toolFrame !== null
                        ) {
                            return;
                        }


                        toolFrame =
                            requestAnimationFrame(
                                () => {

                                    toolFrame = null;


                                    const rect =
                                        tool
                                            .getBoundingClientRect();


                                    const x =
                                        (
                                            event.clientX -
                                            rect.left -
                                            rect.width / 2
                                        ) * .02;


                                    const y =
                                        (
                                            event.clientY -
                                            rect.top -
                                            rect.height / 2
                                        ) * .02;


                                    tool.style.transform =
                                        `translate3d(
                                            ${x}px,
                                            ${y - 3}px,
                                            0
                                        )`;

                                }
                            );

                    },
                    {
                        passive: true
                    }
                );


                tool.addEventListener(
                    "mouseleave",
                    () => {

                        if (
                            body.classList.contains(
                                "creative-on"
                            )
                        ) {
                            return;
                        }


                        tool.style.transform = "";

                    }
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        scrollFrame = null;


        if (!backToTop) {
            return;
        }


        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    }


    function requestScrollUpdate() {

        if (
            scrollFrame !== null
        ) {
            return;
        }


        scrollFrame =
            requestAnimationFrame(
                updateBackToTop
            );

    }


    if (backToTop) {

        window.addEventListener(
            "scroll",
            requestScrollUpdate,
            {
                passive: true
            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                );

            }
        );


        updateBackToTop();

    }


    /* =====================================================
       PAUSAR ANIMACIONES
    ===================================================== */

    function handleVisibility() {

        body.classList.toggle(
            "animations-paused",
            document.hidden
        );

    }


    document.addEventListener(
        "visibilitychange",
        handleVisibility
    );


    /* =====================================================
       IMÁGENES
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            (image) => {

                image.setAttribute(
                    "draggable",
                    "false"
                );

            }
        );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        if (
                            !body.classList.contains(
                                "creative-on"
                            )
                        ) {

                            clearInteractiveTransforms();

                        }

                    },
                    160
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       LIMPIEZA
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            creativeObserver.disconnect();


            if (revealObserver) {

                revealObserver.disconnect();

            }


            if (skillsObserver) {

                skillsObserver.disconnect();

            }


            if (
                creativeSyncFrame !== null
            ) {

                cancelAnimationFrame(
                    creativeSyncFrame
                );

            }


            if (
                scrollFrame !== null
            ) {

                cancelAnimationFrame(
                    scrollFrame
                );

            }


            clearTimeout(
                resizeTimer
            );

        }
    );

});