/**
 * DOM Manager
 * Manages DOM element references and page navigation
 */

export class DOMManager {
  constructor() {
    // Pages
    this.page1 = document.getElementById('page1');
    this.page2 = document.getElementById('page2');

    // Buttons
    this.yesButton = document.getElementById('yesButton');
    this.noButton = document.getElementById('noButton');
    this.noLabel = document.getElementById('noLabel');
    this.noMicroText = document.getElementById('noMicroText');
    this.backToHome = document.getElementById('backToHome');

    // Modal elements
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.giftModal = document.getElementById('giftModal');
    this.modalClose = document.getElementById('modalClose');
    this.modalVisual = document.getElementById('modalVisual');
    this.modalMessage = document.getElementById('modalMessage');

    // Gift cards
    this.gifts = document.querySelectorAll('.gift-card');

    // Effects
    this.explosionLayer = document.getElementById('explosionLayer');
    this.bgOverlay = document.getElementById('bgOverlay');

    // Audio
    this.bgMusic = document.getElementById('bgMusic');
    this.yesSound = document.getElementById('yesSound');
    this.unwrapSound = document.getElementById('unwrapSound');
  }

  /**
   * Show a specific page (1 or 2)
   * @param {number} pageNumber - Page number to show (1 or 2)
   */
  showPage(pageNumber) {
    const isPage1 = pageNumber === 1;
    if (isPage1) {
      this.page1.classList.add('active');
      this.page2.classList.remove('active');
    } else {
      this.page2.classList.add('active');
      this.page1.classList.remove('active');
    }
  }

  /**
   * Open the modal
   */
  openModal() {
    this.modalBackdrop.classList.add('active');
    this.giftModal.classList.add('active');
    this.modalBackdrop.setAttribute('aria-hidden', 'false');
  }

  /**
   * Close the modal
   */
  closeModal() {
    this.giftModal.classList.remove('active');
    this.modalBackdrop.classList.remove('active');
    this.modalBackdrop.setAttribute('aria-hidden', 'true');
    // Reset modal visual styling
    this.modalVisual.style.height = '';
    this.modalVisual.className = 'modal-visual';
  }

  /**
   * Clear and set modal visual content
   * @param {HTMLElement} content - Element to add to modal visual
   */
  setModalVisual(content) {
    this.modalVisual.innerHTML = '';
    this.modalVisual.className = 'modal-visual';
    this.modalVisual.appendChild(content);
  }

  /**
   * Set modal message text
   * @param {string} message - Message text
   */
  setModalMessage(message) {
    this.modalMessage.textContent = message;
  }

  /**
   * Mark a gift card as opened
   * @param {string} giftType - Type of gift ('flowers', 'chocolate', 'countdown')
   */
  markGiftOpened(giftType) {
    const giftCard = document.querySelector(`[data-gift="${giftType}"]`);
    if (giftCard) {
      giftCard.classList.add('opened');
    }
  }
}
