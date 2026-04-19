const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupRevealOnScroll() {
  const revealTargets = document.querySelectorAll(
    ".card, .feature-item, .portfolio-item, .faq-list article"
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal-on-scroll");
  });

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

function setupRippleEffect() {
  const clickable = document.querySelectorAll(".btn, .btn-link");

  clickable.forEach((button) => {
    button.addEventListener("click", (event) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.className = "ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

function setupTiltInteraction() {
  if (prefersReducedMotion) return;

  const tiltTargets = document.querySelectorAll(
    ".feature-item, .portfolio-item, .hero, .faq-list article"
  );

  tiltTargets.forEach((el) => {
    el.classList.add("tilt-item");

    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -4;
      const rotateY = ((x / rect.width) - 0.5) * 4;

      el.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

function setupFaqInteraction() {
  const faqItems = document.querySelectorAll(".faq-list article");
  if (faqItems.length === 0) return;

  faqItems.forEach((item, index) => {
    if (index === 0) item.classList.add("open");

    item.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((faq) => faq.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

setupRevealOnScroll();
setupRippleEffect();
setupTiltInteraction();
setupFaqInteraction();
