import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
} from 'lucide-react';
import { Button } from './Button';

export interface FileDropzoneProps {
  accept?: string;
  maxSizeMb?: number;
  label?: string;
  hint?: string;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileDropzone({
  accept = '.pdf,.png,.jpg,.jpeg,.doc,.docx',
  maxSizeMb = 10,
  label = 'Upload work files or documents',
  hint = 'PDF, DOCX, PNG or JPG up to 10MB',
  onFileSelect,
  className = '',
}: FileDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMb}MB.`);
      return;
    }

    setSelectedFile(file);
    setProgress(0);

    // Simulate upload progress with EXIF sanitization
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        if (onFileSelect) onFileSelect(file);
      } else {
        setProgress(p);
      }
    }, 70);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setProgress(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`w-full ${className}`}>
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed rounded-md bg-mist/50 hover:bg-mist cursor-pointer transition-colors text-center ${
            dragActive ? 'border-deep-600 bg-deep-50/50' : 'border-moss-200'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-deep-100 text-deep-700 flex items-center justify-center mb-3">
            <UploadCloud size={24} />
          </div>
          <p className="text-body font-medium text-moss-900 mb-1">{label}</p>
          <p className="text-caption text-moss-500">{hint}</p>
        </div>
      ) : (
        <div className="p-4 border border-moss-200 rounded-md bg-white">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3 min-w-0">
              {progress === 100 ? (
                <CheckCircle2 size={20} className="text-deep-600 shrink-0" />
              ) : error ? (
                <AlertCircle
                  size={20}
                  className="text-status-danger-text shrink-0"
                />
              ) : (
                <RefreshCw
                  size={20}
                  className="animate-spin text-moss-500 shrink-0"
                />
              )}
              <span className="text-small font-medium text-moss-900 truncate">
                {selectedFile.name}
              </span>
              <span className="text-caption text-moss-400 shrink-0 font-variant-numeric tabular-nums">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Remove file"
              className="p-1 text-moss-400 hover:text-moss-700 rounded-sm"
            >
              <X size={18} />
            </button>
          </div>

          {progress !== null && progress < 100 && (
            <div className="w-full h-1.5 bg-moss-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-deep-600 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-caption text-status-danger-text font-medium">
                {error}
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => validateAndProcessFile(selectedFile)}
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
