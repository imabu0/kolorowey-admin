// Sidebar template (moved outside DOMContentLoaded)
const sidebarTemplate = `
  <div class="sidebar">
    <div class="logo">Kolorowey</div>
    <ul class="menu">
      <li class="menu-item dashboard active" data-page="dashboard">
        <a href="#dashboard.html"><img src="/assets/home.png" alt="dashboard" /> Dashboard</a>  
      </li>
      <li class="menu-dropdown">
        <div class="menu-heading">
          <img src="/assets/create.png" alt="create" />
          <span>Create</span>
          <span class="dropdown-arrow">></span>
        </div>
        <ul class="dropdown-content">
          <li class="menu-item" data-page="partner">
            <a href="#create-partner.html"><span>Create Partner</span></a>
          </li>
          <li class="menu-item" data-page="publisher">
            <a href="#create-publisher.html"><span>Create Publisher</span></a>
          </li>
          <li class="menu-item" data-page="unit">
            <a href="#create-unit.html"><span>Create Ad Unit</span></a>
          </li>
        </ul>
      </li>
      <li class="menu-dropdown">
        <div class="menu-heading">
          <img src="/assets/list.png" alt="list" />
          <span>List</span>
          <span class="dropdown-arrow">></span>
        </div>
        <ul class="dropdown-content">
          <li class="menu-item" data-page="partner-list">
            <a href="#partner-list.html"><span>Partner List</span></a>
          </li>
          <li class="menu-item" data-page="publisher-list">
            <a href="#publisher-list.html"><span>Publisher List</span></a>
          </li>
          <li class="menu-item" data-page="unit-list">
            <a href="#unit-list.html"><span>Ad Unit List</span></a>
          </li>
        </ul>
      </li>
      <li>
        <div class="menu-heading logout">
          <img src="/assets/logout.png" alt="logout" /> Logout
        </div>
      </li>
    </ul>
  </div>
`;

// Initialize sidebar on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  sidebarContainer.innerHTML = sidebarTemplate;

  highlightCurrentPage();
  setupNavigation();
  setupDropdowns();
});

// Highlight current sidebar item based on URL
function highlightCurrentPage() {
  const path = window.location.pathname;
  let currentPage = "dashboard";

  if (path.endsWith("create-partner.html")) currentPage = "partner";
  else if (path.endsWith("create-publisher.html")) currentPage = "publisher";
  else if (path.endsWith("create-unit.html")) currentPage = "unit";
  else if (path.endsWith("partner-list.html")) currentPage = "partner-list";
  else if (path.endsWith("publisher-list.html")) currentPage = "publisher-list";
  else if (path.endsWith("unit-list.html")) currentPage = "unit-list";

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === currentPage);
  });
}

// Handle sidebar link clicks (SPA support if needed)
function setupNavigation() {
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("file://")) return;

      // Uncomment if you're using SPA-style navigation
      // e.preventDefault();
      // navigateTo(href.replace(/^#/, ''));
    });
  });
}

// SPA: Change path and load content dynamically
function navigateTo(path) {
  if (!path.startsWith("/")) path = "/" + path;
  history.pushState({}, "", path);
  loadPageContent(path);
  highlightCurrentPage();
}

// SPA: Load partial content
function loadPageContent(path) {
  const pageFile = path === "/" ? "index.html" : path.replace(/^\/+/, "") + ".html";

  fetch(pageFile)
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const content = doc.querySelector(".main-content")?.innerHTML || "<p>Content not found.</p>";
      document.querySelector(".main-content").innerHTML = content;
    })
    .catch((err) => {
      console.error("Error loading page:", err);
      window.location.href = pageFile; // Fallback
    });
}

// Dropdown toggling logic
function setupDropdowns() {
  const dropdownHeadings = document.querySelectorAll(".menu-heading");

  dropdownHeadings.forEach((heading) => {
    heading.addEventListener("click", function () {
      const dropdownContent = this.nextElementSibling;
      const arrow = this.querySelector(".dropdown-arrow");
      const isOpening = !dropdownContent?.classList.contains("active");

      document.querySelectorAll(".dropdown-content").forEach((content) => {
        const otherArrow = content.previousElementSibling.querySelector(".dropdown-arrow");
        if (content !== dropdownContent) {
          content.classList.remove("active");
          if (otherArrow) otherArrow.style.transform = "rotate(0)";
        }
      });

      if (dropdownContent) {
        dropdownContent.classList.toggle("active", isOpening);
        if (arrow) arrow.style.transform = isOpening ? "rotate(90deg)" : "rotate(0)";
      }
    });
  });
}

// Support back/forward browser navigation
window.addEventListener("popstate", () => {
  highlightCurrentPage();
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
