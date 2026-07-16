const fs = require('fs');

['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Revert desktop
    const revertTarget = `.user-profile { display: none !important; /* Hide on mobile */`;
    const revertReplacement = `.user-profile { display: flex; align-items: center; gap: 0.8rem;`;
    content = content.replace(revertTarget, revertReplacement);

    // Apply mobile hide
    const mobileTarget = `.user-profile { display: flex; flex-shrink: 1; min-width: 0;`;
    const mobileReplacement = `.user-profile { display: none !important;`;
    content = content.replace(mobileTarget, mobileReplacement);

    fs.writeFileSync(f, content);
    console.log('Fixed for', f);
});
