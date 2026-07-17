const fs = require('fs');

['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Add script tag before closing body tag
    const scriptTag = `<script src="js/sidebar-fix.js"></script>\n</body>`;
    
    if (!content.includes('js/sidebar-fix.js')) {
        content = content.replace('</body>', scriptTag);
        fs.writeFileSync(f, content);
        console.log('Added sidebar-fix script to', f);
    }
});
