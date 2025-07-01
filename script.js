class StarsBackground {
  constructor(containerId, starCount = 100) {
    this.container = document.getElementById(containerId);
    this.starCount = starCount;
  }

  init() {
    for (let i = 0; i < this.starCount; i++) {
      const star = document.createElement('div');
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const delay = Math.random() * 4;

      star.classList.add('star');
      star.style.left = `${x}vw`;
      star.style.top = `${y}vh`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      this.container.appendChild(star);
    }
  }
}

class Navigation {
  constructor(navSelector, pagesSelector, mobileBtnId, mobileMenuId) {
    this.navLinks = document.querySelectorAll(navSelector);
    this.pages = document.querySelectorAll(pagesSelector);
    this.mobileBtn = document.getElementById(mobileBtnId);
    this.mobileMenu = document.getElementById(mobileMenuId);
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const target = link.dataset.page;
        this.pages.forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
        this.mobileMenu.classList.add('hidden');
      });
    });

    this.mobileBtn.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('hidden');
    });
  }
}

class PlanetCardFlip {
  constructor(flipBtnSelector) {
    this.flipBtns = document.querySelectorAll(flipBtnSelector);
  }

  init() {
    this.flipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.planet-card').classList.add('flipped');
      });
    });
  }
}

class PlanetQuiz {
  constructor() {
    this.collectedPlanets = [];
    this.planetStates = {};
    this.successModal = document.getElementById('success-modal');
    this.successMessage = document.getElementById('success-message');
    this.continueBtn = document.getElementById('continue-btn');
    this.init();
  }

