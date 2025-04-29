import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FinanceProvider } from './contexts/FinanceContext'; // Import the provider
import { initializeThemeListener } from './utils/themeUtils';

// Set up theme listener for system preference changes and initial application
initializeThemeListener();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinanceProvider> {/* Wrap App with the provider */}
      <App />
    </FinanceProvider>
  </StrictMode>,
);
