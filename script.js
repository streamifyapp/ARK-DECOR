// ============================================
//   ARK DECOR — Main JavaScript
//   script.js — Premium Particles + Mobile-First
// ============================================

"use strict";

// ---- CONFIG ----
const OWNER_WHATSAPP = "918452099537";
const OWNER_CITY = "Mumbai";
const CURRENCY = "₹";
const CURRENCY_LABEL = "INR";
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// ---- STATE ----
let wishlist = JSON.parse(localStorage.getItem("ark_wishlist")) || [];
let currentCategory = "all";
let currentSearch = "";
let currentSort = "newest";
let filteredProducts = [...PRODUCTS];
let quickViewProduct = null;
let galleryImages = [];
let lightboxIndex = 0;
let particleAnimId = null;

// ============================================
//   INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initParticles();
  if (!IS_MOBILE) initCursor();
  initScrollProgress();
  initNavbar();
  initHamburger();
  initSearch();
  initShop();
  initQuickView();
  initAboutStats();
  initTestimonials();
  initGallery();
  initLightbox();
  initContact();
  initWishlist();
  initScrollTop();
  initFooterLinks();
  initAOS();
  updateWishlistBadge();
  initSmoothAnchors();
});

// ============================================
//   PREMIUM PRELOADER with Canvas Particles
// ============================================
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("preloaderBar");
  const percent = document.getElementById("preloaderPercent");
  const canvas = document.getElementById("preloaderCanvas");

  if (!preloader) return;

  // Preloader canvas particles
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const NUM = IS_MOBILE ? 40 : 80;

    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5
          ? `rgba(201,168,76,`
          : `rgba(65,105,225,`
      });
    }

    let animRunning = true;

    function drawPreloaderParticles() {
      if (!animRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.001;

        if (p.y < 0 || p.alpha <= 0) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.5 + 0.2;
        }
      });

      requestAnimationFrame(drawPreloaderParticles);
    }
    drawPreloaderParticles();

    // Stop when preloader fades
    setTimeout(() => { animRunning = false; }, 3200);
  }

  // Animated progress bar
  let prog = 0;
  const total = 2800; // ms
  const startTime = performance.now();

  function updateProgress(now) {
    const elapsed = now - startTime;
    prog = Math.min((elapsed / total) * 100, 100);

    if (bar) bar.style.width = prog + "%";
    if (percent) percent.textContent = Math.floor(prog) + "%";

    if (prog < 100) {
      requestAnimationFrame(updateProgress);
    }
  }

  requestAnimationFrame(updateProgress);

  // Hide preloader
  setTimeout(() => {
    preloader.classList.add("fade-out");
    document.body.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1000);
  }, 3000);
}

