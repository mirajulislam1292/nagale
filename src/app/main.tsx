// The pipeline shell is replaced only after the repository deployment is connected.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../lib/base.css';
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <main aria-label="Nagale" />
    </StrictMode>,
  );
}
