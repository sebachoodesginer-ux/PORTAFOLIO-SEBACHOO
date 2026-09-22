document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const body = document.body;
    const html = document.documentElement;

    const creativeMode =
        document.getElementById("creativeMode");

    const filterButtons =
        Array.from(
            document.querySelectorAll(".project-filter")
        );

    const projectCards =
        Array.from(
            document.querySelectorAll(".project-card")
        );

    const backToTop =
        document.getElementById("backToTop");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       FILTRO RESPONSIVE
    ====================================================== */

    const mobileFilterToggle =
        document.getElementById(
            "mobileFilterToggle"
        );

    const mobileFilterCurrent =
        document.getElementById(
            "mobileFilterCurrent"
        );

    const mobileFilterNumber =
        document.getElementById(
            "mobileFilterNumber"
        );

    const projectFilters =
        document.getElementById(
            "projectFilters"
        );


    /* =====================================================
       AÑO
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESTADO DE CARGA
    ====================================================== */

    body.classList.remove("page-loading");
    body.classList.remove("intro-active");


    /* =====================================================
       REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".projects-reveal"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "projects-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.06,
                    rootMargin:
                        "0px 0px -25px 0px"
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "projects-visible"
            );

        });

    }


    /* =====================================================
       FILTRAR
    ====================================================== */

    function filterProjects(selectedFilter) {

        projectCards.forEach((card) => {

            const categories =
                (card.dataset.category || "")
                    .split(" ")
                    .filter(Boolean);


            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(
                    selectedFilter
                );


            card.classList.toggle(
                "project-hidden",
                !shouldShow
            );


            if (shouldShow) {

                card.classList.add(
                    "projects-visible"
                );

            }

        });

    }


    /* =====================================================
       ABRIR DESPLEGABLE
    ====================================================== */

    function openMobileFilters() {

        if (
            !projectFilters ||
            !mobileFilterToggle
        ) {
            return;
        }


        projectFilters.classList.add(
            "mobile-open"
        );

        mobileFilterToggle.classList.add(
            "open"
        );

        mobileFilterToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /* =====================================================
       CERRAR DESPLEGABLE
    ====================================================== */

    function closeMobileFilters() {

        if (
            !projectFilters ||
            !mobileFilterToggle
        ) {
            return;
        }


        projectFilters.classList.remove(
            "mobile-open"
        );

        mobileFilterToggle.classList.remove(
            "open"
        );

        mobileFilterToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       CLICK EN BOTÓN PRINCIPAL
    ====================================================== */

    if (
        mobileFilterToggle &&
        projectFilters
    ) {

        mobileFilterToggle.addEventListener(
            "click",
            () => {

                const open =
                    projectFilters.classList.contains(
                        "mobile-open"
                    );


                if (open) {

                    closeMobileFilters();

                } else {

                    openMobileFilters();

                }

            }
        );

    }


    /* =====================================================
       BOTONES DE CATEGORÍAS
    ====================================================== */

    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter || "all";


                /* QUITAR ACTIVO */

                filterButtons.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });


                /* NUEVO ACTIVO */

                button.classList.add(
                    "active"
                );


                /* FILTRAR */

                filterProjects(
                    selectedFilter
                );


                /* =================================================
                   TEXTO DEL SELECTOR
                ================================================= */

                const name =
                    button.querySelector(
                        ".filter-name"
                    );

                const number =
                    button.querySelector(
                        ".filter-index"
                    );


                if (
                    mobileFilterCurrent &&
                    name
                ) {

                    mobileFilterCurrent.textContent =
                        name.textContent.trim();

                }


                if (
                    mobileFilterNumber &&
                    number
                ) {

                    mobileFilterNumber.textContent =
                        number.textContent.trim();

                }


                /* =================================================
                   CERRAR AUTOMÁTICAMENTE EN MÓVIL
                ================================================= */

                if (
                    window.matchMedia(
                        "(max-width: 800px)"
                    ).matches
                ) {

                    closeMobileFilters();

                }

            }
        );

    });


    /* =====================================================
       CLICK FUERA DEL SELECTOR
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (window.innerWidth > 800) {
                return;
            }


            if (
                !projectFilters ||
                !mobileFilterToggle
            ) {
                return;
            }


            const clickedToggle =
                mobileFilterToggle.contains(
                    event.target
                );


            const clickedMenu =
                projectFilters.contains(
                    event.target
                );


            if (
                !clickedToggle &&
                !clickedMenu
            ) {

                closeMobileFilters();

            }

        }
    );


    /* =====================================================
       ESC
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileFilters();

            }

        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(() => {

                    if (
                        window.innerWidth > 800
                    ) {

                        closeMobileFilters();

                    }

                }, 120);

        },
        {
            passive: true
        }
    );


    /* =====================================================
       MODO CREATIVO
    ====================================================== */

    function creativeIsActive() {

        const buttonPressed =
            creativeMode &&
            creativeMode.getAttribute(
                "aria-pressed"
            ) === "true";


        const creativeClasses = [

            "creative-mode",
            "creative-active",
            "creative-mode-active",
            "creative",
            "modo-creativo"

        ];


        const classActive =
            creativeClasses.some(
                (className) => {

                    return (
                        body.classList.contains(
                            className
                        ) ||
                        html.classList.contains(
                            className
                        )
                    );

                }
            );


        return (
            buttonPressed ||
            classActive
        );

    }


    function syncCreativeMode() {

        body.classList.toggle(
            "creative-on",
            creativeIsActive()
        );

    }


    syncCreativeMode();


    /* =====================================================
       OBSERVAR BOTÓN CREATIVO
    ====================================================== */

    if (
        creativeMode &&
        "MutationObserver" in window
    ) {

        const creativeButtonObserver =
            new MutationObserver(
                syncCreativeMode
            );


        creativeButtonObserver.observe(
            creativeMode,
            {
                attributes: true,
                attributeFilter: [
                    "aria-pressed",
                    "class"
                ]
            }
        );

    }


    /* =====================================================
       OBSERVAR BODY Y HTML
    ====================================================== */

    if ("MutationObserver" in window) {

        const classObserver =
            new MutationObserver(
                syncCreativeMode
            );


        classObserver.observe(
            body,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );


        classObserver.observe(
            html,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }


    /* =====================================================
       VOLVER ARRIBA
    ====================================================== */

    if (backToTop) {

        function updateBackToTop() {

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


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       PAUSAR ANIMACIONES
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            body.classList.toggle(
                "animations-paused",
                document.hidden
            );

        }
    );


    /* =====================================================
       IMÁGENES
    ====================================================== */

    document
        .querySelectorAll(
            ".projects-page img"
        )
        .forEach((image) => {

            image.setAttribute(
                "draggable",
                "false"
            );

        });


    /* =====================================================
       ESTADO INICIAL
    ====================================================== */

    filterProjects("all");

});