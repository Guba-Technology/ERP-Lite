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
        strengthDiv.innerText = loginBtn.innerText;
        strengthDiv.style.color = "#d9534f";

        // Reset button text to 'Login' so user can click again
        loginBtn.innerText = "Login";
    }
}

// SPA-safe observer
new MutationObserver(moveInvalidLoginText).observe(document.body, { childList: true, subtree: true });

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
/* ===============================
   PREVENT PASSWORD COPY WHEN VISIBLE
================================ */
const passwordField = document.getElementById("login_password");

if (passwordField) {
    // Block copy, cut, paste, drop, and right-click
    ["copy", "cut", "paste", "drop", "contextmenu"].forEach(event => {
        passwordField.addEventListener(event, function(e) {
            e.preventDefault();
        });
    });

    // Block Ctrl+V / Cmd+V
    passwordField.addEventListener("keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
            e.preventDefault();
        }
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
                color = "#d9534f";
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
/* ===============================
   CONFIRM PASSWORD MATCH CHECK
================================ */

const confirmPasswordField = document.getElementById("confirm_password");

if (passwordField && confirmPasswordField) {

    // Create message div
    const confirmMsg = document.createElement("div");
    confirmMsg.id = "confirm-password-message";
    confirmMsg.style.fontSize = "13px";
    confirmMsg.style.marginTop = "5px";

    confirmPasswordField.parentElement.appendChild(confirmMsg);

    function checkPasswordMatch() {
        const pass = passwordField.value;
        const confirm = confirmPasswordField.value;

        if (!confirm) {
            confirmMsg.innerText = "";
            return;
        }

        if (pass === confirm) {
            confirmMsg.innerText = "Passwords match";
            confirmMsg.style.color = "green";
        } else {
            confirmMsg.innerText = "Passwords do not match";
            confirmMsg.style.color = "#d9534f";
        }
    }

    passwordField.addEventListener("input", checkPasswordMatch);
    confirmPasswordField.addEventListener("input", checkPasswordMatch);
}

});


