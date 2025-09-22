'use client';

import { useEffect } from 'react';

export function ClientOnlyScript() {
  useEffect(() => {
    // This effect runs only on the client side after hydration
    // It helps prevent hydration mismatches from external scripts
    // that modify the DOM (like accessibility widgets, browser extensions, etc.)
    
    const handleDOMModifications = () => {
      // Remove any hydration warning suppressions after initial load
      if (typeof window !== 'undefined') {
        // Clear any console warnings related to hydration for known external modifications
        const originalConsoleError = console.error;
        console.error = (...args) => {
          // Filter out known hydration warnings from external scripts
          const message = args[0];
          if (
            typeof message === 'string' && 
            (
              message.includes('data-uw-w-loader') ||
              message.includes('hydrated but some attributes') ||
              message.includes('UserWay') ||
              message.includes('accessibility widget')
            )
          ) {
            // Suppress these specific external script hydration warnings
            return;
          }
          originalConsoleError.apply(console, args);
        };
        
        // Restore original console.error after a short delay
        setTimeout(() => {
          console.error = originalConsoleError;
        }, 5000);
      }
    };

    handleDOMModifications();
  }, []);

  return null;
}
