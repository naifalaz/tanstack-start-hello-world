// src/components/state/StatePanel.tsx
type StatePanelProps = {
    title: string;
    message: string;
    tone?: 'neutral' | 'error' | 'success';
    actionLabel?: string;
    onAction?: () => void;
  };

  export function StatePanel({
    title,
    message,
    tone = 'neutral',
    actionLabel,
    onAction,
  }: StatePanelProps) {
    const toneClass =
      tone === 'error'
        ? 'border-red-200 bg-red-50 text-red-900'
        : tone === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
          : 'border-slate-200 bg-slate-50 text-slate-900';

    return (
      <div className={`rounded-xl border p-6 ${toneClass}`} role={tone === 'error' ? 'alert' : 'status'}>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm leading-6">{message}</p>
          {actionLabel && onAction && (
            <button
              className="mt-3 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
              onClick={onAction}
              type="button"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    );
  }