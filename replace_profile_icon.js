const fs = require('fs');

['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Regex to match the img tag directly inside .user-profile
    // Example: <div class="user-profile">\n    <img src="assets/img_7.webp" alt="Admin">
    const regex = /(<div class="user-profile">\s*)<img[^>]+>/;
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1<i class="fa-solid fa-circle-user" style="font-size: 40px; color: var(--accent-color);"></i>`);
        fs.writeFileSync(f, content);
        console.log('Replaced profile image with fontawesome icon in', f);
    } else {
        console.log('No matching img tag found in', f);
    }
});
