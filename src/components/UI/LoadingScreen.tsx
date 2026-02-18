import React from 'react';
import { Theme } from '../../types';

export default function LoadingScreen({ theme }: { theme: Theme }) {
  return (
    <div className="flex h-screen items-center justify-center bg-rose-50">
      <div className="text-center">
        <div className="text-3xl">🌸</div>
        <p className="mt-2 text-sm text-rose-700">Chargement ({theme})...</p>
      </div>
    </div>
  );
}