  init() {
    document.querySelectorAll('.quiz-questions').forEach(quiz => {
      const planet = quiz.dataset.planet;
      this.planetStates[planet] = {
        current: 0,
        correct: [false, false, false, false, false]
      };
      this.showQuestion(planet, 0);
      quiz.closest('.planet-card-back').querySelector('.prev-question').addEventListener('click', () => this.prevQuestion(planet));
      quiz.closest('.planet-card-back').querySelector('.next-question').addEventListener('click', () => this.nextQuestion(planet));
      quiz.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => this.handleAnswer(e, planet));
      });
    });
    this.continueBtn.addEventListener('click', () => this.closeSuccess());
  }

  showQuestion(planet, idx) {
    const quiz = document.querySelector(`.quiz-questions[data-planet="${planet}"]`);
    quiz.querySelectorAll('.question-block').forEach((block, i) => {
      block.style.display = (i === idx) ? '' : 'none';
      // Hide any previous correct message
      const correctMsg = block.querySelector('.correct-msg');
      if (correctMsg) correctMsg.style.display = 'none';
    });
  }

  prevQuestion(planet) {
    const state = this.planetStates[planet];
    if (state.current > 0) {
      state.current--;
      this.showQuestion(planet, state.current);
    }
  }

  nextQuestion(planet) {
    const state = this.planetStates[planet];
    if (state.current < 4) {
      state.current++;
      this.showQuestion(planet, state.current);
    } else if (state.correct.every(Boolean) && !this.collectedPlanets.includes(planet)) {
      this.collectedPlanets.push(planet);
      this.successMessage.textContent = `You've added ${this.capitalize(planet)} to your collection!`;
      this.successModal.style.display = 'flex';
      this.updateCollection();
      if (this.collectedPlanets.length === 8) {
        this.continueBtn.addEventListener('click', () => {
          document.getElementById('certificate-modal').style.display = 'flex';
        }, { once: true });
      }
    }
  }

  handleAnswer(e, planet) {
    const btn = e.target;
    const quiz = btn.closest('.quiz-questions');
    const idx = this.planetStates[planet].current;
    const block = quiz.querySelector(`.question-block[data-question-index="${idx}"]`);
    let correctMsg = block.querySelector('.correct-msg');
    if (!correctMsg) {
      correctMsg = document.createElement('div');
      correctMsg.className = 'correct-msg text-green-400 text-center mt-2';
      correctMsg.textContent = 'Correct!';
      block.appendChild(correctMsg);
    }
    if (btn.dataset.correct === 'true') {
      this.planetStates[planet].correct[idx] = true;
      btn.classList.add('bg-green-500');
      correctMsg.style.display = '';
    } else {
      btn.classList.add('bg-red-500');
      correctMsg.style.display = 'none';
    }
    setTimeout(() => {
      btn.classList.remove('bg-green-500', 'bg-red-500');
    }, 1000);
  }

  closeSuccess() {
    this.successModal.style.display = 'none';
    document.querySelectorAll('.planet-card.flipped')
      .forEach(card => card.classList.remove('flipped'));
  }

  updateCollection() {
    const pct = (this.collectedPlanets.length / 8) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;
    document.getElementById('progress-text').textContent =
      `${this.collectedPlanets.length}/8 Planets`;
    document.getElementById('collection-progress-fill').style.width = `${pct}%`;
    document.getElementById('collection-progress-text').textContent =
      `${this.collectedPlanets.length}/8 Planets`;
    this.collectedPlanets.forEach(name => {
      const badge = document.getElementById(`${name}-badge`);
      if (badge) {
        badge.classList.remove('opacity-50');
        badge.classList.add('collected');
        badge.querySelector('span').textContent = 'Collected!';
      }
    });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

class ModalManager {
  constructor() {
    this.openButtons = [
      { btnId: 'contact-btn',    modalId: 'contact-modal' },
      { btnId: 'footer-contact', modalId: 'contact-modal' },
      { btnId: 'privacy-btn',    modalId: 'privacy-modal' },
      { btnId: 'footer-privacy', modalId: 'privacy-modal' },
      { btnId: 'footer-terms',   modalId: 'terms-modal' }
    ];
    this.closeButtons = document.querySelectorAll('.close-modal');
    this.shareBtn    = document.getElementById('share-certificate');
    this.modals      = document.querySelectorAll('.modal');
  }

  init() {
    // Open modals
    this.openButtons.forEach(({ btnId, modalId }) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', () => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'flex';
      });
    });

    // Close buttons (×)
    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
      });
    });

    // Click outside to close
    this.modals.forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });

    // Share certificate
    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => {
        alert('Certificate sharing functionality would be implemented here.');
      });
    }
  }
}

class ApodFetcher {
  constructor(apiKey = 'XDtvr5XsCC2yzMmk9xzonKonfFNRqctDPhiEFHSl') {
    this.url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    this.loadingEl = document.getElementById('apod-loading');
    this.errorEl   = document.getElementById('apod-error');
    this.contentEl = document.getElementById('apod-content');
    this.imgEl     = document.getElementById('apod-img');
    this.titleEl   = document.getElementById('apod-title');
    this.descEl    = document.getElementById('apod-desc');
  }

  async init() {
    try {
      const resp = await fetch(this.url);
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const data = await resp.json();
      this.render(data);
    } catch (err) {
      console.error('APOD fetch error:', err);
      this.showError();
    } finally {
      this.loadingEl.classList.add('d-none');
    }
  }

  render({ url, title, explanation }) {
    this.imgEl.src = url;
    this.imgEl.alt = title;
    this.titleEl.textContent = title;
    this.descEl.textContent = explanation;
    this.contentEl.classList.remove('d-none');
  }

  showError() {
    this.errorEl.classList.remove('d-none');
  }
}

class App {
  static init() {
    document.addEventListener('DOMContentLoaded', () => {
      new StarsBackground('stars-container').init();
      new Navigation('.nav-link', '.page', 'mobile-menu-btn', 'mobile-menu').init();
      new PlanetCardFlip('.flip-btn').init();
      new PlanetQuiz().init();
      new ModalManager().init();
      new ApodFetcher().init();
    });
  }
}

App.init();
