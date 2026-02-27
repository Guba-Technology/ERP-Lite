document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MUTATION OBSERVER (Navbar / Footer)
    ================================ */
    (function () {
        const observer = new MutationObserver(() => {

            const pagehome = document.querySelector(".navbar-brand");
            if (pagehome && !pagehome.querySelector(".header-home")) {
                const Nav = document.createElement("div");
                Nav.className = "header-home";
                Nav.innerHTML = `
                    <a href="/app">
                        <img src="/assets/frappetheme/images/logos.png" class="logo-main"/>
                    </a>`;
                pagehome.append(Nav);
            }

            // const section = document.querySelector(".main-section");
            // if (section && !section.querySelector(".footer-list-main")) {
            //     const main = document.createElement("div");
            //     main.className = "footer-list-main";
            //     main.innerHTML = `
            //         <div class="footer-list">
            //             <a href="https://www.ettelerp.com" target="_blank">Ettel ERP</a>
            //             <a href="https://www.ettelerp.com/privacy-policy" target="_blank">Privacy Policy</a>
            //             <a href="https://www.ettelerp.com/terms-of-service" target="_blank">Terms of Service</a>
            //         </div>`;                
            //     section.append(main);
            // }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    })();


    /* ===============================
       LOGIN PAGE CUSTOM UI
    ================================ */
    const logins = document.querySelector(".page_content");
    const currentPath = document.body.getAttribute("data-path");

    // if (logins && currentPath === "login" && !logins.querySelector(".login-toggle")) {
    //     const Nav = document.createElement("div");
    //     Nav.className = "login-toggle";
    //     Nav.innerHTML = `
    //         <img src="/assets/frappetheme/images/liner.png" class="login-img-rotated-line"/>
    //         <img src="/assets/frappetheme/images/linel.png" class="login-img-rotated-line-right"/>`;
    //     logins.prepend(Nav);
    // }

    const pagehead = document.querySelector(".page-card-head");
    if (pagehead && currentPath === "login" && !pagehead.querySelector(".header-login")) {
        const Nav = document.createElement("div");
        Nav.className = "header-login";
        Nav.innerHTML = `
            <span>Welcome to </span>
            <span class="title-logins">ERP Lite</span>`;
        pagehead.append(Nav);
    }

    const loginInput = document.getElementById("login_email");
    if (loginInput) {
        loginInput.placeholder = "Please Insert Valid Email";
    }

    if (window.location.pathname === "/login") {
        const navbar = document.querySelector(
            "nav.navbar.navbar-light.navbar-expand-lg"
        )
        // const loginnav = document.querySelector(".navbar-expand-lg>.container")
        // if (navbar) navbar.remove()
        // if (loginnav) loginnav.remove()
        // if (loginnav) {
        //     loginnav.style.display = "none"
        // }
    }




    /* ===============================
       PASSWORD EYE ICON (two SVG toggle)
    ================================ */
     function eye(open) {
    return open
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
           </svg>`;
}

    function replaceTextWithIcons() {
        document.querySelectorAll(".toggle-password").forEach(el => {
            const txt = el.textContent.trim().toLowerCase();

            if (txt === "show") el.innerHTML = eye(false);
            if (txt === "hide") el.innerHTML = eye(true);
        });
    }
    // Initial run
    replaceTextWithIcons();
    // SPA-safe
    new MutationObserver(replaceTextWithIcons)
        .observe(document.body, { childList: true, subtree: true });

    // injectEyeIcons();
    // new MutationObserver(injectEyeIcons).observe(document.body, { childList: true, subtree: true });

    // Toggle eye icons on click
    // document.addEventListener("click", function (e) {
    //     const toggle = e.target.closest(".toggle-password");
    //     if (!toggle) return;

    //     const input = document.querySelector(toggle.getAttribute("toggle"));
    //     if (!input) return;

    //     const eyeOn = toggle.querySelector(".eye-on");
    //     const eyeOff = toggle.querySelector(".eye-off");

    //     if (input.type === "password") {
    //         input.type = "text";
    //         eyeOn.style.display = "none";
    //         eyeOff.style.display = "inline-flex";
    //     } else {
    //         input.type = "password";
    //         eyeOn.style.display = "inline-flex";
    //         eyeOff.style.display = "none";
    //     }
    // });

});


