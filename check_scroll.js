const fs = require('fs');
['admin-dashboard.html', 'manager-dashboard.html', 'client-dashboard.html'].forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    console.log(f + ' has overflow hidden: ' + c.includes("overflow = 'hidden'"));
});
