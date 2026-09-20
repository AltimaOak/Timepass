/**
 * Proposal Website Core Logic
 * Handles transitions, preloader timing, particle celebration, audio, and WhatsApp deep-link.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.CONFIG || {};

  // -------------------------------------------------------------
  // 1. Populate Dynamic Content from CONFIG
  // -------------------------------------------------------------
  applyConfigContent(cfg);

  // -------------------------------------------------------------
  // 2. Preloader Sequence
  // -------------------------------------------------------------
  initPreloader();

  // -------------------------------------------------------------
  // 3. Section Navigation Handlers
  // -------------------------------------------------------------
  initNavigation();

  // -------------------------------------------------------------
  // 4. "Yes, I will ♡" Celebration Logic
  // -------------------------------------------------------------
  initCelebration();

  // -------------------------------------------------------------
  // 5. WhatsApp Integration
  // -------------------------------------------------------------
  setupWhatsAppLink(cfg);

  // -------------------------------------------------------------
  // 6. Optional Audio Toggle
  // -------------------------------------------------------------
  initAudio(cfg);
});

/**
 * Injects texts and content from CONFIG into HTML elements
 */
function applyConfigContent(cfg) {
  if (!cfg) return;

  // Preloader
  if (cfg.preloader) {
    setText('preload-text-1', cfg.preloader.introText);
    setText('preload-text-2', cfg.preloader.subtitle || `${cfg.recipientName || 'Nandini'} ♡`);
  }

  // Hero
  if (cfg.hero) {
    setText('hero-greeting', cfg.hero.greeting || `Hey ${cfg.recipientName || 'Nandini'}…`);
    setText('hero-title', cfg.hero.title);
    setFormattedText('hero-subtitle', cfg.hero.subtitle);
    setText('hero-btn-text', cfg.hero.buttonText);
  }

  // Letter
  if (cfg.letter) {
    setText('letter-heading', cfg.letter.heading || `For you, ${cfg.recipientName || 'Nandini'}.`);
    if (Array.isArray(cfg.letter.paragraphs)) {
      const container = document.getElementById('letter-body');
      if (container) {
        container.innerHTML = cfg.letter.paragraphs
          .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
          .join('');
      }
    }
    setText('letter-signature', cfg.letter.signature);
    setText('letter-btn-text', cfg.letter.buttonText);
  }

  // Question
  if (cfg.question) {
    setFormattedText('question-title', cfg.question.title || `${cfg.recipientName || 'Nandini'},\nwill you be mine? ♡`);
    setText('question-subtitle', cfg.question.subtitle);
    setText('question-yes-text', cfg.question.yesButtonText);
    setText('celebration-text-1', cfg.question.celebrationText1);
    setText('celebration-text-2', cfg.question.celebrationText2);
    setText('celebration-btn-text', cfg.question.celebrationButtonText);
  }

  // Final
  if (cfg.final) {
    setText('final-heading', cfg.final.heading || `Thank you, ${cfg.recipientName || 'Nandini'}. ♡`);
    setFormattedText('final-message', cfg.final.message);
    setText('final-note', cfg.final.note);
    setText('final-action-text', cfg.final.actionButtonText);
  }
}

/**
 * Preloader animation and dismiss timer (~2.6s)
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const heartBox = document.getElementById('preloader-heart-box');

  if (!preloader) return;

  // Add heartbeat animation after stroke drawing completes
  setTimeout(() => {
    if (heartBox) {
      heartBox.classList.add('pulse');
    }
  }, 1400);

  // Dismiss preloader smoothly
  setTimeout(() => {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }, 2600);
}

/**
 * Smooth transition between proposal sections
 */
