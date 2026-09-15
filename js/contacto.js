/* =========================================================
   CONTACTO — SEBACHO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           CONFIGURACIÓN
        ====================================================== */

        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbyS9J0yTPmjeV-ytr6wmb5F0Lri7Zkyjmgqw7JbfrgVKqWiyetRYtlhdP0nrl_BK1e9/exec";


        const GOOGLE_CALENDAR_URL =
            "https://calendar.app.google/RkL6dtPsdtdWEwFr6";


        const GOOGLE_MAP_URL =
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5023.796458089831!2d-74.12257592407347!3d4.484460995489904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3fa30019504277%3A0x2c25ce6161e794c5!2sTres%20quebradas!5e1!3m2!1ses!2sco!4v1789482176944!5m2!1ses!2sco";


        /* =====================================================
           ELEMENTOS
        ====================================================== */

        const body =
            document.body;


        const creativeButton =
            document.getElementById(
                "creativeMode"
            );


        const form =
            document.getElementById(
                "contactForm"
            );


        const submitButton =
            document.getElementById(
                "contactSubmitButton"
            );


        const nameInput =
            document.getElementById(
                "contactName"
            );


        const emailInput =
            document.getElementById(
                "contactEmail"
            );


        const projectInput =
            document.getElementById(
                "contactProject"
            );


        const messageInput =
            document.getElementById(
                "contactMessage"
            );


        /* =====================================================
           PÁGINA LISTA
        ====================================================== */

        body.classList.remove(
            "page-loading"
        );


        document
            .getElementById("intro")
            ?.remove();


        requestAnimationFrame(
            () => {

                body.classList.add(
                    "contact-ready"
                );

            }
        );


        /* =====================================================
           AÑO
        ====================================================== */

        const year =
            document.getElementById(
                "currentYear"
            );


        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        /* =====================================================
           MODO CREATIVO
        ====================================================== */

        let creativeSyncFrame =
            null;


        function detectCreativeMode() {

            const html =
                document.documentElement;


            const buttonActive =
                creativeButton
                    ?.getAttribute(
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


        function syncCreativeMode() {

            creativeSyncFrame =
                null;


            const active =
                detectCreativeMode();


            if (
                active &&
                !body.classList.contains(
                    "creative-on"
                )
            ) {

                body.classList.add(
                    "creative-on"
                );

            }


            if (
                !active &&
                body.classList.contains(
                    "creative-on"
                )
            ) {

                body.classList.remove(
                    "creative-on"
                );

            }

        }


        function requestCreativeSync() {

            if (creativeSyncFrame) {
                return;
            }


            creativeSyncFrame =
                requestAnimationFrame(
                    syncCreativeMode
                );

        }


        syncCreativeMode();


        const creativeObserver =
            new MutationObserver(
                requestCreativeSync
            );


        creativeObserver.observe(
            document.documentElement,
            {
                attributes: true,
                attributeFilter: [
                    "class"
                ]
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
           TOAST
        ====================================================== */

        const toast =
            document.getElementById(
                "contactToast"
            );


        const toastMessage =
            document.getElementById(
                "contactToastMessage"
            );


        const toastKicker =
            document.getElementById(
                "contactToastKicker"
            );


        const toastClose =
            document.getElementById(
                "contactToastClose"
            );


        let toastTimer =
            null;


        function hideToast() {

            if (!toast) {
                return;
            }


            toast.classList.remove(
                "show"
            );


            if (toastTimer) {

                clearTimeout(
                    toastTimer
                );

                toastTimer =
                    null;

            }

        }


        function showToast(
            message,
            type = "loading",
            duration = 0
        ) {

            if (!toast) {
                return;
            }


            if (toastTimer) {

                clearTimeout(
                    toastTimer
                );

            }


            toast.classList.remove(
                "success",
                "error"
            );


            if (
                type === "success" ||
                type === "error"
            ) {

                toast.classList.add(
                    type
                );

            }


            if (toastMessage) {

                toastMessage.textContent =
                    message;

            }


            if (toastKicker) {

                if (
                    type === "success"
                ) {

                    toastKicker.textContent =
                        "LISTO";

                }

                else if (
                    type === "error"
                ) {

                    toastKicker.textContent =
                        "UPS";

                }

                else {

                    toastKicker.textContent =
                        "SEBACHO";

                }

            }


            toast.classList.add(
                "show"
            );


            if (duration > 0) {

                toastTimer =
                    setTimeout(
                        hideToast,
                        duration
                    );

            }

        }


        toastClose
            ?.addEventListener(
                "click",
                hideToast
            );


        /* =====================================================
           VALIDACIÓN EMAIL
        ====================================================== */

        function validEmail(
            email
        ) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email);

        }


        /* =====================================================
           FORMULARIO
        ====================================================== */

        form?.addEventListener(
            "submit",
            async event => {


                event.preventDefault();


                const nombre =
                    nameInput
                        ?.value
                        .trim();


                const correo =
                    emailInput
                        ?.value
                        .trim();


                const proyecto =
                    projectInput
                        ?.value;


                const mensaje =
                    messageInput
                        ?.value
                        .trim();


                if (
                    !nombre ||
                    !correo ||
                    !proyecto ||
                    !mensaje
                ) {

                    showToast(
                        "COMPLETA TODOS LOS CAMPOS",
                        "error",
                        3500
                    );

                    return;

                }


                if (
                    !validEmail(
                        correo
                    )
                ) {

                    showToast(
                        "ESCRIBE UN CORREO VÁLIDO",
                        "error",
                        3500
                    );

                    return;

                }


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton
                        .classList
                        .add(
                            "is-sending"
                        );

                }


                showToast(
                    "ENVIANDO MENSAJE..."
                );


                const data =
                    new URLSearchParams();


                data.append(
                    "nombre",
                    nombre
                );


                data.append(
                    "correo",
                    correo
                );


                data.append(
                    "proyecto",
                    proyecto
                );


                data.append(
                    "mensaje",
                    mensaje
                );


                data.append(
                    "origen",
                    "Sebacho Portafolio"
                );


                data.append(
                    "fecha",
                    new Date()
                        .toLocaleString(
                            "es-CO"
                        )
                );


                try {

                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {
                            method:
                                "POST",

                            mode:
                                "no-cors",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded;charset=UTF-8"
                            },

                            body:
                                data.toString()
                        }
                    );


                    showToast(
                        "¡MENSAJE ENVIADO!",
                        "success",
                        5000
                    );


                    form.reset();

                }

                catch (error) {

                    console.error(
                        "Error al enviar:",
                        error
                    );


                    showToast(
                        "NO SE PUDO ENVIAR",
                        "error",
                        4500
                    );

                }

                finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;


                        submitButton
                            .classList
                            .remove(
                                "is-sending"
                            );

                    }

                }

            }
        );


        /* =====================================================
           MODALES
        ====================================================== */

        const calendarModal =
            document.getElementById(
                "calendarModal"
            );


        const locationModal =
            document.getElementById(
                "locationModal"
            );


        const calendarContainer =
            document.getElementById(
                "calendarContainer"
            );


        const mapContainer =
            document.getElementById(
                "mapContainer"
            );


        const openCalendar =
            document.getElementById(
                "openCalendarModal"
            );


        const closeCalendar =
            document.getElementById(
                "closeCalendarModal"
            );


        const openLocation =
            document.getElementById(
                "openLocationModal"
            );


        const closeLocation =
            document.getElementById(
                "closeLocationModal"
            );


        let currentModal =
            null;


        let lastFocusedElement =
            null;


        /* =====================================================
           CREAR IFRAME
        ====================================================== */

        function createFrame(
            container,
            src,
            title,
            type
        ) {

            if (!container) {
                return null;
            }


            const existing =
                container.querySelector(
                    "iframe"
                );


            if (existing) {
                return existing;
            }


            const frame =
                document.createElement(
                    "iframe"
                );


            frame.className =
                "seb-google-frame";


            frame.title =
                title;


            frame.loading =
                "lazy";


            frame.referrerPolicy =
                "strict-origin-when-cross-origin";


            frame.setAttribute(
                "frameborder",
                "0"
            );


            frame.setAttribute(
                "allowfullscreen",
                ""
            );


            if (
                type === "calendar"
            ) {

                frame.setAttribute(
                    "allow",
                    "clipboard-write"
                );

            }


            frame.addEventListener(
                "load",
                () => {

                    const loader =
                        container
                            .querySelector(
                                ".seb-embed-loader"
                            );


                    if (loader) {

                        loader.style.display =
                            "none";

                    }

                },
                {
                    once: true
                }
            );


            container.appendChild(
                frame
            );


            setTimeout(
                () => {

                    frame.src =
                        src;

                },
                100
            );


            return frame;

        }


        /* =====================================================
           DESTRUIR IFRAME
        ====================================================== */

        function destroyFrame(
            container
        ) {

            if (!container) {
                return;
            }


            const frame =
                container
                    .querySelector(
                        "iframe"
                    );


            if (frame) {

                frame.src =
                    "about:blank";


                frame.remove();

            }


            const loader =
                container
                    .querySelector(
                        ".seb-embed-loader"
                    );


            if (loader) {

                loader.style.display =
                    "";

            }

        }


        /* =====================================================
           ABRIR MODAL
        ====================================================== */

        function openModal(
            modal
        ) {

            if (!modal) {
                return;
            }


            if (
                currentModal &&
                currentModal !== modal
            ) {

                closeModal(
                    currentModal
                );

            }


            lastFocusedElement =
                document.activeElement;


            currentModal =
                modal;


            body.classList.add(
                "seb-modal-open"
            );


            modal.classList.add(
                "is-open"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            const closeButton =
                modal.querySelector(
                    ".seb-modal-close"
                );


            setTimeout(
                () => {

                    closeButton
                        ?.focus();

                },
                70
            );

        }


        /* =====================================================
           CERRAR MODAL
        ====================================================== */

        function closeModal(
            modal
        ) {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "is-open"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            body.classList.remove(
                "seb-modal-open"
            );


            if (
                currentModal === modal
            ) {

                currentModal =
                    null;

            }


            setTimeout(
                () => {

                    if (
                        modal ===
                        calendarModal
                    ) {

                        destroyFrame(
                            calendarContainer
                        );

                    }


                    if (
                        modal ===
                        locationModal
                    ) {

                        destroyFrame(
                            mapContainer
                        );

                    }

                },
                250
            );


            if (
                lastFocusedElement
            ) {

                setTimeout(
                    () => {

                        lastFocusedElement
                            ?.focus?.();

                    },
                    80
                );

            }

        }


        /* =====================================================
           CALENDARIO
        ====================================================== */

        openCalendar
            ?.addEventListener(
                "click",
                () => {

                    openModal(
                        calendarModal
                    );


                    createFrame(
                        calendarContainer,
                        GOOGLE_CALENDAR_URL,
                        "Agendar una reunión con Sebacho",
                        "calendar"
                    );

                }
            );


        closeCalendar
            ?.addEventListener(
                "click",
                () => {

                    closeModal(
                        calendarModal
                    );

                }
            );


        calendarModal
            ?.querySelector(
                "[data-close-calendar]"
            )
            ?.addEventListener(
                "click",
                () => {

                    closeModal(
                        calendarModal
                    );

                }
            );


        /* =====================================================
           UBICACIÓN
        ====================================================== */

        openLocation
            ?.addEventListener(
                "click",
                () => {

                    openModal(
                        locationModal
                    );


                    createFrame(
                        mapContainer,
                        GOOGLE_MAP_URL,
                        "Ubicación Tres Quebradas",
                        "map"
                    );

                }
            );


        closeLocation
            ?.addEventListener(
                "click",
                () => {

                    closeModal(
                        locationModal
                    );

                }
            );


        locationModal
            ?.querySelector(
                "[data-close-location]"
            )
            ?.addEventListener(
                "click",
                () => {

                    closeModal(
                        locationModal
                    );

                }
            );


        /* =====================================================
           ESC
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                        "Escape" &&
                    currentModal
                ) {

                    closeModal(
                        currentModal
                    );

                }

            }
        );


        /* =====================================================
           CURSOR
        ====================================================== */

        const cursor =
            document.getElementById(
                "customCursor"
            );


        if (cursor) {

            cursor.style.zIndex =
                "2147483647";

        }


        /* =====================================================
           MAGNETIC BUTTONS
        ====================================================== */

        const finePointer =
            window.matchMedia(
                "(pointer: fine) and (min-width: 901px)"
            );


        const magneticButtons =
            document.querySelectorAll(
                ".magnetic-button"
            );


        function isCreativeAnimatedButton(
            button
        ) {

            if (
                !body.classList.contains(
                    "creative-on"
                )
            ) {

                return false;

            }


            return (

                button.classList.contains(
                    "contact-send-button"
                ) ||

                button.classList.contains(
                    "meeting-button"
                ) ||

                button.classList.contains(
                    "meeting-location"
                )

            );

        }


        if (
            finePointer.matches
        ) {

            body.classList.add(
                "magnetic-ready"
            );


            magneticButtons.forEach(
                button => {


                    let frameId =
                        null;


                    let targetX =
                        0;


                    let targetY =
                        0;


                    function updateMagnetic() {

                        frameId =
                            null;


                        if (
                            isCreativeAnimatedButton(
                                button
                            )
                        ) {

                            button.style.transform =
                                "";

                            return;

                        }


                        button.style.transform =
                            `translate3d(${targetX}px, ${targetY}px, 0)`;

                    }


                    button.addEventListener(
                        "pointermove",
                        event => {


                            if (
                                isCreativeAnimatedButton(
                                    button
                                )
                            ) {

                                return;

                            }


                            const rect =
                                button
                                    .getBoundingClientRect();


                            targetX =
                                (
                                    event.clientX -
                                    (
                                        rect.left +
                                        rect.width / 2
                                    )
                                ) * .07;


                            targetY =
                                (
                                    event.clientY -
                                    (
                                        rect.top +
                                        rect.height / 2
                                    )
                                ) * .07;


                            if (!frameId) {

                                frameId =
                                    requestAnimationFrame(
                                        updateMagnetic
                                    );

                            }

                        },
                        {
                            passive: true
                        }
                    );


                    button.addEventListener(
                        "pointerleave",
                        () => {


                            targetX =
                                0;


                            targetY =
                                0;


                            if (!frameId) {

                                frameId =
                                    requestAnimationFrame(
                                        updateMagnetic
                                    );

                            }

                        }
                    );

                }
            );

        }


        /* =====================================================
           VISIBILIDAD
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
                ".contact-layout img"
            )
            .forEach(
                image => {

                    image.draggable =
                        false;

                }
            );


        /* =====================================================
           VOLVER ARRIBA
        ====================================================== */

        const backToTop =
            document.getElementById(
                "backToTop"
            );


        if (backToTop) {


            let ticking =
                false;


            function updateBackButton() {

                backToTop
                    .classList
                    .toggle(
                        "visible",
                        window.scrollY > 500
                    );


                ticking =
                    false;

            }


            window.addEventListener(
                "scroll",
                () => {


                    if (ticking) {
                        return;
                    }


                    ticking =
                        true;


                    requestAnimationFrame(
                        updateBackButton
                    );

                },
                {
                    passive: true
                }
            );


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
           RESIZE
        ====================================================== */

        let resizeTimer =
            null;


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
                                !body
                                    .classList
                                    .contains(
                                        "creative-on"
                                    )
                            ) {

                                magneticButtons
                                    .forEach(
                                        button => {

                                            button.style.transform =
                                                "";

                                        }
                                    );

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
        ====================================================== */

        window.addEventListener(
            "pagehide",
            () => {


                if (
                    creativeSyncFrame
                ) {

                    cancelAnimationFrame(
                        creativeSyncFrame
                    );

                }


                if (
                    toastTimer
                ) {

                    clearTimeout(
                        toastTimer
                    );

                }


                creativeObserver
                    .disconnect();


                destroyFrame(
                    calendarContainer
                );


                destroyFrame(
                    mapContainer
                );

            },
            {
                once: true
            }
        );

    }
);

