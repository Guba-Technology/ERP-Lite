document.addEventListener("DOMContentLoaded", function () {
    /// Add Sidebar div to hold the sidebar
    const mainSection = document.querySelector(".main-section");
    if (mainSection && !mainSection.classList.contains("guba-theme")) {
        const header = mainSection.querySelector("header");
        const newHeader = header ? header.cloneNode(true) : document.createElement("header");
        mainSection.innerHTML = "";

        mainSection.classList.add("guba-theme");

        const sidebar = document.createElement("div");
        sidebar.className = "guba-sidebar";
        sidebar.innerHTML = `
			<img src="/assets/frappetheme/images/wm.png" alt="login" class="img-sidebar" style="position:absolute; bottom: -305px; width: 255px; left: 0px;"/>
		`;

        const bodyDiv = document.createElement("div");
        bodyDiv.id = "body";
        bodyDiv.className = "guba-content-body";
        bodyDiv.appendChild(newHeader);

        mainSection.appendChild(sidebar);
        mainSection.appendChild(bodyDiv);
    }

    // const login = document.querySelector(".for-login");
    const logins = document.querySelector(".page_content");
    const currentPath = document.body.getAttribute("data-path");
    if (logins && currentPath === "login" && !logins.querySelector(".login-toggle")) {
        const Nav = document.createElement("div");
        Nav.className = "login-toggle";
        Nav.innerHTML = `
        <img src="/assets/frappetheme/images/logol.png" alt="img" style="width: 100%; height: auto; object-fit: cover;"/>
    `;
        logins.prepend(Nav);
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
        loginInput.placeholder = "Enter your work email";
    }


    if (window.location.pathname === "/login") {
        const navbar = document.querySelector("nav.navbar.navbar-light.navbar-expand-lg");
        if (navbar) {
            navbar.remove();
        }
    }

    (function () {
        // const routeContainer = document.querySelector("[data-page-route]");
        // const currentRoute = routeContainer?.getAttribute("data-page-route");


        const observer = new MutationObserver(() => {
            const container = document.querySelector(".page-container");
            const routeContainer = document.querySelector("[data-page-route]");
            const currentRoute = routeContainer?.getAttribute("data-page-route");
            const layoutMainSection = document.querySelector(".layout-side-section");

            if (!container || !layoutMainSection) return;


            let sidebarContainer = document.querySelector(".page-sidebar");

            ///create and append page-sidebar
            if (!sidebarContainer) {
                sidebarContainer = document.createElement("div");
                sidebarContainer.className = "page-sidebar";
                container.prepend(sidebarContainer);
            }

            const existingDeskSidebar = sidebarContainer.querySelector(".desk-sidebar.list-unstyled.sidebar-menu");
            if (existingDeskSidebar && existingDeskSidebar.querySelector(".standard-sidebar-section")) {
                localStorage.setItem("deskSidebarHTML", existingDeskSidebar.outerHTML);
            }

            if (!currentRoute?.startsWith("Workspaces")) {
                let cachedDeskSidebarHTML = localStorage.getItem("deskSidebarHTML");

                if (cachedDeskSidebarHTML && !sidebarContainer.querySelector(".desk-sidebar.list-unstyled.sidebar-menu")) {
                    const temp = document.createElement("div");
                    temp.innerHTML = cachedDeskSidebarHTML;

                    // Remove dynamic buttons
                    temp.querySelectorAll('.btn.btn-secondary.btn-xs.drag-handle, .btn.btn-xs.setting-btn.dropdown-btn')
                        .forEach(btn => btn.remove());

                    const cleanedSidebar = temp.firstElementChild;
                    if (cleanedSidebar) {
                        sidebarContainer.appendChild(cleanedSidebar);

                        cleanedSidebar.querySelectorAll('.drop-icon').forEach(dropIcon => {
                            dropIcon.addEventListener('click', (e) => {
                                const parentItem = dropIcon.closest('.sidebar-item-container');
                                const childItem = parentItem?.querySelector('.sidebar-child-item');
                                if (childItem) {
                                    childItem.classList.toggle('hidden'); // toggles visibility
                                    dropIcon.classList.toggle('rotated'); // optional: add arrow rotation
                                }
                            });
                        });
                    }
                }
            }

            if (currentRoute?.startsWith("Workspaces")) {
                const listSidebar = layoutMainSection.querySelector(".desk-sidebar.list-unstyled.sidebar-menu");
                if (listSidebar && !sidebarContainer.contains(listSidebar)) {
                    sidebarContainer.appendChild(listSidebar);
                }
            }



            const deskSidebar = document.querySelector(".desk-sidebar.list-unstyled.sidebar-menu");
            if (deskSidebar && !deskSidebar.querySelector(".side-nav")) {
                const sideNav = document.createElement("div");
                sideNav.className = "side-nav";
                sideNav.innerHTML = `
                <a href="/app">
                    <img class="app-logo" src="/assets/frappetheme/images/logosmall.png" />
                    <img class="app-logo-small" src="/assets/frappetheme/images/logosmall.png" />
                </a>
                
                <svg id="toggle-sidebar-label-minSize" class="toggle-minSize es-icon es-line icon-xs" aria-hidden="true">
                    <use href="#es-line-right-chevron"></use>
                </svg>
                
            `;
                deskSidebar.prepend(sideNav);
            }
            //navbar hamburger menu
            const navbar = document.querySelector(".navbar");
            if (navbar && !navbar.querySelector(".nav-toggle")) {
                const Nav = document.createElement("div");
                Nav.className = "nav-toggle";
                Nav.innerHTML = `
                <button id="toggle-sidebar-label-minSize-show" class="hamburger-menu toggle-bar-min btn-reset sidebar-toggle-btn" title="Toggle Sidebar">
                    <svg class="es-icon icon-md sidebar-toggle-placeholder" ">
                        <use href="#es-line-align-justify"></use>
                    </svg>
                </button>
                <button id="toggle-sidebar-label" class="toggle-bar btn-reset sidebar-toggle-btn" title="Toggle Sidebar">
                    <svg class="es-icon icon-md sidebar-toggle-placeholder" ">
                        <use href="#es-line-align-justify"></use>
                    </svg>
                </button>
            `;
                navbar.prepend(Nav);
            }
            const widgets = document.querySelectorAll(".widget.shortcut-widget-box");
            widgets.forEach(widget => {
                const widgetHead = widget.querySelector(".widget-head");

                // Skip if already updated
                if (widgetHead && !widgetHead.querySelector(".widget-label-main")) {
                    const widgetLabel = widgetHead.querySelector(".widget-label");
                    const indicator = widgetHead.querySelector(".indicator-pill");

                    if (widgetLabel && indicator) {
                        // Create wrapper
                        const wrapper = document.createElement("div");
                        wrapper.className = "widget-label-main";

                        // Insert wrapper before widgetLabel
                        widgetHead.insertBefore(wrapper, widgetLabel);

                        // Move both label and indicator into wrapper
                        wrapper.appendChild(widgetLabel);
                        wrapper.appendChild(indicator);
                    }
                }
            });

            // frappe.call({
            //     method: "frappe.client.get",
            //     args: {
            //         doctype: "User",
            //         name: frappe.session.user
            //     },
            //     callback: function (res) {
            //         const user = res.message;
            //         const navbarCollapse = document.querySelector(".navbar-collapse");
            //         const userAvatar = navbarCollapse.querySelector(".navbar-nav");
            //         if (userAvatar && !userAvatar.querySelector(".email-user")) {
            //             const avatar = document.createElement("div");
            //             avatar.className = "email-user";
            //             avatar.innerHTML = `
            //             <div>
            //             <p style="font-weight:600; margin: 0 0 2px 0;">${user.full_name}</p>
            //             <p style="margin: -2px;"> ${user.email}</p>
            //             </div> `;
            //             userAvatar.appendChild(avatar);
            //         }
            //     }
            // });


        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        const retryInterval = setInterval(() => {
            const routeContainer = document.querySelector("[data-page-route]");
            const currentRoute = routeContainer?.getAttribute("data-page-route");

            // Fix: Include tree view too!
            if (!currentRoute?.toLowerCase().startsWith("list/")) return;

            const layoutMainSection = document.querySelector(".layout-side-section");
            const sidebarContainer = document.querySelector(".page-sidebar");
            const listSidebar = layoutMainSection?.querySelector(".desk-sidebar.list-unstyled.sidebar-menu");

            if (sidebarContainer && listSidebar && !sidebarContainer.contains(listSidebar)) {
                sidebarContainer.appendChild(listSidebar);
            }

            if (sidebarContainer?.contains(listSidebar)) {
                clearInterval(retryInterval);
            }
        }, 200);
    })();

    //works properly with tree view
    (function () {
        const forceSidebarForTreeView = () => {
            const route = document.querySelector("[data-page-route]")?.getAttribute("data-page-route");
            console.log(route);

            if (
                route?.toLowerCase().startsWith("tree/") ||
                route?.toLowerCase().startsWith("bom") ||
                route?.toLowerCase().startsWith("query-report") ||
                route?.toLowerCase().startsWith("doctype") ||
                route?.toLowerCase().startsWith("permission-manager")
            ) {
                document.body.setAttribute("data-sidebar", "1");

                const container = document.querySelector(".page-container");
                let sidebarContainer = document.querySelector(".page-sidebar");

                // If sidebar doesn't exist, create it
                if (container && !sidebarContainer) {
                    sidebarContainer = document.createElement("div");
                    sidebarContainer.className = "page-sidebar";
                    container.prepend(sidebarContainer);
                }

                const cachedDeskSidebarHTML = localStorage.getItem("deskSidebarHTML");

                if (cachedDeskSidebarHTML && !sidebarContainer.querySelector(".desk-sidebar.list-unstyled.sidebar-menu")) {
                    const temp = document.createElement("div");
                    temp.innerHTML = cachedDeskSidebarHTML;

                    // Remove unwanted dynamic buttons
                    temp.querySelectorAll('.btn.btn-secondary.btn-xs.drag-handle, .btn.btn-xs.setting-btn.dropdown-btn')
                        .forEach(btn => btn.remove());

                    const cleanedSidebar = temp.firstElementChild;
                    if (cleanedSidebar) {
                        sidebarContainer.appendChild(cleanedSidebar);

                        // 🔁 Rebind drop-icon click events to toggle children
                        cleanedSidebar.querySelectorAll('.drop-icon').forEach(dropIcon => {
                            dropIcon.addEventListener('click', (e) => {
                                const parentItem = dropIcon.closest('.sidebar-item-container');
                                const childItem = parentItem?.querySelector('.sidebar-child-item');
                                if (childItem) {
                                    childItem.classList.toggle('hidden');
                                    dropIcon.classList.toggle('rotated'); // Optional CSS rotation
                                }
                            });
                        });

                        // ✅ Optionally expand selected parent section
                        cleanedSidebar.querySelectorAll('.sidebar-item-container').forEach(container => {
                            const isSelected = container.querySelector('.desk-sidebar-item.selected');
                            const childItem = container.querySelector('.sidebar-child-item');
                            if (isSelected && childItem) {
                                childItem.classList.remove('hidden');
                            }
                        });
                    }
                }
            }
        };

        // Listen to route changes or call immediately if needed
        document.addEventListener("DOMContentLoaded", forceSidebarForTreeView);
        window.addEventListener("hashchange", forceSidebarForTreeView);


        // Wait for route to load, then force sidebar if needed
        const waitForRoute = setInterval(() => {
            const routeAttr = document.querySelector("[data-page-route]");
            if (routeAttr) {
                forceSidebarForTreeView();
                clearInterval(waitForRoute);
            }
        }, 100);
    })();



    frappe.after_ajax(() => {
        // frappe.call('frappe.desk.notifications.get_notification_count').then(res => {
        //     const count = res.message;

        //     const notify = document.querySelector(".notifications-seen");
        //     if (notify && !notify.querySelector(".badge-notify")) {
        //         const badge = document.createElement("div");
        //         badge.className = "badge-notify";
        //         badge.innerHTML = `<p>${count}</p>`;
        //         notify.prepend(badge);
        //     }
        // });

        if (frappe.views && frappe.views.Container) {
            frappe.views.Container.prototype.change_to = function (label) {
                cur_page = this;
                let page;
                if (label.tagName) {
                    page = label;
                } else {
                    page = frappe.pages[label];
                }
                if (!page) {
                    console.log(__("Page not found") + ": " + label);
                    return;
                }

                if (this.page && this.page !== page) {
                    $(this.page).find(".page-body").hide();
                    $(this.page).find(".page-head").hide();
                    $(this.page).trigger("hide");
                }

                if (!this.page || this.page !== page) {
                    this.page = page;
                    $(this.page).fadeIn(300);
                    $(this.page).find(".page-head").show();
                    $(this.page).find(".page-body").show();
                }

                $(document).trigger("page-change");

                this.page._route = frappe.router.get_sub_path();
                $(this.page).trigger("show");
                !this.page.disable_scroll_to_top && frappe.utils.scroll_to(0);
                frappe.breadcrumbs.update();

                return this.page;
            };
        }
    });

    function waitForElement(selector, callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const el = document.querySelector(selector);
            if (el) {
                obs.disconnect();
                callback(el);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // waitForElement(".drop-icon", (toggleBtn) => {
    //     toggleBtn.addEventListener("click", () => {
    //         document.querySelectorAll(".sidebar-child-item").forEach(label => {
    //             label.classList.toggle("show-label");
    //             label.classList.remove("hidden");
    //         });

    //     });
    // });

    //sm size arr
    waitForElement("#toggle-sidebar-label-minSize", (toggleBtn) => {
        toggleBtn.addEventListener("click", () => {
            document.querySelectorAll(".guba-sidebar").forEach(label => {
                label.classList.toggle("hidden-label");
                label.classList.remove("show-label");
            });
            document.querySelectorAll(".desk-sidebar").forEach(label => {
                label.classList.toggle("hidden-label");
                label.classList.remove("show-label");
            });
            document.querySelectorAll(".sidebar-item-label").forEach(label => {
                label.classList.toggle("hidden-label");
            });

            document.querySelectorAll(".guba-content-body").forEach(label => {
                label.classList.toggle("hidden-label-section");
            });
            document.querySelectorAll(".toggle-bar-min").forEach(label => {
                label.classList.toggle("show-label");
            });

        });
    });


    // sm size ham
    waitForElement("#toggle-sidebar-label-minSize-show", (toggleBtn) => {

        toggleBtn.addEventListener("click", () => {
            document.querySelectorAll(".guba-sidebar").forEach(label => {
                label.classList.remove("sidebar-width");
                label.classList.toggle("show-label");
                label.classList.remove("hidden-label");
            });
            // .layout-main-section-wrapper
            document.querySelectorAll(".sidebar-item-label").forEach(label => {
                label.classList.remove("hidden-label");
            });
            document.querySelectorAll(".toggle-bar-min").forEach(label => {
                label.classList.remove("show-label");
            });
            document.querySelectorAll(".desk-sidebar").forEach(label => {
                label.classList.toggle("show-label");
                label.classList.remove("hidden-label");
            });
            document.querySelectorAll(".guba-content-body").forEach(label => {
                label.classList.toggle("hidden-label-section");
            });
        });
    });

    //ham lg
    waitForElement("#toggle-sidebar-label", (toggleBtn) => {
        toggleBtn.addEventListener("click", () => {
            document.querySelectorAll(".sidebar-item-label").forEach(label => {
                label.classList.toggle("hidden-label");
            });
            document.querySelectorAll(".toggle-sidebar-name").forEach(label => {
                label.classList.toggle("hidden-label");
            });
            document.querySelectorAll(".section-title").forEach(label => {
                label.classList.toggle("hidden-label");
            });
            document.querySelectorAll(".app-logo").forEach(label => {
                label.classList.toggle("hidden-label");
            });
            document.querySelectorAll(".app-logo-small").forEach(label => {
                label.classList.toggle("show-label");
            });
            document.querySelectorAll(".guba-sidebar").forEach(label => {
                label.classList.toggle("sidebar-width");
            });
            document.querySelectorAll(".toggle-bar").forEach(label => {
                label.classList.toggle("toogle-bar-reponsive");
            });
            document.querySelectorAll(".standard-sidebar-section").forEach(label => {
                label.classList.toggle("standard-sidebar-section-toggle");
            });
            document.querySelectorAll(".page-container").forEach(label => {
                label.classList.toggle("page-container-toggle");
            });

            document.querySelectorAll(".guba-content-body").forEach(label => {
                label.classList.toggle("guba-content-body-toggle");
            });
            document.querySelectorAll(".desk-sidebar ").forEach(label => {
                label.classList.toggle("desk-sidebar-toggle");
            });
            document.querySelectorAll(".img-sidebar").forEach(label => {
                label.classList.toggle("img-sidebar-toggle");
            });

        });
    });
});