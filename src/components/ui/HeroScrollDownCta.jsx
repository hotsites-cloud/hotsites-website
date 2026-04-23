import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

/**
 * Hero footer: korte hint + knop die naar inhoud lager op de pagina scrolt.
 * Gebruikt dezelfde stijl als de start-hero.
 */
export function HeroScrollDownCta({ hintId, onScroll, hintText, ctaText }) {
  return (
    <div className="flex flex-col items-center gap-3 pb-1 sm:gap-4 sm:pb-2">
      <p
        id={hintId}
        className="text-center text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.28em] text-white/80 sm:text-xs sm:tracking-[0.32em]"
      >
        {hintText}
      </p>
      <div
        className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent sm:w-16"
        aria-hidden
      />
      <button
        type="button"
        onClick={onScroll}
        aria-describedby={hintId}
        className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 outline-none ring-offset-2 ring-offset-zinc-950/80 backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.18] hover:shadow-xl hover:shadow-black/40 focus-visible:ring-2 focus-visible:ring-white/95 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] sm:min-h-[3.25rem] sm:gap-3 sm:px-9 sm:py-4 sm:text-base"
      >
        <span className="select-none">{ctaText}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 opacity-95 transition-transform duration-300 ease-out group-hover:translate-y-0.5 motion-reduce:transition-none"
          aria-hidden
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}

HeroScrollDownCta.propTypes = {
  hintId: PropTypes.string.isRequired,
  onScroll: PropTypes.func.isRequired,
  hintText: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
};
