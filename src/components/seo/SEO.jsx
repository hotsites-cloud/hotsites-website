import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '../../config/site';

/**
 * Page-level SEO: title, description, canonical URL and optional JSON-LD.
 */
export function SEO({ title, description, canonical, structuredData }) {
  const canonicalUrl =
    canonical === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${canonical}`;

  const jsonLdPayload = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {jsonLdPayload.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string.isRequired,
  structuredData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

SEO.defaultProps = {
  structuredData: undefined,
};
