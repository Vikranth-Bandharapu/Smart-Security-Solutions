const fs = require('fs');
['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    
    // Fix the scroll logic
    const oldLogic = `if(sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }`;
                
    const newLogic = `if(sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    const mainContent = document.querySelector('.main-content');
                    if (mainContent) mainContent.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                    const mainContent = document.querySelector('.main-content');
                    if (mainContent) mainContent.style.overflow = 'auto';
                }`;
                
    if (c.includes(oldLogic)) {
        c = c.replace(oldLogic, newLogic);
        fs.writeFileSync(f, c);
        console.log('Fixed scroll logic in', f);
    } else {
        console.log('Old logic not found in', f);
    }
});
