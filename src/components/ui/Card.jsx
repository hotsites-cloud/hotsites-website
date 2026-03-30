import { createElement } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export function Card({ children, className, as: Tag = 'div', ...rest }) {
  return createElement(
    Tag,
    {
      className: cn(
        'rounded-2xl border border-border bg-surface p-6 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-200 hover:shadow-md',
        className,
      ),
      ...rest,
    },
    children,
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};
