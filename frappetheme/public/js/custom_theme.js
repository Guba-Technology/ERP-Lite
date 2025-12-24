document.addEventListener("DOMContentLoaded", function () {
    (function () {
        const observer = new MutationObserver(() => {
            const pagehome = document.querySelector(".navbar-brand");
            if (pagehome && !pagehome.querySelector(".header-home")) {
                const Nav = document.createElement("div");
                Nav.className = "header-home";
                Nav.innerHTML = ` <a class="" href="/app"><img src="/assets/frappetheme/images/logos.png" alt="img" class="logo-main"/></a>`;
                pagehome.append(Nav);
            }
            const section = document.querySelector(".main-section");
            if (section && !section.querySelector(".footer-list-main")) {
                const main = document.createElement("div");
                main.className = "footer-list-main";
                main.innerHTML = `
                <img src="/assets/frappetheme/images/linel.png" alt="images" class="img-rotated-line"/>
                <img src="/assets/frappetheme/images/liner.png" alt="images" class="img-rotated-line-right"/>`;
                section.append(main)
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    })();


    const logins = document.querySelector(".page_content");
    const currentPath = document.body.getAttribute("data-path");
    if (logins && currentPath === "login" && !logins.querySelector(".login-toggle")) {
        const Nav = document.createElement("div");
        Nav.className = "login-toggle";
        Nav.innerHTML = `
        <img src="/assets/frappetheme/images/liner.png" alt="img" class="login-img-rotated-line"/>
        <img src="/assets/frappetheme/images/linel.png" alt="img" class="login-img-rotated-line-right"/>
         `;

        logins.prepend(Nav);
    }
    // const loginsHead = document.querySelector(".page-card-body");
    // if (loginsHead && currentPath === "login" && !loginsHead.querySelector(".login-tog")) {
    //     const Nav = document.createElement("div");
    //     Nav.className = "login-tog";
    //     Nav.innerHTML = `
    //     <img src="/assets/frappetheme/images/arrow.png" alt="img" class="arrow-imgs"/>
    //      `;

    //     loginsHead.prepend(Nav);
    // }

    const pagehead = document.querySelector(".page-card-head");
    if (pagehead && currentPath === "login" && !pagehead.querySelector(".header-login")) {
        const Nav = document.createElement("div");
        Nav.className = "header-login";
        Nav.innerHTML = `
        <span>WELCOME TO <span/><span class="title-logins" >ERP Lite</span>
         `;

        pagehead.append(Nav);
    }



    if (logins) {
        const loginToggle = logins.querySelector(".login-toggle");

        if (loginToggle) {
            let sibling = loginToggle.nextElementSibling;

            // Check if the next element exists and has no class
            if (sibling && !sibling.className.trim()) {
                sibling.classList.add("custom-class");
            }
        }
    }
    const loginInput = document.getElementById("login_email");
    if (loginInput) {
        loginInput.placeholder = "info@mod.gov.et";
    }


    if (window.location.pathname === "/login") {
        const navbar = document.querySelector("nav.navbar.navbar-light.navbar-expand-lg");
        if (navbar) {
            navbar.remove();
        }
    }

});