import {
  forwardRef,
  useRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';

// Normalise Bangla digits to Latin digits
function parseBanglaDigits(str: string): string {
  const banglaDigits = '০১২৩৪৫৬৭৮৯';
  return str.replace(/[০-৯]/g, (d) => String(banglaDigits.indexOf(d)));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = '', id, ...props },
  ref,
) {
  const inputId = id || props.name || Math.random().toString(36).substring(7);
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-small font-medium text-moss-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full min-h-[44px] h-11 px-3.5 bg-white border rounded-sm text-body text-moss-900 placeholder:text-moss-400 focus:outline-none focus:border-deep-600 focus:ring-1 focus:ring-deep-600 transition-colors disabled:bg-moss-100 disabled:cursor-not-allowed ${
          error
            ? 'border-status-danger-text ring-1 ring-status-danger-text'
            : 'border-moss-200'
        } ${className}`}
        {...props}
      />
      {hint && !error && (
        <p className="text-caption text-moss-500 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-caption text-status-danger-text font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, className = '', id, rows = 4, ...props },
    ref,
  ) {
    const inputId = id || props.name || Math.random().toString(36).substring(7);
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-small font-medium text-moss-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`w-full p-3.5 bg-white border rounded-sm text-body text-moss-900 placeholder:text-moss-400 focus:outline-none focus:border-deep-600 focus:ring-1 focus:ring-deep-600 transition-colors resize-y disabled:bg-moss-100 disabled:cursor-not-allowed ${
            error
              ? 'border-status-danger-text ring-1 ring-status-danger-text'
              : 'border-moss-200'
          } ${className}`}
          {...props}
        />
        {hint && !error && (
          <p className="text-caption text-moss-500 mt-1">{hint}</p>
        )}
        {error && (
          <p className="text-caption text-status-danger-text font-medium mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, hint, options, children, className = '', id, ...props },
    ref,
  ) {
    const inputId = id || props.name || Math.random().toString(36).substring(7);
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-small font-medium text-moss-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={`w-full min-h-[44px] h-11 px-3.5 pr-8 bg-white border rounded-sm text-body text-moss-900 focus:outline-none focus:border-deep-600 focus:ring-1 focus:ring-deep-600 transition-colors appearance-none cursor-pointer disabled:bg-moss-100 disabled:cursor-not-allowed ${
              error ? 'border-status-danger-text' : 'border-moss-200'
            } ${className}`}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-moss-500 text-small">
            ▼
          </span>
        </div>
        {hint && !error && (
          <p className="text-caption text-moss-500 mt-1">{hint}</p>
        )}
        {error && (
          <p className="text-caption text-status-danger-text font-medium mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

// PhoneInput with +880 prefix, BD mobile validation (013-019), accepts Bangla digits
interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  label = 'Phone number',
  error,
  hint,
  disabled,
}: PhoneInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Normalise input to digits
    const normalised = parseBanglaDigits(e.target.value).replace(/\D/g, '');
    onChange(normalised.slice(0, 11));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-small font-medium text-moss-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center w-full min-h-[44px] h-11 border border-moss-200 rounded-sm bg-white overflow-hidden focus-within:border-deep-600 focus-within:ring-1 focus-within:ring-deep-600">
        <span className="px-3.5 bg-mist text-moss-600 text-body font-medium border-r border-moss-200 select-none">
          +880
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={value}
          disabled={disabled}
          onChange={handleInputChange}
          placeholder="01700 000000"
          className="w-full h-full px-3.5 text-body text-moss-900 bg-transparent placeholder:text-moss-400 focus:outline-none font-variant-numeric tabular-nums"
        />
      </div>
      {hint && !error && (
        <p className="text-caption text-moss-500 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-caption text-status-danger-text font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// OtpInput: 6 distinct boxes, paste, autofill, resend timer
interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  onComplete?: (code: string) => void;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  onComplete,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (index: number, val: string) => {
    const normalised = parseBanglaDigits(val).replace(/\D/g, '');
    if (!normalised) {
      // Backspace or clear
      const updated = value.slice(0, index) + '' + value.slice(index + 1);
      onChange(updated);
      return;
    }

    const char = normalised[normalised.length - 1];
    const updated = value.slice(0, index) + char + value.slice(index + 1);
    onChange(updated);

    if (updated.length === length && onComplete) {
      onComplete(updated);
    } else if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = parseBanglaDigits(e.clipboardData.getData('text'))
      .replace(/\D/g, '')
      .slice(0, length);
    onChange(pasted);
    if (pasted.length === length && onComplete) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-between max-w-sm">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          disabled={disabled}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-13 text-center text-h3 font-bold text-moss-900 bg-white border border-moss-200 rounded-sm focus:outline-none focus:border-deep-600 focus:ring-1 focus:ring-deep-600 font-variant-numeric tabular-nums transition-colors"
        />
      ))}
    </div>
  );
}

// MoneyInput: prefix ৳, integer amount
interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
  hint?: string;
  min?: number;
  max?: number;
}

export function MoneyInput({
  value,
  onChange,
  label = 'Budget / Amount',
  error,
  hint,
  min = 100,
  max = 1000000,
}: MoneyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = parseBanglaDigits(e.target.value).replace(/\D/g, '');
    const num = raw ? parseInt(raw, 10) : 0;
    const clamped = Math.min(Math.max(num, 0), max);
    onChange(clamped);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-small font-medium text-moss-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center w-full min-h-[44px] h-11 border border-moss-200 rounded-sm bg-white overflow-hidden focus-within:border-deep-600 focus-within:ring-1 focus-within:ring-deep-600">
        <span className="px-3.5 bg-mist text-moss-900 text-body font-bold border-r border-moss-200 select-none">
          ৳
        </span>
        <input
          type="text"
          inputMode="numeric"
          min={min}
          max={max}
          value={value ? value.toLocaleString('en-IN') : ''}
          onChange={handleChange}
          placeholder="1,500"
          className="w-full h-full px-3.5 text-body text-moss-900 bg-transparent placeholder:text-moss-400 focus:outline-none font-variant-numeric tabular-nums font-medium"
        />
      </div>
      {hint && !error && (
        <p className="text-caption text-moss-500 mt-1">{hint}</p>
      )}
      {error && (
        <p className="text-caption text-status-danger-text font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// Checkbox
export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer text-small text-moss-800 select-none">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded-sm border-moss-300 text-deep-600 focus:ring-deep-600 cursor-pointer disabled:opacity-50"
      />
      <span>{label}</span>
    </label>
  );
}

// Switch
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${
          checked ? 'bg-mint-500' : 'bg-moss-200'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
      {label && <span className="text-small text-moss-800">{label}</span>}
    </label>
  );
}

// Segmented control
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex p-1 bg-moss-100 rounded-sm border border-moss-200 gap-1 select-none">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-small font-medium rounded-sm transition-all ${
            value === opt.value
              ? 'bg-white text-moss-900 shadow-e1'
              : 'text-moss-600 hover:text-moss-900 hover:bg-moss-200/50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
