import { createElement, useId, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

export function ValueCard({
  title,
  summary,
  detail,
  readMoreLabel,
  readLessLabel,
  icon,
  className,
}) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();
  const hasDetail = Boolean(detail && String(detail).trim());

  return (
    <Card className={cn('h-full', className)}>
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-brand-strong">
          {createElement(icon, { className: 'h-5 w-5', 'aria-hidden': true })}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-brand-strong">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{summary}</p>
          {hasDetail ? (
            <>
              <div
                id={detailId}
                hidden={!expanded}
                className="mt-2 text-sm leading-relaxed text-brand-muted"
              >
                {detail}
              </div>
              <button
                type="button"
                className="mt-3 text-sm font-medium text-brand-strong underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-muted focus-visible:ring-offset-2 rounded"
                onClick={() => {
                  setExpanded((v) => !v);
                }}
                aria-expanded={expanded}
                aria-controls={detailId}
              >
                {expanded ? readLessLabel : readMoreLabel}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

ValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  detail: PropTypes.string,
  readMoreLabel: PropTypes.string.isRequired,
  readLessLabel: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};
