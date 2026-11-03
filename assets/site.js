document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Service detail pages link to the enquiry form with the category slug.
  const serviceDefaults = {
    'skilled-home-nursing-care': 'Tracheostomy Care',
    'wound-recovery-care': 'Wound Dressing Care',
    'elderly-personal-care': 'Elderly Care',
    'bedridden-mobility-care': 'Bedridden Patient Care',
    'palliative-special-patient-care': 'Palliative Care',
    'home-nursing-attender-services': 'Home Nursing Care'
  };
  const serviceSelect = document.querySelector('#cust-service');
  const requestedCategory = new URLSearchParams(window.location.search).get('service');
  if (serviceSelect && requestedCategory && serviceDefaults[requestedCategory]) {
    serviceSelect.value = serviceDefaults[requestedCategory];
  }

  document.querySelectorAll('form[data-mailto-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(form.dataset.subject || 'JNS website enquiry');
      let body = '';
      for (const [key, value] of data.entries()) body += `${key}: ${value}\n`;
      body += '\nPlease do not include detailed medical records or sensitive health information in this enquiry.';
      const href = `mailto:jnshomenursingservices@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Opening your email app with the enquiry details. Please review and send the email there.';
      window.location.href = href;
    });
  });
});
