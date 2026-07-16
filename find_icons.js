const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Print all lines containing fa-
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('fa-')) {
        console.log((i+1) + ': ' + line.trim());
    }
});
