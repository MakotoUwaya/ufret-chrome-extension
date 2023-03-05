import React from 'react';
import { createRoot } from 'react-dom/client';

import '../style';

import Welcome from './Welcome';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);
