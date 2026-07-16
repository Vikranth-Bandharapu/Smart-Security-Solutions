const fs = require('fs');

['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Replace the .user-profile display behavior in mobile view
    const target = `.user-profile { display: flex; flex-shrink: 1; min-width: 0;`;
    const replacement = `.user-profile { display: none !important; /* Hide on mobile */`;

    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(f, content);
        console.log('Hidden user-profile in mobile for', f);
    } else {
        console.log('Target CSS not found in', f);
    }
});
