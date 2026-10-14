const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    const select = document.querySelector('select[name="service"]');
    if (select) {
      const matchingOption = [...select.options].find(option => option.text === service);
      if (matchingOption) select.value = matchingOption.value;
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = `LiftX Infra enquiry: ${data.get('service')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Service: ${data.get('service')}`,
    '',
    'Project details:',
    data.get('message')
  ].join('\n');

  // Replace this placeholder with your real business email before publishing.
  const businessEmail = 'your-email@example.com';
  const status = document.getElementById('formStatus');

  if (businessEmail === 'your-email@example.com') {
    status.textContent = 'Demo mode: your details are ready, but the business email is still a placeholder. Update businessEmail in script.js before launch.';
    const preview = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = preview;
    return;
  }
  window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});