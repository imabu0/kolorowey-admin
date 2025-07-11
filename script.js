document.addEventListener("DOMContentLoaded", function () {
  // Page routing configuration
  const routes = {
    dashboard: {
      title: "Dashboard",
      path: "/",
    },
    partner: {
      title: "Create Partner",
      path: "/create-partner",
    },
    publisher: {
      title: "Create Publisher",
      path: "/create-publisher",
    },
    unit: {
      title: "Create Ad Unit",
      path: "/create-adunit",
    },
    "partner-list": {
      title: "Partner List",
      path: "/partners",
    },
    "publisher-list": {
      title: "Publisher List",
      path: "/publishers",
    },
    "unit-list": {
      title: "Ad Unit List",
      path: "/adunits",
    },
  };

  // Function to navigate to a page
  function navigateTo(page) {
    // Update active menu item
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-page") === page) {
        item.classList.add("active");
      }
    });

    // Hide all pages
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("active");
    });

    // Show the selected page
    document.getElementById(page).classList.add("active");

    // Update browser history and URL
    const route = routes[page];
    const pageTitle = `${route.title} | Admin Dashboard`;

    history.pushState({ page }, pageTitle, route.path);
    document.title = pageTitle;
  }

  // Add click event listeners to menu items
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      navigateTo(page);
    });
  });

  // Handle browser back/forward navigation
  window.addEventListener("popstate", function (event) {
    const page = event.state?.page || "dashboard";
    navigateTo(page);
  });

  // Initial page load - check URL
  function loadInitialPage() {
    const path = window.location.pathname;
    let page = "dashboard";

    // Find the page that matches the current path
    for (const [key, value] of Object.entries(routes)) {
      if (value.path === path) {
        page = key;
        break;
      }
    }

    navigateTo(page);
  }

  loadInitialPage();
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all dropdown headings
  const dropdownHeadings = document.querySelectorAll(".menu-heading");

  // Add click event to each heading
  dropdownHeadings.forEach((heading) => {
    heading.addEventListener("click", function () {
      // Get the dropdown content and arrow for this heading
      const dropdownContent = this.nextElementSibling;
      const arrow = this.querySelector(".dropdown-arrow");

      // Toggle current dropdown
      const isOpening = !dropdownContent.classList.contains("active");

      // Close all other dropdowns first
      if (isOpening) {
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          if (content !== dropdownContent) {
            content.classList.remove("active");
            const otherArrow =
              content.previousElementSibling.querySelector(".dropdown-arrow");
            otherArrow.style.transform = "rotate(0)";
          }
        });
      }

      // Toggle this dropdown
      dropdownContent.classList.toggle("active");

      // Rotate arrow
      arrow.style.transform = dropdownContent.classList.contains("active")
        ? "rotate(90deg)"
        : "rotate(0)";
    });
  });
});
