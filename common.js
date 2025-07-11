// Define sidebar template (moved outside DOMContentLoaded)
const sidebarTemplate = `
<div class="sidebar">
    <div class="logo">Kolorowey</div>
    <ul class="menu">
        <li class="menu-item" data-page="dashboard">
            <a href="index.html">Dashboard</a>
        </li>
        <li class="menu-heading">Create</li>
        <li class="menu-item" data-page="partner">
            <a href="create-partner.html">Create Partner</a>
        </li>
        <li class="menu-item" data-page="publisher">
            <a href="create-publisher.html">Create Publisher</a>
        </li>
        <li class="menu-item" data-page="unit">
            <a href="create-unit.html">Create Ad Unit</a>
        </li>
        <li class="menu-heading">List</li>
        <li class="menu-item" data-page="partner-list">
            <a href="partner-list.html">Partner List</a>
        </li>
        <li class="menu-item" data-page="publisher-list">
            <a href="publisher-list.html">Publisher List</a>
        </li>
        <li class="menu-item" data-page="unit-list">
            <a href="unit-list.html">Ad Unit List</a>
        </li>
    </ul>
</div>
`;

// Main initialization function
function initializeSidebar() {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  // Inject sidebar HTML
  sidebarContainer.innerHTML = sidebarTemplate;

  // Set up active page highlighting
  highlightCurrentPage();

  // Set up navigation
  setupNavigation();
}

// Highlight current page in sidebar
function highlightCurrentPage() {
  // Get current page name from URL
  const path = window.location.pathname;
  let currentPage = "dashboard";

  if (path.endsWith("create-partner.html")) currentPage = "partner";
  else if (path.endsWith("create-publisher.html")) currentPage = "publisher";
  else if (path.endsWith("create-unit.html")) currentPage = "unit";
  else if (path.endsWith("partner-list.html")) currentPage = "partner-list";
  else if (path.endsWith("publisher-list.html")) currentPage = "publisher-list";
  else if (path.endsWith("unit-list.html")) currentPage = "unit-list";
  // Default is dashboard

  // Update active state
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.page === currentPage) {
      item.classList.add("active");
    }
  });
}

// Set up sidebar navigation
function setupNavigation() {
  // Handle clicks on sidebar links
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // For local files, let the default behavior handle navigation
      if (this.href.startsWith("file://") || this.href.startsWith("http")) {
        return true;
      }

      // For web deployment with clean URLs, you would use this:
      // e.preventDefault();
      // navigateTo(this.getAttribute('href'));
    });
  });
}

// Navigation function (for SPA approach)
function navigateTo(path) {
  // Normalize path
  if (!path.startsWith("/")) path = "/" + path;

  // Update URL (no .html in URL bar)
  history.pushState({}, "", path);

  // Load actual .html file behind the scenes
  loadPageContent(path);

  // Highlight current sidebar item
  highlightCurrentPage();
}

// Load page content dynamically (SPA approach)
function loadPageContent(path) {
  // Convert path like /create-partner → create-partner.html
  const pageFile =
    path === "/" ? "index.html" : path.replace(/^\/+/, "") + ".html";

  fetch(pageFile)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent =
        doc.querySelector(".main-content")?.innerHTML ||
        "<p>Content not found.</p>";
      document.querySelector(".main-content").innerHTML = newContent;
    })
    .catch((err) => {
      console.error("Error loading page:", err);
      window.location.href = pageFile; // fallback to full page load
    });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeSidebar);

// Handle browser back/forward navigation
window.addEventListener("popstate", function () {
  highlightCurrentPage();
});
