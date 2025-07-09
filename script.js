document.addEventListener('DOMContentLoaded', function() {
    // Page routing configuration
    const routes = {
        'dashboard': {
            title: 'Dashboard',
            path: '/'
        },
        'partner': {
            title: 'Create Partner',
            path: '/create-partner'
        },
        'publisher': {
            title: 'Create Publisher',
            path: '/create-publisher'
        },
        'unit': {
            title: 'Create Ad Unit',
            path: '/create-adunit'
        },
        'partner-list': {
            title: 'Partner List',
            path: '/partners'
        },
        'publisher-list': {
            title: 'Publisher List',
            path: '/publishers'
        },
        'unit-list': {
            title: 'Ad Unit List',
            path: '/adunits'
        }
    };

    // Function to navigate to a page
    function navigateTo(page) {
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === page) {
                item.classList.add('active');
            }
        });

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show the selected page
        document.getElementById(page).classList.add('active');

        // Update browser history and URL
        const route = routes[page];
        const pageTitle = `${route.title} | Admin Dashboard`;
        
        history.pushState({ page }, pageTitle, route.path);
        document.title = pageTitle;
    }

    // Add click event listeners to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        const page = event.state?.page || 'dashboard';
        navigateTo(page);
    });

    // Initial page load - check URL
    function loadInitialPage() {
        const path = window.location.pathname;
        let page = 'dashboard';

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