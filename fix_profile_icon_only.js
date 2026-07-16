const fs = require('fs');

['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // First, restore .user-profile visibility on mobile if we hid it
    const hiddenMobile = `.user-profile { display: none !important;}`;
    const restoredMobile = `.user-profile { display: flex !important; flex-shrink: 1; min-width: 0; align-items: center; justify-content: flex-end; }`;
    
    if (content.includes(hiddenMobile)) {
        content = content.replace(hiddenMobile, restoredMobile);
    }
    
    // Find the mobile block for user-profile > div and hide it
    // The existing block might be:
    // .user-profile > div {
    //    display: block !important;
    //    max-width: 130px;
    
    const divTarget = `.user-profile > div {
                display: block !important;`;
    const divReplacement = `.user-profile > div {
                display: none !important; /* Hide text on mobile */`;
                
    if (content.includes(divTarget)) {
        content = content.replace(divTarget, divReplacement);
    }

    fs.writeFileSync(f, content);
    console.log('Fixed profile text visibility for', f);
});
