/* ========= Typing effect (hero) ========= */
(function typingEffect() {
  const el = document.querySelector(".typing-text");
  if (!el) return;
  const words = ["Full stack Developer", "Programmer", "Tech Enthusiast"];
  let w = 0, i = 0, forward = true;

  function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (forward) {
      i++;
      if (i > word.length) { forward = false; setTimeout(tick, 900); return; }
    } else {
      i--;
      if (i === 0) { forward = true; w = (w + 1) % words.length; }
    }
    setTimeout(tick, forward ? 70 : 25);
  }
  tick();
})();


/* ========= Smooth scroll with header offset ========= */
(function smoothNavScroll() {
  const header = document.querySelector('header');
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  function headerHeight() {
    return header ? header.offsetHeight + 16 : 16; // 16px extra gap
  }

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ========= Reveal on scroll & trigger animations ========= */
(function revealAndAnimate() {
  const revealEls = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress-bar');

  if (revealEls.length === 0 && progressBars.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // If this target contains progress bars (skill-box or skills section), animate them
        if (entry.target.closest('#skills') || entry.target.querySelectorAll('.progress-bar').length) {
          animateProgressBars();
        }

        // Unobserve once visible (so animation runs once)
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  const skillsContainer = document.getElementById('skills');
  if (skillsContainer) observer.observe(skillsContainer);

  /* Progress animate function (runs once) */
  let progressAnimated = false;
  function animateProgressBars() {
    if (progressAnimated) return;
    progressAnimated = true;
    progressBars.forEach(bar => {
      const pct = bar.dataset.progress || 0;
      bar.style.width = pct + '%';
    });
  }
})();


/* ========= Contact Form Validation ========= */
(function contactFormValidation() {
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) {
      showMsg("Please enter your full name.", "error"); return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      showMsg("Please enter a valid email address.", "error"); return;
    }
    if (message.length < 10) {
      showMsg("Message should be at least 10 characters.", "error"); return;
    }

    showMsg("Message sent successfully ✅", "success");
    form.reset();
  });

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.style.color = type === "success" ? "#22c55e" : "#f87171";
    msgEl.style.opacity = 1;
    setTimeout(() => { msgEl.style.opacity = 0; }, 4000);
  }
})();


/* ========= Sticky Header ========= */
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});


/* ========= Project Modal ========= */
const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const modalImg = modal.querySelector(".modal-img");
const modalTitle = modal.querySelector(".modal-title");
const modalDesc = modal.querySelector(".modal-desc");
const modalTags = modal.querySelector(".modal-tags");
const modalClose = modal.querySelector(".modal-close");

projectCards.forEach(card => {
  const img = card.querySelector(".project-img"); // image only

  img.addEventListener("click", () => {
    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    // tags dynamic
    modalTags.innerHTML = "";
    const tags = card.dataset.tags.split(",");
    tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag.trim();
      modalTags.appendChild(span);
    });

    modal.classList.add("open");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("open");
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("open");
});
