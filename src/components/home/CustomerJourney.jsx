import PropTypes from 'prop-types';
import {
  MessageCircle,
  Palette,
  Layers,
  MonitorPlay,
  Rocket,
  CalendarCheck,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const stepIcons = [MessageCircle, Palette, Layers, MonitorPlay, Rocket, CalendarCheck];

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.lead
 * @param {string} props.eyebrow
 * @param {(index: number) => string} props.getStepLabel
 * @param {Array<{ title: string, description: string }>} props.steps
 */
export function CustomerJourney({ title, lead, eyebrow, getStepLabel, steps }) {
  const count = Array.isArray(steps) ? steps.length : 0;

  return (
    <section className="relative" aria-labelledby="customer-journey-heading">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted">{eyebrow}</p>
        <h2
          id="customer-journey-heading"
          className="mt-3 text-2xl font-semibold tracking-tight text-brand-strong md:text-3xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-brand md:text-lg">
          {lead}
        </p>
      </header>

      <ol className="relative mx-auto mt-14 max-w-3xl list-none pl-0" role="list">
        {Array.isArray(steps) &&
          steps.map((step, index) => {
            const Icon = stepIcons[index] ?? MessageCircle;
            const isLast = index === count - 1;

            return (
              <li
                key={step.title}
                className={cn('relative', !isLast && 'pb-12 md:pb-14')}
              >
                {!isLast ? (
                  <span
                    className="absolute left-[21px] top-[52px] bottom-0 w-px bg-border md:left-[23px]"
                    aria-hidden
                  />
                ) : null}
                <div className="relative flex gap-5 md:gap-8">
                  <div className="flex shrink-0 flex-col items-center">
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-2xl border border-border',
                        'bg-surface shadow-sm ring-4 ring-[var(--color-page)]',
                        'text-brand-strong',
                      )}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <article className="min-w-0 flex-1 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm md:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                      {getStepLabel(index)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-strong md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand md:text-[15px]">
                      {step.description}
                    </p>
                  </article>
                </div>
              </li>
            );
          })}
      </ol>
    </section>
  );
}

CustomerJourney.propTypes = {
  title: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  getStepLabel: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
