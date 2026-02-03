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

            const section = document.querySelector(".main-section");
            if (section && !section.querySelector(".footer-list-main")) {
                const main = document.createElement("div");
                main.className = "footer-list-main";
                main.innerHTML = `
                    <img src="/assets/frappetheme/images/linel.png" class="img-rotated-line"/>
                    <img src="/assets/frappetheme/images/liner.png" class="img-rotated-line-right"/>`;
                section.append(main);
            }
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
        const loginnav = document.querySelector(".navbar-expand-lg>.container")
        if (navbar) navbar.remove()
        if (loginnav) loginnav.remove()
        if (loginnav) {
            loginnav.style.display = "none"
        }
    }




    /* ===============================
       PASSWORD EYE ICON (two SVG toggle)
    ================================ */
    function injectEyeIcons() {
        document.querySelectorAll(".toggle-password").forEach(toggle => {

            if (toggle._eyeInjected) return;
            toggle._eyeInjected = true;

            const input = document.querySelector(toggle.getAttribute("toggle"));
            if (!input) return;

            const passwordField = toggle.closest(".password-field");
            if (!passwordField) return;

            toggle.classList.add("eye-replaced");
            toggle.textContent = "";

            // 👁️ Eye ON
            const eyeOn = document.createElement("span");
            eyeOn.className = "eye-icon eye-on";
            eyeOn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;

            // Check if eye-off already exists
            let eyeOff = passwordField.querySelector(".eye-off");
            if (!eyeOff) {
                eyeOff = document.createElement("span");
                eyeOff.className = "eye-icon eye-off";
                eyeOff.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/>
                    <circle cx="12" cy="12" r="3"/>
                    <line x1="3" y1="21" x2="21" y2="3" stroke="#6c757d" stroke-width="2"/>
                </svg>
            `;
                eyeOff.style.display = "none"; // hide initially
                passwordField.appendChild(eyeOff);
            } else {
                eyeOff.style.display = "none"; // ensure hidden initially
            }

            toggle.appendChild(eyeOn);

            // 🔁 Click toggle logic
            const toggleEyes = () => {
                if (input.type === "password") {
                    input.type = "text";        // show password
                    eyeOn.style.display = "none";
                    eyeOff.style.display = "inline-flex";
                } else {
                    input.type = "password";    // hide password
                    eyeOn.style.display = "inline-flex";
                    eyeOff.style.display = "none";
                }
            };

            toggle.addEventListener("click", toggleEyes);
            eyeOff.addEventListener("click", toggleEyes);
        });
    }

    // Initial injection
    injectEyeIcons();

    // Observe DOM for new password fields
    new MutationObserver(injectEyeIcons).observe(document.body, {
        childList: true,
        subtree: true
    });

});


