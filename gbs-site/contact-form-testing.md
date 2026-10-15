# Contact form checks

Serve `gbs-site/dist` with `python3 -m http.server --directory gbs-site/dist` from the repository root and open `http://127.0.0.1:8000/#contact`.

- Check labels and keyboard focus, required name/email/message, email format, optional phone validation, company and all four project types. Whitespace-only required values must fail.
- Inspect the POST with a browser network interception, without creating a production lead. It must target GBS business `77546c9a-01fe-4c3c-b979-b2b4efe48b66`, use JSON, put the visible company and project type in `notes`, and leave the reserved `company` honeypot empty.
- Mock `200 {"ok":true,"leadId":"test-lead"}`: an inline thank-you appears, fields reset, and no mailto opens. A second submit while pending must not send twice.
- Mock HTTP errors, network failure, malformed JSON, `200 {"ok":true}` without a lead ID, and a timed-out request: keep the typed inquiry, show an inline error, open a prefilled mailto to `info@gbs-usa.build`, and expose a clickable fallback link.
- Fill the offscreen `company` honeypot: no request or mailto should be sent.
- Check 1280px desktop and 390px/320px phone layouts for overflow, labels, controls, and the existing phone/email links. The status region uses `aria-live="polite"`.
- Confirm the existing chat widget, product copy, phone, email and footer are unchanged. No production lead submission or email sending is needed for these checks.

Span enforces its business widget origin allowlist. A Cloudflare preview origin may be rejected unless already allowed; that must use the mailto fallback. This change does not alter business settings, DNS, hosting, or the allowlist.
