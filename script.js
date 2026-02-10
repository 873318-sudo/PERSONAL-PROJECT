const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

// split headings
// H1 (split by <br>)
document.querySelectorAll('.split-heading').forEach(h1 => {
 const parts = h1.innerHTML.split('<br>');
 h1.innerHTML = parts
   .map(line => `<span class="line">${line}</span>`)
   .join('');
});

// H2 (single line)
document.querySelectorAll('.split-subheading').forEach(h2 => {
 h2.innerHTML = `<span class="line">${h2.textContent}</span>`;
});

// split paragraph
document.querySelectorAll('.hero-content p').forEach(p => {
 p.innerHTML = p.innerHTML
   .split('\n\n') // double line breaks
   .map(line => `<span class="line paragraph">${line}</span>`)
   .join('')
});

// observer
const lines = hero.querySelectorAll('.line');
const heroObserver = new IntersectionObserver((entries, observer) => {
 entries.forEach(entry => {
   if (entry.isIntersecting) {


     // trigger text immediately
     lines.forEach((line, i) => {
       setTimeout(() => {
         line.classList.add('active');
       }, i * 100);
     });


     // trigger image shortly after section enters
     setTimeout(() => {
       const heroImages = document.querySelectorAll('.hero-visual');
       heroImages.forEach((img, i) => {
           setTimeout(() => {
               img.classList.add('active');
           }, i * 200);
       });
     }, 200);


     observer.unobserve(entry.target);
   }
 });
}, { threshold: 0.2 });

heroObserver.observe(hero);

