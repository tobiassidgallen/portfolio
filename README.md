# Premium Portfolio Website

A luxurious and sophisticated portfolio website showcasing my work as an Electronics Engineering graduate and web developer. This portfolio features smooth animations, elegant design, and premium user experience.

## Features

- 🎨 Elegant and premium design with smooth animations
- ✨ Interactive speedometer preloader
- 📱 Fully responsive design for all devices
- 🌓 Dark/Light theme toggle
- 🎯 Custom cursor effects
- 📜 Smooth scrolling
- 🖼️ Project showcase with hover effects
- ⚡ Performance optimized
- 🎭 AOS (Animate On Scroll) animations
- 📝 Contact form with validation
- 🔗 Social media integration
- 📈 Experience timeline
- 🎯 Skills showcase with interactive tags

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- AOS (Animate On Scroll)
- Font Awesome Icons
- Google Fonts

## Project Structure

```
sidportfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── resume.pdf
│   ├── hero-fallback.jpg
│   ├── herovideo.mp4
│   ├── sid.jpg
│   ├── sid.webp
│   ├── project1.jpg
│   ├── project1.webp
│   ├── project2.jpg
│   ├── project2.webp
│   ├── project3.jpg
│   ├── project3.webp
│   └── favicon.ico
└── README.md
```

## Projects Showcased

1. **Mabuhay Power & Diesel Generator Services**
   - Responsive website for generator repair and maintenance business
   - Features service showcases and customer inquiry systems
   - Live demo: [View Website](https://tobiassidgallen.github.io/mabuhay-power/)

2. **MJK Iron Works**
   - Industrial-inspired website for custom metal fabrication services
   - Modern design reflecting brand craftsmanship
   - Live demo: [View Website](https://mjkironworks.site/)

3. **Arduino Recycling Project**
   - Capstone project: Reverse Vending Machine
   - Integration of Arduino Uno, Raspberry Pi, and various sensors
   - Documentation: [View Thesis](https://drive.google.com/file/d/1hgbdzbpwgbAUP-QoYpDYZP55lh_Qxnfx/view)

## Contact

- Email: tobiassidgallen@gmail.com
- Phone: +63 977 684 9127
- GitHub: [tobiassidgallen](https://github.com/tobiassidgallen)
- Facebook: [seedtobias](https://www.facebook.com/seedtobias/)
- Instagram: [gallentobias](https://www.instagram.com/gallentobias/)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/tobiassidgallen/portfolio.git
```

2. Navigate to the project directory:
```bash
cd portfolio
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #0a0a0a;
    --secondary-color: #d4af37;
    --text-color: #333333;
    --background-color: #ffffff;
    --accent-color: #e63946;
    --gradient-primary: linear-gradient(135deg, #d4af37 0%, #f6e27a 100%);
    --gradient-dark: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
}
```

### Content
1. Update the content in `index.html`
2. Replace images in the `assets` directory
3. Modify animations in `js/main.js`

### Fonts
The website uses Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Performance Optimization

- Images are optimized for web (using WebP format with fallbacks)
- CSS and JavaScript are optimized
- Lazy loading for images
- Efficient animations using GSAP
- Smooth scrolling implementation
- Mobile-first responsive design
- Touch-friendly interactions

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Fonts: Google Fonts (Playfair Display, Montserrat)
- Icons: Font Awesome
- Animations: GSAP, AOS
- Images: Personal portfolio images 