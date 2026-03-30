import PropTypes from 'prop-types';

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
    }),
  ),
};
