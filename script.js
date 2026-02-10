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

// for progression pages
function splitIntoLines(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(el => {
    if (el.tagName.toLowerCase() === 'p') {
      el.innerHTML = el.innerHTML
        .split(/\n{2,}/) // double newlines
        .map(line => `<span class="line paragraph">${line.trim()}</span>`)
        .join('');
    } else {
      el.innerHTML = el.innerHTML
        .split(/<br\s*\/?>/i)
        .map(line => `<span class="line">${line.trim()}</span>`)
        .join('');
    }
  });
}

splitIntoLines('.progression-content p');
splitIntoLines('.progression-section h1, .progression-section h2');

const sectionObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const container = entry.target;
    const lines = container.querySelectorAll('.line');

    lines.forEach((ln, i) => setTimeout(() => ln.classList.add('active'), i * 90));

    // reveal any abs-img inside this section
    container.querySelectorAll('.abs-img').forEach((img, i) => {
      setTimeout(() => img.classList.add('show'), lines.length * 90 + i * 120);
    });

    obs.unobserve(container);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.subsection, .progression-section').forEach(s => sectionObserver.observe(s));