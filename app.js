const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.eyebrow, .section-kicker, .manifesto-intro, .manifesto-words, .manifesto-note, .journey-head, .journey-step, .practice-title, .cap-item, .cap-detail, .work-heading, .project-row, .impact-grid, .belief-line, .contact h2, .contact-cta');
revealTargets.forEach((el) => el.classList.add('reveal'));
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach((el) => observer.observe(el));
} else revealTargets.forEach((el) => el.classList.add('in-view'));

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.setAttribute('aria-hidden', String(!open));
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) menu.querySelector('a').focus(); else menuToggle.focus();
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
});

const capabilityCopy = {
  systems: { title: 'Systems that<br/>make sense.', body: 'Connect hardware, firmware, communication and cloud into one understandable picture. Practical IoT learning starts with seeing how the parts relate.', tag: 'SENSORS · MICROCONTROLLERS · DEVICE-TO-CLOUD' },
  learning: { title: 'Learning that<br/>sticks.', body: 'Teach by making, testing and explaining. Real hardware and practical feedback help learners move from following steps to understanding why they work.', tag: 'PRACTICE · FEEDBACK · CONFIDENCE' },
  leadership: { title: 'People moving<br/>in the same direction.', body: 'Bring people into the work with context, clear communication and shared ownership of the next step.', tag: 'ALIGNMENT · MENTORING · TEAMWORK' },
  operations: { title: 'Make the plan<br/>work in practice.', body: 'Translate goals into workable processes. Keep an eye on dependencies, people and details so good intentions can become consistent execution.', tag: 'PROCESS · COORDINATION · FOLLOW-THROUGH' },
  communication: { title: 'Make room for<br/>the right question.', body: 'Explain technical ideas in everyday language, listen for what someone needs, and help learners explore where their strengths might lead.', tag: 'PRESENTATION · GUIDANCE · CLARITY' },
  business: { title: 'Build an idea<br/>with purpose.', body: 'Shape initiatives around real needs, connect the right contributors, and keep learning from how the work meets the world.', tag: 'INITIATIVE · PARTNERSHIPS · ITERATION' }
};
const capItems = document.querySelectorAll('.cap-item');
const capDetail = document.querySelector('.cap-detail');
capItems.forEach((item) => {
  const activate = () => {
    capItems.forEach((other) => other.classList.toggle('active', other === item));
    const copy = capabilityCopy[item.dataset.cap];
    capDetail.classList.remove('in-view');
    capDetail.innerHTML = `<div class="cap-glyph"><span class="glyph-line"></span><span class="glyph-node"></span><span class="glyph-node"></span><span class="glyph-node"></span></div><p class="eyebrow">A CLOSER LOOK</p><h3>${copy.title}</h3><p>${copy.body}</p><span class="cap-tag">${copy.tag}</span>`;
    requestAnimationFrame(() => capDetail.classList.add('in-view'));
  };
  item.addEventListener('click', activate);
  item.addEventListener('focus', activate);
});

const cursor = document.querySelector('.cursor');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer && !reducedMotion) {
  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.querySelectorAll('.project-row, .contact-cta').forEach((target) => {
    target.addEventListener('pointerenter', () => cursor.classList.add('visible'));
    target.addEventListener('pointerleave', () => cursor.classList.remove('visible'));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); }
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();

