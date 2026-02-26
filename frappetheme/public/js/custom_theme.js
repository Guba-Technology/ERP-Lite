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
   CHANGE GRID UPLOAD BUTTON TEXT
================================ */

function changeUploadText() {
    document.querySelectorAll(".grid-upload").forEach(btn => {
        if (btn.innerText.trim() === "Upload") {
            btn.innerText = "Upload Supportive Document";
        }
    });
}

// Run initially
changeUploadText();

// Observe dynamic changes (Frappe is SPA)
new MutationObserver(changeUploadText)
    .observe(document.body, { childList: true, subtree: true });
    /* ===============================
       LOGIN PAGE CUSTOM UI
    ================================ */
    const logins = document.querySelector(".page_content");
    const currentPath = document.body.getAttribute("data-path");

    /* ===============================
   MOVE INVALID LOGIN TEXT TO STRENGTH DIV
================================ */
function moveInvalidLoginText() {
    const loginBtn = document.querySelector(".btn-login");
    const strengthDiv = document.getElementById("password-strength");
    if (!loginBtn || !strengthDiv) return;

    // If button contains 'Invalid Login'
    if (loginBtn.innerText.includes("Invalid Login")) {
        strengthDiv.innerText = loginBtn.innerText; // copy text
        strengthDiv.style.color = "red";

        // Reset button text to 'Login' so user can click again
        loginBtn.innerText = "Login";
    }
}

// SPA-safe observer
new MutationObserver(moveInvalidLoginText).observe(document.body, { childList: true, subtree: true });
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

    // if (window.location.pathname === "/login") {
    //     const navbar = document.querySelector(
    //         "nav.navbar.navbar-light.navbar-expand-lg"
    //     )
    //     const loginnav = document.querySelector(".navbar-expand-lg>.container")
    //     if (navbar) navbar.remove()
    //     if (loginnav) loginnav.remove()
    //     if (loginnav) {
    //         loginnav.style.display = "none"
    //     }
    // }




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
/* ===============================
   PREVENT PASSWORD COPY WHEN VISIBLE
================================ */
const passwordField = document.getElementById("login_password");

if (passwordField) {
    // Block copy/cut/right-click when password is visible
    passwordField.addEventListener("copy", function(e) {
        if (passwordField.type === "text") e.preventDefault();
    });
    passwordField.addEventListener("cut", function(e) {
        if (passwordField.type === "text") e.preventDefault();
    });
    passwordField.addEventListener("contextmenu", function(e) {
        if (passwordField.type === "text") e.preventDefault();
    });
}
/* ===============================
   PASSWORD STRENGTH METER
================================ */
// const passwordField = document.getElementById("login_password");

if (passwordField) {
    // Create strength div
    const strengthDiv = document.createElement("div");
    strengthDiv.id = "password-strength";
    strengthDiv.style.fontSize = "13px";
    strengthDiv.style.marginTop = "5px";
    passwordField.parentElement.appendChild(strengthDiv);

    passwordField.addEventListener("input", function () {
        const val = passwordField.value;
        if (!val) {
            strengthDiv.innerText = "";
            return;
        }
        let strength = 0;

        // Check for criteria
        if (val.length >= 8) strength++; // min 8 chars
        if (/[A-Z]/.test(val)) strength++; // uppercase
        if (/[a-z]/.test(val)) strength++; // lowercase
        if (/[0-9]/.test(val)) strength++; // number
        if (/[\W]/.test(val)) strength++; // special char

        // Map to label
        let text = "";
        let color = "";
        switch (strength) {
            case 0:
            case 1:
            case 2:
                text = "Weak";
                color = "red";
                break;
            case 3:
            case 4:
                text = "Medium";
                color = "orange";
                break;
            case 5:
                text = "Strong";
                color = "green";
                break;
        }

        strengthDiv.innerText = "Password strength: " + text;
        strengthDiv.style.color = color;
    });
}
});


