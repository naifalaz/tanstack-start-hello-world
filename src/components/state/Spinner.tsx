// src/components/state/Spinner.tsx
type SpinnerProps = {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
  };

  export function Spinner({ label = 'Loading...', size = 'md' }: SpinnerProps) {
    const sizeClass =
      size === 'sm'
        ? 'h-4 w-4 border-2'
        : size === 'lg'
          ? 'h-10 w-10 border-4'
          : 'h-6 w-6 border-2';

    return (
      <div className="flex items-center gap-3 text-slate-600" aria-live="polite" aria-busy="true">
        <div className={`animate-spin rounded-full border-slate-300 border-t-sky-600 ${sizeClass}`}></div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  }
  