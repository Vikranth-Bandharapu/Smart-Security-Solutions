const fs = require('fs');
['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    
    // Add mobile CSS to hide notification icon
    const styleBlock = `@media (max-width: 992px) {
            .notification-icon { display: none !important; }
        }`;
        
    if (!c.includes('.notification-icon { display: none !important; }')) {
        c = c.replace('</style>', `    ${styleBlock}\n    </style>`);
        fs.writeFileSync(f, c);
        console.log('Added CSS to hide notification icon in', f);
    }
});
