import PropTypes from 'prop-types';
import { Button } from '../ui/Button';
import { resetCookieConsentAndReload } from '../../config/cookies';

/**
 * Renders h2 + body paragraphs from i18n section objects.
 */
export function LegalSections({ sections }) {
  if (!Array.isArray(sections)) {
    return null;
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <section key={index}>
          <h2 className="text-xl font-semibold text-brand-strong">{section.h2}</h2>
          <p className="mt-3 whitespace-pre-line text-brand-muted">{section.body}</p>
          {section.showCookieBannerButton && section.cookieBannerButtonLabel ? (
            <div className="mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={resetCookieConsentAndReload}
                className="min-h-11 w-full sm:w-auto"
              >
                {section.cookieBannerButtonLabel}
              </Button>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}

LegalSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      h2: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      showCookieBannerButton: PropTypes.bool,
      cookieBannerButtonLabel: PropTypes.string,
    }),
  ),
};
