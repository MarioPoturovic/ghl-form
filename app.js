(function () {
  const form = document.getElementById('leadForm');
  const btn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');

  function setError(input, msg) {
    input.closest('.field').querySelector('.error').textContent = msg || '';
  }

  function validate() {
    let ok = true;
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    setError(email); setError(phone);

    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, 'Please enter a valid email.');
      ok = false;
    }
    if (phone.value && !/^\+?[0-9\s\-().]{7,}$/.test(phone.value)) {
      setError(phone, 'Please enter a valid phone number (prefer +country code).');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // basic honeypot
    if (form.company && form.company.value) return;

    btn.disabled = true;
    statusEl.textContent = 'Submitting…';

    try {
      // normal POST to your own backend/email service if you want,
      // but for HighLevel’s External Tracking you don’t need to change action:
      // the tracker auto-captures the submission event.

      // simulate success UI (the actual HighLevel capture is handled by the tracking script)
      await new Promise(r => setTimeout(r, 800));
      form.reset();
      statusEl.textContent = 'Thanks! We’ll text you shortly.';

    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again.';
      console.error(err);
    } finally {
      btn.disabled = false;
    }
  });
})();