/**
 * Utility Functions
 * Common helper functions used across the application
 */

/**
 * Safely play audio element with error handling
 * @param {HTMLAudioElement} audioEl - Audio element to play
 * @param {number} volume - Volume level (0-1), default 1
 */
export function safePlay(audioEl, volume = 1) {
  if (!audioEl) return;
  audioEl.volume = volume;
  const p = audioEl.play();
  if (p && typeof p.catch === 'function') {
    p.catch(() => {});
  }
}

/**
 * Toggle background music on/off
 * @param {HTMLAudioElement} bgMusic - Background music element
 * @param {boolean} userHasInteracted - Whether user has interacted with page
 * @param {boolean|undefined} forceOn - Force music on/off, otherwise toggle
 * @returns {boolean} New music enabled state
 */
export function toggleBgMusic(bgMusic, userHasInteracted, forceOn) {
  if (!userHasInteracted) return false;
  
  let bgMusicEnabled = typeof forceOn === 'boolean' ? forceOn : !bgMusic.paused;

  if (bgMusicEnabled) {
    bgMusic.volume = 0.15;
    safePlay(bgMusic);
  } else {
    bgMusic.pause();
  }

  return bgMusicEnabled;
}

/**
 * Get the next Valentine's Day date
 * @returns {Date} Next Valentine's Day
 */
export function getNextValentine() {
  const now = new Date();
  const year = now.getFullYear();
  const target = new Date(`${year}-02-14T00:00:00`);
  if (target < now) target.setFullYear(year + 1);
  return target;
}

/**
 * Stop countdown interval
 * @param {number} countdownInterval - Interval ID to clear
 * @returns {null}
 */
export function stopCountdown(countdownInterval) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  return null;
}
