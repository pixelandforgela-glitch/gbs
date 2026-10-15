/* Span intake and mailto fallback follow Sundello's Origin quote form. */
(function () {
  'use strict';
  const form = document.getElementById('gbs-contact');
  if (!form) return;
  form.noValidate = true;
  function focusContactName() {
    document.getElementById('contact-name').focus({ preventScroll: true });
  }
  document.querySelectorAll('a[href="#gbs-contact"]').forEach(function (link) {
    link.addEventListener('click', function () { setTimeout(focusContactName, 0); });
  });
  if (window.location.hash === '#gbs-contact') setTimeout(focusContactName, 0);
  const endpoint = 'https://span.scaffold.site/api/widget/intake?businessId=6137817c-4edf-4988-8642-3b2b1f194775';
  const emailAddress = 'info@gbs-usa.build';
  const status = document.getElementById('contact-status');
  const fallback = document.getElementById('contact-fallback');
  const fields = document.getElementById('contact-fields');
  const input = (name) => form.elements.namedItem(name);
  const text = (name) => input(name).value.trim();

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (form.dataset.sending === '1') return;
    fallback.hidden = true;
    if (text('company')) {
      form.reset();
      status.textContent = 'Thank you for your inquiry.';
      return;
    }
    let invalid = null;
    ['name', 'email', 'phone', 'organization', 'message'].forEach(function (name) {
      const field = input(name);
      field.setCustomValidity('');
      if (field.required && !text(name)) field.setCustomValidity('Please fill out this field.');
      if (name === 'email' && text(name) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(name))) {
        field.setCustomValidity('Please enter a valid email address.');
      }
      if (name === 'phone' && text(name) && (!/^[0-9+().\-\s]{7,40}$/.test(text(name)) || !/\d/.test(text(name)))) {
        field.setCustomValidity('Please enter a phone number of 7 to 40 characters, including at least one digit.');
      }
      const valid = field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid && !invalid) invalid = field;
    });
    if (invalid) {
      status.textContent = 'Please check the highlighted field and try again.';
      invalid.focus();
      invalid.reportValidity();
      return;
    }
    const details = [
      text('organization') ? 'Company: ' + text('organization') : '',
      text('projectType') ? 'Project type: ' + text('projectType') : '',
      'Message: ' + text('message')
    ].filter(Boolean).join('\n\n');
    // Span reserves `company` for its honeypot, not the visitor's company name.
    const payload = {
      name: text('name'), email: text('email'), phone: text('phone'),
      notes: details, company: text('company')
    };
    const body = JSON.stringify(payload);
    if (new TextEncoder().encode(body).length > 8000) {
      status.textContent = 'Please shorten your message and try again.';
      input('message').focus();
      return;
    }
    const mailto = 'mailto:' + emailAddress + '?subject=' + encodeURIComponent('GBS project inquiry') +
      '&body=' + encodeURIComponent('Name: ' + payload.name + '\nEmail: ' + payload.email +
      '\nPhone: ' + (payload.phone || 'Not provided') + '\n\n' + details);
    form.dataset.sending = '1';
    fields.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your inquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(function () { controller.abort(); }, 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: body, signal: controller.signal
      });
      const raw = await response.text();
      const data = raw ? JSON.parse(raw) : null;
      if (response.status !== 200 || !data || data.ok !== true || data.leadId == null || String(data.leadId) === '') {
        throw new Error('Intake did not confirm a saved inquiry.');
      }
      form.reset();
      status.textContent = 'Thank you. Your inquiry has been sent to the GBS team.';
    } catch (error) {
      status.textContent = 'We could not confirm your inquiry was saved. Your email app will open a prefilled message. If it does not open, use the email link below.';
      fallback.href = mailto;
      fallback.hidden = false;
      try { window.location.href = mailto; } catch (error) { /* The visible link remains available. */ }
    } finally {
      clearTimeout(timeout);
      form.dataset.sending = '';
      fields.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
})();
