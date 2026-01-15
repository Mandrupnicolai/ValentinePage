/**
 * Event Handlers Module
 * Manages all event listeners and user interactions
 */

import { safePlay, toggleBgMusic } from './utils.js';
import { createExplosion } from './animations.js';
import { openModal } from './modalManager.js';

/**
 * Initialize all event listeners
 * @param {Object} dom - DOMManager instance
 * @param {Object} state - Application state object
 */
export function initEventHandlers(dom, state) {
  // Yes button - celebration and navigate to gifts
  dom.yesButton.addEventListener('click', (ev) => {
    handleYesClick(dom, state);
  });

  // No button - evasive behavior
  dom.noButton.addEventListener('mouseenter', () => {
    handleNoHover(dom, state);
  });

  dom.noButton.addEventListener('mouseleave', () => {
    dom.noButton.classList.remove('show-micro');
  });

  // Gift cards - open modals
  dom.gifts.forEach((gift) => {
    gift.addEventListener('click', () => {
      handleGiftClick(gift, dom, state);
    });
  });

  // Modal controls
  dom.modalClose.addEventListener('click', () => {
    dom.closeModal();
    state.countdownInterval = null;
  });

  dom.modalBackdrop.addEventListener('click', (e) => {
    if (e.target === dom.modalBackdrop) {
      dom.closeModal();
      state.countdownInterval = null;
    }
  });

  // Back button
  if (dom.backToHome) {
    dom.backToHome.addEventListener('click', () => {
      dom.showPage(1);
    });
  }

  // Ensure audio can play after interaction
  document.addEventListener('click', () => {
    state.userHasInteracted = true;
  }, { once: true });
}

/**
 * Handle "Yes" button click
 * @param {Object} dom - DOMManager instance
 * @param {Object} state - Application state
 */
function handleYesClick(dom, state) {
  state.userHasInteracted = true;

  const rect = dom.yesButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  createExplosion(dom.explosionLayer, centerX, centerY, 30);

  state.bgMusicEnabled = toggleBgMusic(dom.bgMusic, state.userHasInteracted, true);
  safePlay(dom.yesSound, 1);
  dom.showPage(2);
}

/**
 * Handle "No" button hover
 * @param {Object} dom - DOMManager instance
 * @param {Object} state - Application state
 */
function handleNoHover(dom, state) {
  state.userHasInteracted = true;
  state.noHoverCount++;

  const panicPhrases = [
    'Wait—!',
    'Hey!',
    'That was close!',
    'Are you sure?!',
    'My heart😱',
    'Rethink this!',
    'Choose love!'
  ];

  const phrase = panicPhrases[Math.min(state.noHoverCount - 1, panicPhrases.length - 1)];
  dom.noMicroText.textContent = phrase;
  dom.noButton.classList.add('show-micro', 'panic');
  moveNoButton(dom, state);

  setTimeout(() => {
    dom.noButton.classList.remove('panic');
  }, 250);
}

/**
 * Move "No" button to random position
 * @param {Object} dom - DOMManager instance
 * @param {Object} state - Application state
 */
function moveNoButton(dom, state) {
  const btnRect = dom.noButton.getBoundingClientRect();
  const margin = 10;

  const maxX = window.innerWidth - btnRect.width - margin;
  const maxY = window.innerHeight - btnRect.height - margin;

  const newX = margin + Math.random() * maxX;
  const newY = margin + Math.random() * (maxY - margin);

  const speedBase = 1.0;
  const speed = Math.max(0.35, speedBase - (state.noHoverCount * 0.04));

  dom.noButton.style.position = 'fixed';
  dom.noButton.style.transition = 
    `transform 0.28s ease, box-shadow 0.28s ease, left ${speed}s cubic-bezier(0.24, 0.9, 0.32, 1.4), top ${speed}s cubic-bezier(0.24, 0.9, 0.32, 1.4)`;
  dom.noButton.style.left = newX + 'px';
  dom.noButton.style.top = newY + 'px';
}

/**
 * Handle gift card click
 * @param {HTMLElement} gift - Gift card element
 * @param {Object} dom - DOMManager instance
 * @param {Object} state - Application state
 */
function handleGiftClick(gift, dom, state) {
  state.userHasInteracted = true;
  const type = gift.dataset.gift;
  gift.classList.add('opened');

  if (!state.openedOnce[type]) {
    state.openedOnce[type] = true;
    state.allGiftsOpened++;
  }

  safePlay(dom.unwrapSound, 1);
  state.countdownInterval = openModal(type, dom, state.countdownInterval);

  // Celebratory explosion when all gifts opened
  if (state.allGiftsOpened === 3) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setTimeout(() => createExplosion(dom.explosionLayer, cx, cy, 42), 350);
  }
}
