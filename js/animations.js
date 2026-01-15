/**
 * Animations Module
 * Handles all animation effects (explosions, cursor trails, background elements)
 */

/**
 * Create an explosion effect at a specific position
 * @param {HTMLElement} explosionLayer - Container for explosion particles
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} count - Number of particles to create
 */
export function createExplosion(explosionLayer, x, y, count = 26) {
  for (let i = 0; i < count; i++) {
    const isHeart = Math.random() < 0.6;
    const particle = document.createElement('div');
    particle.className = isHeart ? 'explosion-heart' : 'explosion-confetti';

    const angle = Math.random() * Math.PI * 2;
    const speed = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');

    explosionLayer.appendChild(particle);
    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  }
}

/**
 * Initialize cursor heart trail effect
 * @param {HTMLElement} bodyElement - Document body element
 */
export function initCursorTrail(bodyElement) {
  let lastHeartTime = 0;
  
  document.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastHeartTime < 45) return; // throttle
    lastHeartTime = now;

    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    const inner = document.createElement('div');
    inner.className = 'cursor-heart-inner';
    heart.appendChild(inner);

    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';

    bodyElement.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  });
}

/**
 * Spawn a floating heart in the background
 * @param {HTMLElement} bgOverlay - Background overlay element
 */
export function spawnBgHeart(bgOverlay) {
  const el = document.createElement('div');
  el.className = 'bg-heart';
  const startX = Math.random() * 100;
  el.style.left = startX + 'vw';
  el.style.setProperty('--x-offset', (Math.random() * 60 - 30) + 'px');
  const duration = 10 + Math.random() * 16;
  el.style.animation = 'floatUp ' + duration + 's ease-in infinite';
  bgOverlay.appendChild(el);

  setTimeout(() => el.remove(), (duration + 1) * 1000);
}

/**
 * Spawn a twinkling sparkle in the background
 * @param {HTMLElement} bgOverlay - Background overlay element
 */
export function spawnSparkle(bgOverlay) {
  const el = document.createElement('div');
  el.className = 'bg-sparkle';
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  el.style.left = x + 'vw';
  el.style.top = y + 'vh';
  const duration = 2 + Math.random() * 2.5;
  el.style.animation = 'twinkle ' + duration + 's ease-in-out infinite';
  bgOverlay.appendChild(el);

  setTimeout(() => el.remove(), (duration + 0.5) * 1000);
}

/**
 * Initialize background animation effects
 * @param {HTMLElement} bgOverlay - Background overlay element
 */
export function initBackgroundEffects(bgOverlay) {
  // Spawn initial hearts
  for (let i = 0; i < 14; i++) {
    setTimeout(() => spawnBgHeart(bgOverlay), i * 800);
  }

  // Spawn initial sparkles
  for (let i = 0; i < 18; i++) {
    setTimeout(() => spawnSparkle(bgOverlay), i * 260);
  }

  // Continue spawning hearts and sparkles
  setInterval(() => spawnBgHeart(bgOverlay), 4200);
  setInterval(() => spawnSparkle(bgOverlay), 1900);
}
