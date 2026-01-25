
// animation trigger
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.hero-content').classList.add('active');
            entry.target.querySelector('.hero-visual').classList.add('active');
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.hero'));