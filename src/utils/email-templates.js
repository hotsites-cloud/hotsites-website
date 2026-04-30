/** @param {unknown} text */
export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {unknown} text */
export function formatEmailMultiline(text) {
  return escapeHtml(text).replace(/\r\n|\r|\n/g, '<br />');
}

/**
 * @param {{ label: string; value: string }[]} rows
 * @returns {string}
 */
function summaryExtraRowsHtml(rows) {
  const parts = rows
    .filter((r) => String(r.value ?? '').trim() !== '')
    .map((r) => {
      const label = escapeHtml(r.label);
      const value = escapeHtml(r.value);
      return `<p style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#6e6e6e;"><strong style="color:#000000;">${label}</strong><br /><span style="color:#555555;">${value}</span></p>`;
    });
  return parts.join('');
}

/**
 * @param {{ label: string; value: string }[]} rows
 * @returns {string}
 */
function adminMetaRowsHtml(rows) {
  const filtered = rows.filter((r) => String(r.value ?? '').trim() !== '');
  if (filtered.length === 0) {
    return '';
  }
  const inner = filtered
    .map((r) => {
      const label = escapeHtml(r.label);
      const value = escapeHtml(r.value);
      return `<tr>
                  <td style="padding:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6e6e6e;width:132px;vertical-align:top;">
                    ${label}
                  </td>
                  <td style="padding:0 0 10px;font-size:15px;line-height:1.5;color:#000000;vertical-align:top;">
                    ${value}
                  </td>
                </tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
                ${inner}
              </table>`;
}

/**
 * Dutch visitor receipt — matches site tokens (globals.css).
 * @param {{
 *   logoUrl: string;
 *   siteUrl: string;
 *   siteName: string;
 *   title: string;
 *   body: string;
 *   summaryLabel: string;
 *   nameLabel: string;
 *   emailLabel: string;
 *   visitorName: string;
 *   visitorEmail: string;
 *   footer: string;
 *   tagline: string;
 *   kicker: string;
 *   summaryExtraRows?: { label: string; value: string }[];
 * }} p
 */
export function buildContactVisitorEmailHtml(p) {
  const safe = {
    logoUrl: escapeHtml(p.logoUrl),
    siteUrl: escapeHtml(p.siteUrl),
    siteName: escapeHtml(p.siteName),
    title: escapeHtml(p.title),
    body: escapeHtml(p.body),
    summaryLabel: escapeHtml(p.summaryLabel),
    nameLabel: escapeHtml(p.nameLabel),
    emailLabel: escapeHtml(p.emailLabel),
    visitorName: escapeHtml(p.visitorName),
    visitorEmail: escapeHtml(p.visitorEmail),
    footer: escapeHtml(p.footer),
    tagline: escapeHtml(p.tagline),
    kicker: escapeHtml(p.kicker),
  };
  const extraSummary = summaryExtraRowsHtml(p.summaryExtraRows ?? []);

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${safe.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#eeeeee;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#eeeeee;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #d4d4d4;">
          <tr>
            <td style="background-color:#000000;padding:22px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${safe.logoUrl}" alt="${safe.siteName}" width="132" height="32" style="display:block;height:28px;width:auto;max-width:140px;border:0;outline:none;" />
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#eeeeee;">
                    ${safe.kicker}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 28px 8px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
              <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;font-weight:800;color:#000000;letter-spacing:-0.02em;">
                ${safe.title}
              </h1>
              <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#555555;">
                ${safe.body}
              </p>
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6e6e6e;">
                ${safe.summaryLabel}
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#e8e8e8;border:1px solid #d4d4d4;">
                <tr>
                  <td style="padding:18px 20px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#6e6e6e;">
                      <strong style="color:#000000;">${safe.nameLabel}</strong><br />
                      <span style="color:#555555;">${safe.visitorName}</span>
                    </p>
                    <p style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#6e6e6e;">
                      <strong style="color:#000000;">${safe.emailLabel}</strong><br />
                      <a href="mailto:${safe.visitorEmail}" style="color:#000000;text-decoration:underline;">${safe.visitorEmail}</a>
                    </p>
                    ${extraSummary}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 32px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#555555;">
                ${safe.footer}
              </p>
              <p style="margin:0;font-size:12px;line-height:1.55;color:#6e6e6e;border-top:1px solid #d4d4d4;padding-top:20px;">
                ${safe.tagline}
              </p>
              <p style="margin:16px 0 0;font-size:12px;line-height:1.5;">
                <a href="${safe.siteUrl}" style="color:#000000;font-weight:600;text-decoration:underline;">${safe.siteUrl}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Internal team copy — language follows active site locale.
 * @param {{
 *   siteUrl: string;
 *   siteName: string;
 *   visitorName: string;
 *   visitorEmail: string;
 *   visitorMessage: string;
 *   headline: string;
 *   intro: string;
 *   labelName: string;
 *   labelEmail: string;
 *   labelMessage: string;
 *   footer: string;
 *   badge: string;
 *   htmlLang: string;
 *   metaRows?: { label: string; value: string }[];
 * }} p
 */
export function buildContactAdminEmailHtml(p) {
  const safe = {
    siteUrl: escapeHtml(p.siteUrl),
    siteName: escapeHtml(p.siteName),
    visitorName: escapeHtml(p.visitorName),
    visitorEmail: escapeHtml(p.visitorEmail),
    headline: escapeHtml(p.headline),
    intro: escapeHtml(p.intro),
    labelName: escapeHtml(p.labelName),
    labelEmail: escapeHtml(p.labelEmail),
    labelMessage: escapeHtml(p.labelMessage),
    footer: escapeHtml(p.footer),
    badge: escapeHtml(p.badge),
  };
  const messageHtml = formatEmailMultiline(p.visitorMessage);
  const lang = escapeHtml(p.htmlLang || 'en');
  const metaBlock = adminMetaRowsHtml(p.metaRows ?? []);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${safe.headline}</title>
</head>
<body style="margin:0;padding:0;background-color:#eeeeee;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#eeeeee;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #d4d4d4;">
          <tr>
            <td style="background-color:#000000;padding:20px 28px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;">
                ${safe.badge}
              </p>
              <h1 style="margin:0;font-size:20px;line-height:1.3;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                ${safe.headline}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#555555;">
                ${safe.intro}
              </p>
              ${metaBlock}
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6e6e6e;width:120px;vertical-align:top;">
                    ${safe.labelName}
                  </td>
                  <td style="padding:0 0 10px;font-size:15px;line-height:1.5;color:#000000;font-weight:600;vertical-align:top;">
                    ${safe.visitorName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6e6e6e;vertical-align:top;">
                    ${safe.labelEmail}
                  </td>
                  <td style="padding:0 0 10px;font-size:15px;line-height:1.5;vertical-align:top;">
                    <a href="mailto:${safe.visitorEmail}" style="color:#000000;font-weight:600;text-decoration:underline;">${safe.visitorEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6e6e6e;">
                ${safe.labelMessage}
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fafafa;border:1px solid #d4d4d4;border-left:4px solid #000000;">
                <tr>
                  <td style="padding:20px 22px;font-size:15px;line-height:1.65;color:#333333;">
                    ${messageHtml}
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#6e6e6e;">
                ${safe.footer}
              </p>
              <p style="margin:16px 0 0;font-size:12px;line-height:1.5;">
                <a href="${safe.siteUrl}" style="color:#000000;font-weight:600;text-decoration:underline;">${safe.siteUrl}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
