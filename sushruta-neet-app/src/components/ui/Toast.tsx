'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]', border: 'border-[#6ee7b7]', icon: CheckCircle },
    error: { bg: 'bg-[#fee2e2]', text: 'text-[#991b1b]', border: 'border-[#fca5a5]', icon: XCircle },
    info: { bg: 'bg-[#dbeafe]', text: 'text-[#1e40af]', border: 'border-[#93c5fd]', icon: AlertCircle },
  }[type];

  const Icon = styles.icon;

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg ${styles.bg} ${styles.text} ${styles.border} ${exiting ? 'toast-exit' : 'toast-enter'}`}
      style={{ minWidth: '260px', maxWidth: '340px' }}
      role="alert"
      aria-live="polite"
    >
      <Icon size={18} className="flex-shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => { setExiting(true); setTimeout(onClose, 300); }}
        className="flex-shrink-0 opacity-60 hover:opacity-100 p-0.5 rounded"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// Toast manager hook
interface ToastState {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
};

interface ToastContainerProps {
  toasts: ToastState[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => (
  <>
    {toasts.map((t) => (
      <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
    ))}
  </>
);
