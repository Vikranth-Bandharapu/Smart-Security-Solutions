const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('<script src="assets/img_11.webp"></script>')) {
        content = content.replace(
            '<script src="assets/img_11.webp"></script>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>'
        );
        content = content.replace(
            '<script src="assets/img_12.webp"></script>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>'
        );
        fs.writeFileSync(f, content);
        console.log('Fixed GSAP scripts in', f);
    }
});