// ============================================
//   PREMIUM HERO PARTICLES (Canvas)
// ============================================
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // Reduce particle count on mobile for performance
  const NUM_PARTICLES = IS_MOBILE ? 35 : 80;
  const NUM_STARS = IS_MOBILE ? 60 : 140;
  const particles = [];
  const stars = [];

  // Background stars
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.01 + Math.random() * 0.02
    });
  }

  // Floating orb particles
  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : canvas.height + 10;
      this.r = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.55 + 0.1;
      this.life = 0;
      this.maxLife = 200 + Math.random() * 300;
      this.type = Math.random();
      // Colour: blue, gold, or white
      if (this.type < 0.4) {
        this.h = 220 + Math.floor(Math.random() * 20); // blue
        this.s = 70 + Math.floor(Math.random() * 20);
        this.l = 60 + Math.floor(Math.random() * 20);
      } else if (this.type < 0.75) {
        this.h = 42 + Math.floor(Math.random() * 12); // gold
        this.s = 70 + Math.floor(Math.random() * 20);
        this.l = 55 + Math.floor(Math.random() * 20);
      } else {
        this.h = 45;
        this.s = 10;
        this.l = 90; // white sparkle
      }
      this.glowing = Math.random() > 0.65;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;

      const mid = this.maxLife / 2;
      if (this.life < mid) {
        this.alpha = (this.life / mid) * this.maxAlpha;
      } else {
        this.alpha = ((this.maxLife - this.life) / mid) * this.maxAlpha;
      }

      if (this.life >= this.maxLife || this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      if (this.glowing) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.h},${this.s}%,${this.l}%,0.8)`;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.h},${this.s}%,${this.l}%,${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  // Connection lines (desktop only, performance heavy on mobile)
  for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;

  if (!IS_MOBILE) {
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });
  }

  function drawConnections() {
    if (IS_MOBILE) return; // skip on mobile
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
      if (distToMouse < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        const opacity = (1 - distToMouse / 120) * 0.15;
        ctx.strokeStyle = `rgba(201,168,76,${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          const opacity = (1 - dist / 90) * 0.06;
          ctx.strokeStyle = `rgba(65,105,225,${opacity})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }

  let frameCount = 0;

  function animate() {
    particleAnimId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;

    // Draw twinkling stars
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });

    // Draw connections (desktop)
    if (!IS_MOBILE) drawConnections();

    // Draw + update particles
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw bokeh rings occasionally
    if (!IS_MOBILE && frameCount % 3 === 0) {
      particles.forEach(p => {
        if (p.alpha > 0.3 && p.r > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.h},${p.s}%,${p.l}%,${p.alpha * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    }
  }

  animate();

  // Pause animation when tab is hidden (performance)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && particleAnimId) {
      cancelAnimationFrame(particleAnimId);
    } else {
      animate();
    }
  });
}

// ============================================
//   CUSTOM CURSOR (desktop only)
// ============================================
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = "a, button, .product-card, .filter-btn, .gallery-item, .social-icon, .nav-action-btn, .modal-close, .scroll-top, input, textarea, select";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add("hovering");
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove("hovering");
  });

  document.addEventListener("mouseleave", () => { dot.style.opacity = "0"; ring.style.opacity = "0"; });
  document.addEventListener("mouseenter", () => { dot.style.opacity = "1"; ring.style.opacity = "1"; });
}

// ============================================
//   SCROLL PROGRESS
// ============================================
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

// ============================================
//   NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    const scrollTopBtn = document.getElementById("scrollTop");
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }

    updateActiveNavLink();
  }, { passive: true });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        scrollToSection(href);
      }
    });
  });
}

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) {
    const offset = IS_MOBILE ? 70 : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function updateActiveNavLink() {
  const sections = ["home", "shop", "about", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

// ============================================
//   HAMBURGER / MOBILE MENU
// ============================================
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.contains("active") ? closeMobileMenu() : openMobileMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      closeMobileMenu();
      if (href && href.startsWith("#")) {
        e.preventDefault();
        setTimeout(() => scrollToSection(href), 400);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

function openMobileMenu() {
  document.getElementById("hamburger").classList.add("active");
  document.getElementById("mobileMenu").classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  document.getElementById("hamburger").classList.remove("active");
  document.getElementById("mobileMenu").classList.remove("active");
  document.body.classList.remove("menu-open");
}

// ============================================
//   SEARCH
// ============================================
function initSearch() {
  const searchToggle = document.getElementById("searchToggle");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchClose = document.getElementById("searchClose");
  const navSearchInput = document.getElementById("navSearchInput");
  if (!searchToggle || !searchOverlay) return;

  searchToggle.addEventListener("click", () => {
    searchOverlay.classList.toggle("active");
    if (searchOverlay.classList.contains("active")) {
      setTimeout(() => navSearchInput.focus(), 200);
    }
  });

  searchClose.addEventListener("click", () => searchOverlay.classList.remove("active"));

  navSearchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();
    currentSearch = val;
    if (val.length > 0) {
      scrollToSection("#shop");
      const shopSearch = document.getElementById("shopSearch");
      if (shopSearch) shopSearch.value = e.target.value;
    }
    applyFilters();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active");
    }
  });
}

// ============================================
//   SHOP
// ============================================
function initShop() {
  renderProducts(PRODUCTS);

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  const shopSearch = document.getElementById("shopSearch");
  if (shopSearch) {
    shopSearch.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  const shopSort = document.getElementById("shopSort");
  if (shopSort) {
    shopSort.addEventListener("change", (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }
}

function applyFilters() {
  let result = [...PRODUCTS];

  if (currentCategory !== "all") {
    result = result.filter(p => p.category === currentCategory);
  }

  if (currentSearch.length > 0) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      p.categoryLabel.toLowerCase().includes(currentSearch)
    );
  }

  switch (currentSort) {
    case "price-low": result.sort((a, b) => a.price - b.price); break;
    case "price-high": result.sort((a, b) => b.price - a.price); break;
    case "rating": result.sort((a, b) => b.rating - a.rating); break;
    default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
  }

  filteredProducts = result;
  renderProducts(result);
}

function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.style.display = "flex";
    return;
  }

  if (noResults) noResults.style.display = "none";
  grid.innerHTML = products.map((p, i) => createProductCard(p, i)).join("");
  bindProductCardEvents();
}

function createProductCard(p, index) {
  const isWishlisted = wishlist.some(w => w.id === p.id);
  const stars = renderStars(p.rating);
  const badgeClass = getBadgeClass(p.badge);
  const delay = (index % 6) * 55;

  return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${delay}ms">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="product-badge ${badgeClass}">${p.badge}</span>
        <button class="product-wishlist ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Add to wishlist">
          <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <button class="product-quick-view" data-id="${p.id}">
          <i class="fas fa-eye"></i> Quick View
        </button>
      </div>
      <div class="product-body">
        <span class="product-category">${p.categoryLabel}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-count">${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-price">${p.displayPrice}</div>
        <button class="btn btn-filled product-order-btn" data-id="${p.id}">
          <i class="fab fa-whatsapp"></i> Order via WhatsApp
        </button>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += `<i class="fas fa-star"></i>`;
    else if (i - rating < 1) stars += `<i class="fas fa-star-half-alt"></i>`;
    else stars += `<i class="far fa-star empty"></i>`;
  }
  return stars;
}

function getBadgeClass(badge) {
  switch (badge) {
    case "New Arrival": return "badge-new";
    case "Premium": return "badge-premium";
    case "Custom": return "badge-custom";
    default: return "badge-bestseller";
  }
}

function bindProductCardEvents() {
  document.querySelectorAll(".product-wishlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(parseInt(btn.dataset.id), btn);
    });
  });

  document.querySelectorAll(".product-quick-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openQuickView(parseInt(btn.dataset.id));
    });
  });

  document.querySelectorAll(".product-img-wrap").forEach(wrap => {
    wrap.addEventListener("click", (e) => {
      if (!e.target.closest(".product-wishlist") && !e.target.closest(".product-quick-view")) {
        const card = wrap.closest(".product-card");
        if (card) openQuickView(parseInt(card.dataset.id));
      }
    });
  });

  document.querySelectorAll(".product-order-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const product = PRODUCTS.find(p => p.id === parseInt(btn.dataset.id));
      if (product) orderViaWhatsApp(product);
    });
  });
}

// ============================================
//   WHATSAPP ORDER
// ============================================
function orderViaWhatsApp(product, userCity = "") {
  const city = userCity || getUserCity();
  const message = encodeURIComponent(
    `Hello ARK Decor! 🌟\n\nI'm interested in purchasing:\n` +
    `📦 Product: ${product.name}\n` +
    `🏷️ Category: ${product.categoryLabel}\n` +
    `💰 Price: ${product.displayPrice} (${CURRENCY_LABEL})\n` +
    `📍 My City: ${city}\n\n` +
    `Please share availability and delivery details.\n\nThank you!`
  );
  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${message}`, "_blank");
}

function getUserCity() {
  const saved = localStorage.getItem("ark_user_city");
  if (saved) return saved;
  const city = prompt("Please enter your city for delivery details:") || OWNER_CITY;
  localStorage.setItem("ark_user_city", city);
  return city;
}

// ============================================
//   QUICK VIEW MODAL
// ============================================
function initQuickView() {
  const overlay = document.getElementById("quickViewOverlay");
  const closeBtn = document.getElementById("modalClose");
  const orderBtn = document.getElementById("modalOrderBtn");
  if (!overlay) return;

  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeQuickView(); });
  closeBtn.addEventListener("click", closeQuickView);
  orderBtn.addEventListener("click", () => { if (quickViewProduct) orderViaWhatsApp(quickViewProduct); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) closeQuickView();
  });
}

function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  quickViewProduct = product;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;
  document.getElementById("modalBadge").textContent = product.badge;
  document.getElementById("modalBadge").className = `modal-badge ${getBadgeClass(product.badge)}`;
  document.getElementById("modalCategory").textContent = product.categoryLabel;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = product.displayPrice;
  document.getElementById("modalDesc").textContent = product.fullDescription;

  document.getElementById("modalRating").innerHTML = `
    <div class="stars">${renderStars(product.rating)}</div>
    <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
  `;

  document.getElementById("modalSpecs").innerHTML = product.specs.map(s => `<li>${s}</li>`).join("");

  document.getElementById("quickViewOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  document.getElementById("quickViewOverlay").classList.remove("active");
  document.body.style.overflow = "";
  quickViewProduct = null;
}

// ============================================
//   WISHLIST
// ============================================
function initWishlist() {
  const toggle = document.getElementById("wishlistToggle");
  const overlay = document.getElementById("wishlistOverlay");
  const closeBtn = document.getElementById("wishlistClose");
  if (!toggle || !overlay) return;

  toggle.addEventListener("click", openWishlist);
  closeBtn.addEventListener("click", closeWishlist);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeWishlist(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) closeWishlist();
  });
}

function toggleWishlist(id, btn) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const isIn = wishlist.some(w => w.id === id);

  if (isIn) {
    wishlist = wishlist.filter(w => w.id !== id);
    btn.classList.remove("active");
    btn.innerHTML = `<i class="far fa-heart"></i>`;
    showToast("Removed from wishlist", "info", "fas fa-heart-broken");
  } else {
    wishlist.push(product);
    btn.classList.add("active");
    btn.innerHTML = `<i class="fas fa-heart"></i>`;
    showToast(`Added: ${product.name}`, "success", "fas fa-heart");

    const badge = document.getElementById("wishlistBadge");
    if (badge) {
      badge.classList.add("bump");
      setTimeout(() => badge.classList.remove("bump"), 400);
    }
  }

  localStorage.setItem("ark_wishlist", JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.getElementById("wishlistBadge");
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
}

function openWishlist() {
  const overlay = document.getElementById("wishlistOverlay");
  const itemsContainer = document.getElementById("wishlistItems");
  const emptyEl = document.getElementById("wishlistEmpty");

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = "";
    if (emptyEl) emptyEl.style.display = "flex";
  } else {
    if (emptyEl) emptyEl.style.display = "none";
    itemsContainer.innerHTML = wishlist.map(p => `
      <div class="wishlist-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="wishlist-item-info">
          <div class="wishlist-item-name">${p.name}</div>
          <div class="wishlist-item-price">${p.displayPrice}</div>
        </div>
        <button class="wishlist-item-remove" data-id="${p.id}" aria-label="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join("");

    itemsContainer.querySelectorAll(".wishlist-item-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        wishlist = wishlist.filter(w => w.id !== id);
        localStorage.setItem("ark_wishlist", JSON.stringify(wishlist));
        updateWishlistBadge();
        openWishlist();

        const cardBtn = document.querySelector(`.product-wishlist[data-id="${id}"]`);
        if (cardBtn) { cardBtn.classList.remove("active"); cardBtn.innerHTML = `<i class="far fa-heart"></i>`; }
        showToast("Removed from wishlist", "info", "fas fa-heart-broken");
      });
    });
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWishlist() {
  document.getElementById("wishlistOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================
//   ABOUT STATS COUNT-UP
// ============================================
function initAboutStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, parseInt(entry.target.dataset.target, 10));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateCount(el, target) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("en-IN");
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString("en-IN");
  }

  requestAnimationFrame(update);
}