function showSection(targetSectionId) {
  const currentActive = document.querySelector('.proposal-section.active');
  const targetSection = document.getElementById(targetSectionId);

  if (!targetSection || currentActive === targetSection) return;

  if (currentActive) {
    currentActive.style.opacity = '0';
    currentActive.style.transform = 'translateY(-12px)';

    setTimeout(() => {
      currentActive.classList.remove('active');
      currentActive.style.display = 'none';

      targetSection.style.display = 'flex';
      // Trigger browser reflow for CSS transition
      void targetSection.offsetWidth;
      targetSection.classList.add('active');
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  } else {
    targetSection.classList.add('active');
  }
}

/**
 * Navigation button event bindings
 */
function initNavigation() {
  const btnHeroNext = document.getElementById('btn-hero-next');
  if (btnHeroNext) {
    btnHeroNext.addEventListener('click', () => showSection('section-letter'));
  }

  const btnLetterNext = document.getElementById('btn-letter-next');
  if (btnLetterNext) {
    btnLetterNext.addEventListener('click', () => showSection('section-question'));
  }

  const btnCelebrationNext = document.getElementById('btn-celebration-next');
  if (btnCelebrationNext) {
    btnCelebrationNext.addEventListener('click', () => showSection('section-final'));
  }
}

/**
 * "Yes, I will ♡" celebration sequence
 */
function initCelebration() {
  const btnSayYes = document.getElementById('btn-say-yes');
  const promptBlock = document.getElementById('question-prompt-block');
  const celebrationBlock = document.getElementById('celebration-block');

  if (!btnSayYes) return;

  btnSayYes.addEventListener('click', () => {
    // 1. Warm background glow
    document.body.classList.add('celebrate-mode');

    // 2. Start gentle floating particles / hearts
    startFloatingParticles();

    // 3. Transition Question text to celebration message
    if (promptBlock && celebrationBlock) {
      promptBlock.style.opacity = '0';
      promptBlock.style.transform = 'scale(0.95)';
      promptBlock.style.transition = 'all 0.4s ease';

      setTimeout(() => {
        promptBlock.style.display = 'none';
        celebrationBlock.style.display = 'flex';
        void celebrationBlock.offsetWidth;
        celebrationBlock.style.opacity = '1';
      }, 400);
    }
  });
}

/**
 * Configure WhatsApp deep-link with cross-platform fallback
 */
function setupWhatsAppLink(cfg) {
  const btnWhatsapp = document.getElementById('btn-whatsapp-action');
  if (!btnWhatsapp) return;

  const rawPhone = (cfg.whatsappNumber || '').trim();
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const rawMessage = cfg.whatsappMessage || 'Hey! I just went through your little surprise website… and yes, I said yes. ❤️';
  const encodedMessage = encodeURIComponent(rawMessage);

  // Generate URL (Universal link supported on iOS, Android, and Desktop WhatsApp Web)
  let whatsappUrl = '';
  if (cleanPhone && cleanPhone !== 'YOUR_WHATSAPP_NUMBER') {
    whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
  } else {
    // Fallback if number has not been set yet
    whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
  }

  btnWhatsapp.setAttribute('href', whatsappUrl);

  btnWhatsapp.addEventListener('click', (e) => {
    if (!cleanPhone || cleanPhone === 'YOUR_WHATSAPP_NUMBER') {
      console.warn('Note: Replace YOUR_WHATSAPP_NUMBER in config.js with your actual phone number.');
    }
  });
}

/**
 * Audio control setup (Plays immediately on site load + seamless fallback)
 */
function initAudio(cfg) {
  const container = document.getElementById('audio-control-container');
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const audioEl = document.getElementById('bg-audio');
  const labelEl = document.getElementById('audio-label');
  const iconEl = document.getElementById('audio-icon');

  if (!cfg.music || !cfg.music.enabled || !audioEl || !toggleBtn) {
    if (container) container.style.display = 'none';
    return;
  }

  audioEl.src = cfg.music.audioUrl;
  audioEl.volume = 0.4;

  let isPlaying = false;

  const updatePlayState = (playing) => {
    isPlaying = playing;
    if (playing) {
      toggleBtn.classList.add('playing');
      if (labelEl) labelEl.textContent = cfg.music.labelPause || 'Pause music ⏸';
      if (iconEl) iconEl.textContent = '⏸';
    } else {
      toggleBtn.classList.remove('playing');
      if (labelEl) labelEl.textContent = cfg.music.labelPlay || 'Play music ♫';
      if (iconEl) iconEl.textContent = '♫';
    }
  };

  const tryPlayDirectly = () => {
    if (isPlaying) return;
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updatePlayState(true);
        // Remove gesture listeners if played directly
        removeGestureListeners();
      }).catch(() => {
        // Autoplay policy prevented immediate playback without user gesture
        updatePlayState(false);
      });
    }
  };

  // 1. Attempt to play directly as soon as the site opens
  tryPlayDirectly();
  window.addEventListener('load', tryPlayDirectly);

  // 2. Fallback listener for the very first user gesture if browser blocked direct autoplay
  const onUserGesture = () => {
    if (!isPlaying) {
      tryPlayDirectly();
    }
  };

  const gestureEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'scroll', 'keydown'];

  const removeGestureListeners = () => {
    gestureEvents.forEach(evt => {
      document.removeEventListener(evt, onUserGesture, true);
    });
  };

  gestureEvents.forEach(evt => {
    document.addEventListener(evt, onUserGesture, { once: true, passive: true, capture: true });
  });

  // 3. Manual toggle button interaction
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      audioEl.play().then(() => updatePlayState(true)).catch(() => {});
    } else {
      audioEl.pause();
      updatePlayState(false);
    }
  });
}

/**
 * Soft celebration particles (Canvas-based)
 * Creates gently rising pastel petals, tiny hearts, and delicate confetti.
 */
let particleAnimationId = null;

function startFloatingParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  // Particle colors: delicate rose, warm cream, soft blush
  const colors = [
    'rgba(212, 139, 126, 0.75)',
    'rgba(234, 174, 162, 0.7)',
    'rgba(244, 221, 215, 0.85)',
    'rgba(201, 122, 108, 0.65)',
    'rgba(255, 240, 235, 0.9)'
  ];

  const particles = [];
  const particleCount = 45; // Minimal, elegant density

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle(width, height, colors, true));
  }

  function createParticle(w, h, palette, initial = false) {
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      size: Math.random() * 6 + 4,
      color: palette[Math.floor(Math.random() * palette.length)],
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      isHeart: Math.random() > 0.45,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.4
    };
  }

  let time = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    time += 0.02;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.y -= p.speedY;
      p.x += Math.sin(time + p.swayOffset) * 0.6 + p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      if (p.isHeart) {
        drawMiniHeart(ctx, 0, 0, p.size);
      } else {
        // Soft rounded rectangle / paper flake
        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4, 2);
        ctx.fill();
      }

      ctx.restore();

      // Reset when particle floats above screen
      if (p.y < -30) {
        particles[i] = createParticle(width, height, colors, false);
      }
    }

    particleAnimationId = requestAnimationFrame(render);
  }

  if (particleAnimationId) {
    cancelAnimationFrame(particleAnimationId);
  }
  render();
}

/**
 * Draws a subtle delicate mini heart path on canvas
 */
function drawMiniHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // Top left curve
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  // Bottom left curve
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
  // Bottom right curve
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  // Top right curve
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fill();
}

// -------------------------------------------------------------
// Helper Utilities
// -------------------------------------------------------------
function setText(id, text) {
  if (!text) return;
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setFormattedText(id, text) {
  if (!text) return;
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
