// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // --- Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- Custom Cursor ---
  const cursorGlow = document.getElementById("customCursorGlow");
  const cursorDot = document.getElementById("customCursorDot");

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let dotX = 0;
  let dotY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerping animation for custom cursor
  function animateCursor() {
    // Dot follows fast
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    // Glow has a larger lag for cinematic trail feel
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover state class for links
  const hoverables = document.querySelectorAll("a, button, .social-icon, .btn-magnetic");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("hovered");
    });
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  });

  // --- Magnetic Button Effect ---
  const magnetics = document.querySelectorAll(".btn-magnetic");
  magnetics.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move button slightly towards cursor
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out"
      });

      // Move text or inner elements inside button slightly more to enhance dynamic feel
      const innerText = btn.querySelector("span, i");
      if (innerText) {
        gsap.to(innerText, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
      const innerText = btn.querySelector("span, i");
      if (innerText) {
        gsap.to(innerText, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  });

  // --- Card Mouse Spotlight Glow Interaction ---
  const spotlitCards = document.querySelectorAll(".card-spotlight");
  spotlitCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // --- Hero Vignette & Particles Animation ---
  const heroParticles = document.getElementById("heroParticles");
  if (heroParticles) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "floating-particle";
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(24, 194, 156, ${Math.random() * 0.4 + 0.2});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        box-shadow: 0 0 8px var(--accent-primary);
      `;
      heroParticles.appendChild(particle);

      // Floating animation
      gsap.to(particle, {
        y: `-=${Math.random() * 80 + 40}`,
        x: `+=${Math.random() * 40 - 20}`,
        opacity: 0,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        ease: "power1.out",
        delay: Math.random() * 3
      });
    }
  }

  // --- Page Load & Scroll Reveal Animations ---

  // Fade Up Animation elements
  gsap.utils.toArray(".animate-fade-up").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // Scale In Animation elements
  gsap.utils.toArray(".animate-scale-in").forEach((el) => {
    gsap.from(el, {
      scale: 0.92,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  // Split text reveal mock using CSS transitions / GSAP clip path
  gsap.utils.toArray(".animate-split-text").forEach((el) => {
    gsap.from(el, {
      y: "30%",
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });

  // Staggered lists/cards reveals
  gsap.from(".stats-container .stat-card", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".stats-section",
      start: "top 85%"
    }
  });

  gsap.from(".about-cards-col .about-detail-card", {
    x: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%"
    }
  });

  gsap.from(".skills-dashboard-grid .skill-category-card", {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 75%"
    }
  });

  gsap.from(".projects-bento-grid .project-card", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 75%"
    }
  });



  // --- Experience Timeline Scrolling Line Drawing ---
  const timelineLine = document.getElementById("glowingTimelineLine");
  if (timelineLine) {
    gsap.fromTo(timelineLine, 
      { attr: { y2: "0%" } }, 
      {
        attr: { y2: "100%" },
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 25%",
          end: "bottom 75%",
          scrub: true
        }
      }
    );
  }

  // --- 3D Hover Tilt Effect for Bento Project Cards ---
  const projectCards = document.querySelectorAll(".projects-bento-grid .project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const tiltX = (yc - y) / 18; // Max tilt degrees
      const tiltY = (x - xc) / 18;
      
      gsap.to(card, {
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  // --- Back to Top Button ---
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        gsap.to(backToTop, { opacity: 1, scale: 1, duration: 0.3, display: "flex" });
      } else {
        gsap.to(backToTop, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => { backToTop.style.display = "none"; } });
      }
    });

    backToTop.addEventListener("click", () => {
      lenis.scrollTo(0, { duration: 1.5 });
    });
  }

  // Initialize Lucide Icons
  lucide.createIcons();
});