// ============================================
//   TESTIMONIALS SWIPER
// ============================================
function initTestimonials() {
  if (!document.querySelector(".testimonials-swiper") || typeof Swiper === "undefined") return;

  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: { prevEl: ".testimonial-prev", nextEl: ".testimonial-next" },
    pagination: { el: ".testimonial-pagination", clickable: true },
    breakpoints: {
      600: { slidesPerView: 1.4 },
      900: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    },
    grabCursor: true
  });
}

// ============================================
//   GALLERY
// ============================================
function initGallery() {
  galleryImages = [];
  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    const img = item.querySelector("img");
    if (img) galleryImages.push({ src: img.src, alt: img.alt });
    item.addEventListener("click", () => openLightbox(index));
  });
}

// ============================================
//   LIGHTBOX
// ============================================
function initLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  if (!overlay) return;

  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeLightbox(); });
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);

  document.getElementById("lightboxPrev").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    updateLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") { lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length; updateLightbox(); }
    if (e.key === "ArrowRight") { lightboxIndex = (lightboxIndex + 1) % galleryImages.length; updateLightbox(); }
  });

  // Touch swipe support
  let touchStartX = 0;
  overlay.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { lightboxIndex = (lightboxIndex + 1) % galleryImages.length; }
      else { lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length; }
      updateLightbox();
    }
  }, { passive: true });
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  document.getElementById("lightboxOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const img = document.getElementById("lightboxImg");
  if (img && galleryImages[lightboxIndex]) {
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = galleryImages[lightboxIndex].src;
      img.alt = galleryImages[lightboxIndex].alt;
      img.style.opacity = "1";
    }, 150);
    img.style.transition = "opacity 0.3s ease";
  }
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================
//   CONTACT FORM
// ============================================
function initContact() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !message) {
      showToast("Please fill in your name and message.", "error", "fas fa-exclamation-circle");
      return;
    }

    const text = encodeURIComponent(
      `Hi ARK Decor! My name is ${name}.\n\n${message}` +
      (phone ? `\n\nContact: ${phone}` : "")
    );

    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${text}`, "_blank");
    showToast("Redirecting to WhatsApp...", "success", "fab fa-whatsapp");
    form.reset();
  });
}

// ============================================
//   SCROLL TO TOP
// ============================================
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ============================================
//   FOOTER LINKS — Category Shortcut
// ============================================
function initFooterLinks() {
  document.querySelectorAll("[data-filter]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.filter;
      currentCategory = category;

      document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
      });

      applyFilters();
      setTimeout(() => scrollToSection("#shop"), 100);
    });
  });
}

// ============================================
//   SMOOTH ANCHOR NAVIGATION
// ============================================
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        scrollToSection(href);
      }
    });
  });
}

// ============================================
//   AOS INIT
// ============================================
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: IS_MOBILE ? 600 : 800,
      easing: "ease-out-cubic",
      once: true,
      offset: IS_MOBILE ? 40 : 60,
      delay: 0,
      disable: false
    });
  }
}

// ============================================
//   TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = "info", iconClass = "fas fa-info-circle") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="toast-icon ${iconClass}"></i><span class="toast-message">${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add("show")));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 500);
  }, 3200);
}

// ============================================
//   PERFORMANCE: PASSIVE TOUCH EVENTS
// ============================================
document.addEventListener("touchstart", () => {}, { passive: true });
document.addEventListener("touchmove", () => {}, { passive: true });
