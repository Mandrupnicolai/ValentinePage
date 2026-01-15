/**
 * Application Initialization Module
 * Sets up the application on page load
 */

import { DOMManager } from './domManager.js';
import { initCursorTrail, initBackgroundEffects } from './animations.js';
import { initEventHandlers } from './eventHandlers.js';

/**
 * Initialize the entire application
 */
export function initApp() {
  // Initialize DOM manager
  const dom = new DOMManager();

  // Initialize application state
  const state = {
    bgMusicEnabled: false,
    userHasInteracted: false,
    allGiftsOpened: 0,
    noHoverCount: 0,
    countdownInterval: null,
    openedOnce: {
      flowers: false,
      chocolate: false,
      countdown: false
    }
  };

  // Store state globally for easy access (best practice would use proper state management)
  window.appState = state;

  // Initialize event handlers
  initEventHandlers(dom, state);

  // Initialize animation effects
  initCursorTrail(document.body);
  initBackgroundEffects(dom.bgOverlay);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
