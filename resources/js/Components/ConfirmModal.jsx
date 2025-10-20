import React, { useEffect } from "react";

export default function ConfirmModal({ open, title = "Konfirmasi", message, confirmText = "Hapus", cancelText = "Batal", onConfirm, onCancel }) {
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape') onCancel?.();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onCancel]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
            {/* Dialog */}
            <div className="relative w-full max-w-md mx-4 transform transition-all duration-200">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md shadow-2xl">
                    <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-400/10 to-teal-500/10">
                        <h3 className="text-white text-lg font-semibold">{title}</h3>
                    </div>
                    <div className="px-6 py-5 text-sm text-white/80">
                        {message}
                    </div>
                    <div className="px-6 py-4 flex items-center justify-end space-x-3 border-t border-white/10">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm rounded-xl bg-slate-700/80 hover:bg-slate-600/80 text-white transition-colors"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white transition-colors"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


