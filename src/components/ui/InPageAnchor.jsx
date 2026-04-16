import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/**
 * In-page section link compatible with HashRouter: plain fragment hrefs would
 * replace "#/route" and break navigation. This keeps href on the current route
 * and scrolls to the target id on click.
 */
export function InPageAnchor({ targetId, className, children, ...rest }) {
  const { pathname } = useLocation();
  const routeHref = `#${pathname}`;

  const handleClick = (event) => {
    event.preventDefault();
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <a href={routeHref} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}

InPageAnchor.propTypes = {
  targetId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
