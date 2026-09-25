import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Order matters: base styles must land in the bundle *before* the components'
// own CSS (which App pulls in), so a component rule wins a specificity tie with
// a global one. Imported after App, the globals won instead — and, for one,
// overrode every component's line-height on display type with 0.92.
import './styles/fonts.css';
import './styles/globals.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
