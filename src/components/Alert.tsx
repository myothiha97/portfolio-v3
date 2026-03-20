interface AlertProps {
  type: 'danger' | 'success';
  text: string;
}

const Alert = ({ type, text }: AlertProps) => {
  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-lg border backdrop-blur-md shadow-lg ${
          isSuccess
            ? 'bg-emerald-500/10 border-emerald-400/25 text-emerald-300/90'
            : 'bg-red-500/10 border-red-400/25 text-red-300/90'
        }`}
        role="alert">
        {/* Icon */}
        <div className={`w-5 h-5 flex-shrink-0 ${isSuccess ? 'text-emerald-400' : 'text-red-400'}`}>
          {isSuccess ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          )}
        </div>
        <p className="text-sm font-light tracking-wide">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
