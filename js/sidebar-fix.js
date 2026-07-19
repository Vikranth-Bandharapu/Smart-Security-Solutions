document.addEventListener('DOMContentLoaded', () => {
    // Check if sidebar exists
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Inject overlay
    const overlay = document.createElement('div');
    overlay.id = 'mobileOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '1999'; // Just below sidebar which has 2000
    overlay.style.display = 'none';
    overlay.style.backdropFilter = 'blur(2px)';
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.style.overflow = 'auto';
    });

    // Hook into toggle button
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            // Give original script time to run
            setTimeout(() => {
                if (sidebar.classList.contains('active')) {
                    overlay.style.display = 'block';
                } else {
                    overlay.style.display = 'none';
                }
            }, 10);
        });
    }

    // Hook into sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 10);
            }
        });
    });
});
