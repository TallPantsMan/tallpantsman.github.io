import React from 'react';
import { createRoot } from 'react-dom/client';
import HeroPipeline from './HeroPipeline.tsx';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-pipeline-root');
  if (container) {
    const root = createRoot(container);
    root.render(<HeroPipeline />);
  }
});
