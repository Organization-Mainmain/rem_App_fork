import React from 'react';

export default function ExpressionSettings({ isOpen = false }: { isOpen?: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-4 text-sm">
        <h3 className="font-semibold">Réglages d'expressions</h3>
        <p className="mt-2 text-gray-600">Utilisez les images numérotées dans <code>/public/expressions/1.png</code> à <code>/public/expressions/20.png</code>.</p>
      </div>
    </div>
  );
}
