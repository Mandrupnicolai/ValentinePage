/**
 * Modal Manager Module
 * Handles all modal interactions and content creation
 */

import { getNextValentine, stopCountdown as stopCountdownUtil } from './utils.js';

/**
 * Create and display flower voucher modal
 * @param {Object} dom - DOMManager instance
 * @param {number} countdownInterval - Current countdown interval
 * @returns {number} Updated countdown interval
 */
export function openFlowerModal(dom, countdownInterval) {
  countdownInterval = stopCountdownUtil(countdownInterval);
  
  const voucher = document.createElement('div');
  voucher.className = 'voucher-card';

  const text = document.createElement('div');
  text.className = 'voucher-text';
  text.innerHTML = 'This voucher can be redeemed for one beautiful bouquet of flowers 💐';

  const bouquet = document.createElement('div');
  bouquet.className = 'bouquet';

  voucher.appendChild(text);
  voucher.appendChild(bouquet);

  dom.setModalVisual(voucher);
  dom.setModalMessage('');
  dom.openModal();

  return countdownInterval;
}

/**
 * Create and display chocolate box modal
 * @param {Object} dom - DOMManager instance
 * @param {number} countdownInterval - Current countdown interval
 * @returns {number} Updated countdown interval
 */
export function openChocolateModal(dom, countdownInterval) {
  countdownInterval = stopCountdownUtil(countdownInterval);
  
  const box = document.createElement('div');
  box.className = 'choc-box';

  const cardThumb = document.querySelector('.gift-card[data-gift="chocolate"] .gift-thumb');
  let modalImg;
  
  if (cardThumb) {
    modalImg = cardThumb.cloneNode(true);
    modalImg.classList.remove('gift-thumb');
    modalImg.classList.add('choc-art');
  } else {
    modalImg = document.createElement('img');
    modalImg.className = 'choc-art';
    modalImg.src = './assets/chocolate_Box.png';
    modalImg.alt = 'Heart-shaped box of assorted chocolates';
  }

  dom.modalVisual.style.height = '180px';
  box.style.display = 'flex';
  box.style.alignItems = 'center';
  box.style.justifyContent = 'center';
  modalImg.style.width = '80%';
  modalImg.style.maxWidth = '100%';
  modalImg.style.height = 'auto';
  modalImg.style.display = 'block';
  modalImg.style.margin = '0 auto 12px';
  modalImg.style.pointerEvents = 'none';
  modalImg.style.transformOrigin = 'center';
  modalImg.style.border = 'none';
  modalImg.style.background = 'transparent';

  modalImg.addEventListener('load', () => {
    console.log('Chocolate modal image loaded:', modalImg.src);
  });

  modalImg.addEventListener('error', (ev) => {
    console.error('Failed to load chocolate modal image:', modalImg.src, ev);
    const errNote = document.createElement('div');
    errNote.textContent = 'Image not available';
    errNote.style.fontSize = '0.9rem';
    errNote.style.color = 'rgba(61,6,56,0.9)';
    errNote.style.marginTop = '8px';
    box.appendChild(errNote);
  });

  box.appendChild(modalImg);
  dom.setModalVisual(box);
  dom.setModalMessage('A heart full of chocolates just for you.');
  dom.openModal();

  return countdownInterval;
}

/**
 * Create and display countdown timer modal
 * @param {Object} dom - DOMManager instance
 * @param {number} countdownInterval - Current countdown interval
 * @returns {number} Updated countdown interval
 */
export function openCountdownModal(dom, countdownInterval) {
  countdownInterval = stopCountdownUtil(countdownInterval);
  
  const wrapper = document.createElement('div');
  wrapper.className = 'countdown-box';

  const hearts = document.createElement('div');
  hearts.className = 'countdown-hearts';
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('span');
    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDelay = `${Math.random() * 3}s`;
    hearts.appendChild(h);
  }
  wrapper.appendChild(hearts);

  const grid = document.createElement('div');
  grid.className = 'countdown-grid';

  const segments = ['Days', 'Hours', 'Minutes', 'Seconds'];
  const els = {};
  segments.forEach((label) => {
    const item = document.createElement('div');
    item.className = 'countdown-item';
    const value = document.createElement('span');
    value.className = 'countdown-value';
    value.textContent = '00';
    const lbl = document.createElement('span');
    lbl.className = 'countdown-label';
    lbl.textContent = label;
    item.appendChild(value);
    item.appendChild(lbl);
    grid.appendChild(item);
    els[label.toLowerCase()] = value;
  });

  wrapper.appendChild(grid);
  dom.setModalVisual(wrapper);
  dom.setModalMessage('Counting down to our Valentine\'s day⏳💕');

  countdownInterval = startCountdown(els, countdownInterval);

  dom.openModal();

  return countdownInterval;
}

/**
 * Update countdown timer display
 * @param {Object} countEls - Countdown element references
 * @param {number} countdownInterval - Current countdown interval
 * @returns {number} New countdown interval
 */
function startCountdown(countEls, countdownInterval) {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const target = getNextValentine();

  const update = () => {
    const now = new Date();
    const diff = Math.max(0, target - now);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countEls.days.textContent = String(days).padStart(2, '0');
    countEls.hours.textContent = String(hours).padStart(2, '0');
    countEls.minutes.textContent = String(minutes).padStart(2, '0');
    countEls.seconds.textContent = String(seconds).padStart(2, '0');
  };

  update();
  countdownInterval = setInterval(update, 1000);
  
  return countdownInterval;
}

/**
 * Open appropriate modal based on gift type
 * @param {string} type - Gift type ('flowers', 'chocolate', 'countdown')
 * @param {Object} dom - DOMManager instance
 * @param {number} countdownInterval - Current countdown interval
 * @returns {number} Updated countdown interval
 */
export function openModal(type, dom, countdownInterval) {
  if (type === 'flowers') return openFlowerModal(dom, countdownInterval);
  if (type === 'chocolate') return openChocolateModal(dom, countdownInterval);
  if (type === 'countdown') return openCountdownModal(dom, countdownInterval);
  return countdownInterval;
}
