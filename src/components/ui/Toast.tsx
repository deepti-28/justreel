import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '@/store';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-primary" />,
  };

  return (
    <div className="fixed top-20 right-4 z-[200] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-white rounded-xl shadow-card-hover border border-border px-4 py-3 flex items-center gap-3 min-w-[260px]"
          >
            {icons[toast.type]}
            <span className="text-sm text-text-primary flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-text-secondary hover:text-text-primary">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
