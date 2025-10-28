// Inicializar AOS
AOS.init();

// Menu móvel
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    // garantir que a navbar fique visível quando o menu é aberto
    if (navLinks.classList.contains('active')) navbar.classList.remove('hidden');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Efeito de shrink na navbar ao rolar a página + esconder ao rolar para baixo
let lastScroll = window.scrollY || 0;
const SCROLL_DELTA = 8; // sensibilidade em pixels

const handleScroll = () => {
    const current = window.scrollY;
    // shrink visual
    if (current > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // esconder quando rolar para baixo, mostrar ao rolar para cima
    if (current > lastScroll + SCROLL_DELTA && current > 80) {
        // rolando para baixo
        if (!navLinks.classList.contains('active')) navbar.classList.add('hidden');
    } else if (current < lastScroll - SCROLL_DELTA) {
        // rolando para cima
        navbar.classList.remove('hidden');
    }

    lastScroll = current;
};

// checar estado inicial e escutar evento
handleScroll();
window.addEventListener('scroll', handleScroll, { passive: true });

// Ajusta a variável CSS --footer-height para que a seção de citação ocupe
// exatamente o espaço restante da viewport (sem alterar o footer)
function updateFooterHeight() {
    const footerEl = document.querySelector('footer');
    const height = footerEl ? Math.round(footerEl.getBoundingClientRect().height) : 110;
    document.documentElement.style.setProperty('--footer-height', height + 'px');
}

// Atualiza no carregamento e quando a janela for redimensionada
updateFooterHeight();
window.addEventListener('load', updateFooterHeight);
window.addEventListener('resize', updateFooterHeight);

// Caso o conteúdo do footer mude dinamicamente, observe mudanças
const footerEl = document.querySelector('footer');
if (footerEl && 'MutationObserver' in window) {
    const mo = new MutationObserver(() => updateFooterHeight());
    mo.observe(footerEl, { childList: true, subtree: true, attributes: true });
}