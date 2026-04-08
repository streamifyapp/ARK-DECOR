
// ============================================================
// ARK DECOR — MAIN SCRIPT
// Ultra-Premium Luxury Lighting Shop
// ============================================================

// ======= CONFIGURATION =======
const WHATSAPP_NUMBER = "923001234567"; // Change this to owner's number
const SITE_NAME = "ARK Decor";

// ======= DOM READY =======
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initHero();
  initParticleCanvas();
  initProducts();
  initFiltersAndSearch();
  initModal();
  initWishlist();
  initAboutCounters();
  initTestimonials();
  initGallery();
  initLightbox();
  initContactForm();
  initScrollTop();
  initAOS();
  initWhatsAppButtons();
  initFooter();
  smoothScrollLinks();
});

// ============================================================
// PRELOADER
// ============================================================
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const particlesContainer = document.getElementById("preloaderParticles");

  // Create floating particles
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "preloader-particle";
    p.style.setProperty("--x", Math.random() * 100 + "%");
    p.style.setProperty("--y", Math.random() * 100 + "%");
    p.style.setProperty("--dur", (3 + Math.random() * 4) + "s");
    p.style.setProperty("--delay", (Math.random() * 3) + "s");
    p.style.width = (2 + Math.random() * 3) + "px";
    p.style.height = p.style.width;
    particlesContainer.appendChild(p);
  }

  // Hide preloader after animation
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("preloading");
      }, 900);
    }, 2400);
  });

  // Fallback if load event doesn't fire
  setTimeout(() => {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
      setTimeout(() => { preloader.style.display = "none"; }, 900);
    }
  }, 4000);
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  const trail = document.getElementById("customCursorTrail");

  if (window.innerWidth <= 768) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth trail animation
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover effects on interactive elements
  const interactives = "a, button, .filter-btn, .product-card, .gallery-item, .nav-link, select, input, textarea, .social-link";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.add("cursor-hover");
      trail.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactives)) {
      cursor.classList.remove("cursor-hover");
      trail.classList.remove("cursor-hover");
    }
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

// ============================================================
// SCROLL PROGRESS
// ============================================================
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = Math.min(progress, 100) + "%";
  }, { passive: true });
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");

  // Scroll behavior
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  // Close menu on link click
  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id], div[id='home']");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// ============================================================
// HERO SECTION
// ============================================================
function initHero() {
  // Hero WhatsApp button
  const heroWaBtn = document.getElementById("heroWhatsappBtn");
  if (heroWaBtn) {
    heroWaBtn.href = buildWhatsAppURL("Hello ARK Decor! 🌟 I'd love to explore your premium lighting collection. Could you share your latest catalog?");
    heroWaBtn.target = "_blank";
    heroWaBtn.rel = "noopener noreferrer";
  }
}

// ============================================================
// PARTICLE CANVAS
// ============================================================
function initParticleCanvas() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener("resize", () => {
    resize();
    particles = [];
    createParticles();
  }, { passive: true });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.6 - 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;

      if (this.life < 30) {
        this.opacity = (this.life / 30) * 0.6;
      } else if (this.life > this.maxLife - 30) {
        this.opacity = ((this.maxLife - this.life) / 30) * 0.6;
      }

      if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;

      // Gold sparkle
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, "#e4c97e");
      gradient.addColorStop(0.5, "#c9a84c");
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f0e8";
      ctx.fill();

      ctx.restore();
    }
  }

  function createParticles() {
    const count = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < Math.min(count, 120); i++) {
      const p = new Particle();
      p.life = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }
  }

  function drawStars() {
    // Occasional larger sparkle
    if (Math.random() < 0.02) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 8 + 4;

      ctx.save();
      ctx.globalAlpha = Math.random() * 0.4 + 0.1;
      ctx.strokeStyle = "#c9a84c";
      ctx.lineWidth = 0.5;

      // Cross sparkle
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((i * Math.PI) / 4);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animFrame = requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else {
      animate();
    }
  });
}

// ============================================================
// WHATSAPP UTILS
// ============================================================
function buildWhatsAppURL(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function buildProductWhatsAppURL(product) {
  const message =
    `Hello ${SITE_NAME}! 🌟 I'm interested in purchasing:\n\n` +
    `📦 *Product:* ${product.name}\n` +
    `🏷️ *Category:* ${formatCategory(product.category)}\n` +
    `💰 *Price:* ${product.price}\n` +
    `⭐ *Rating:* ${product.rating}/5\n\n` +
    `Please confirm availability and share more details. Thank you!`;
  return buildWhatsAppURL(message);
}

function formatCategory(cat) {
  const map = {
    "jhumars": "Jhumars / Chandeliers",
    "wall-lights": "Wall Lights",
    "wall-hangings": "Wall Hangings",
    "ceiling-lights": "Ceiling Lights",
    "table-lamps": "Table Lamps",
    "outdoor-lights": "Outdoor Lights"
  };
  return map[cat] || cat;
}

function initWhatsAppButtons() {
  // Contact WhatsApp button
  const contactWaBtn = document.getElementById("contactWhatsappBtn");
  if (contactWaBtn) {
    contactWaBtn.href = buildWhatsAppURL("Hello ARK Decor! 👋 I'd like to inquire about your products and services.");
    contactWaBtn.target = "_blank";
    contactWaBtn.rel = "noopener noreferrer";
  }

  // Floating WhatsApp
  const floatWa = document.getElementById("whatsappFloat");
  if (floatWa) {
    floatWa.href = buildWhatsAppURL("Hello ARK Decor! 🌟 I'm visiting your website and would love to know more about your premium lighting collection.");
    floatWa.target = "_blank";
    floatWa.rel = "noopener noreferrer";
  }

  // Footer WhatsApp
  const footerWa = document.getElementById("footerWhatsappBtn");
  if (footerWa) {
    footerWa.href = buildWhatsAppURL("Hello ARK Decor! 🌟 I'd like to place an order.");
    footerWa.target = "_blank";
    footerWa.rel = "noopener noreferrer";
  }

  // Display phone
  const displayPhone = document.getElementById("displayPhone");
  const footerPhone = document.getElementById("footerPhone");
  const phoneFormatted = "+" + WHATSAPP_NUMBER.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 $2-$3-$4");
  if (displayPhone) displayPhone.textContent = phoneFormatted;
  if (footerPhone) footerPhone.textContent = phoneFormatted;
}

// ============================================================
// PRODUCTS
// ============================================================
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";
let filteredProducts = [...PRODUCTS];

function initProducts() {
  renderProducts(PRODUCTS);
}

function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");

  if (!grid) return;

  grid.innerHTML = "";

  if (products.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  products.forEach((product, index) => {
    const card = createProductCard(product, index);
    grid.appendChild(card);
  });
}

function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.id = product.id;
  card.dataset.category = product.category;
  card.style.animationDelay = (index * 60) + "ms";

  const isWishlisted = getWishlist().some(w => w.id === product.id);
  const stars = generateStars(product.rating);
  const badgeClass = getBadgeClass(product.badge);

  card.innerHTML = `
    <div class="product-img-wrapper">
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=60'"
      />
      ${product.badge ? `<div class="product-badge ${badgeClass}">${product.badge}</div>` : ""}
      <div class="product-actions-hover">
        <button 
          class="product-action-btn ${isWishlisted ? "wishlisted" : ""}" 
          data-action="wishlist" 
          data-id="${product.id}"
          title="${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}"
        >
          <i class="${isWishlisted ? "fas" : "far"} fa-heart"></i>
        </button>
        <button 
          class="product-action-btn" 
          data-action="quickview" 
          data-id="${product.id}"
          title="Quick View"
        >
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${formatCategory(product.category)}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-rating">
        <div class="stars">${stars}</div>
        <span class="rating-num">${product.rating} (${product.reviews} reviews)</span>
      </div>
      <div class="product-footer">
        <div class="product-price">${product.price}</div>
        <button class="btn-buy-whatsapp" data-action="buy" data-id="${product.id}">
          <i class="fab fa-whatsapp"></i> Buy Now
        </button>
      </div>
    </div>
  `;

  // Event delegation on card
  card.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = parseInt(btn.dataset.id);
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) return;

    e.stopPropagation();

    if (action === "buy") {
      window.open(buildProductWhatsAppURL(product), "_blank", "noopener,noreferrer");
    } else if (action === "wishlist") {
      toggleWishlist(product, btn);
    } else if (action === "quickview") {
      openQuickView(product);
    }
  });

  // Click card body to open quick view
  card.querySelector(".product-img-wrapper").addEventListener("click", (e) => {
    if (!e.target.closest("[data-action]")) {
      const product = PRODUCTS.find(p => p.id === parseInt(card.dataset.id));
      if (product) openQuickView(product);
    }
  });

  return card;
}

function generateStars(rating) {
  let html = "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }
  if (hasHalf) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="far fa-star"></i>';
  }
  return html;
}

function getBadgeClass(badge) {
  const map = {
    "Bestseller": "badge-bestseller",
    "New": "badge-new",
    "Premium": "badge-premium",
    "Custom": "badge-custom"
  };
  return map[badge] || "badge-bestseller";
}

// ============================================================
// FILTERS, SEARCH & SORT
// ============================================================
function initFiltersAndSearch() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const sortSelect = document.getElementById("sortSelect");

  // Category filter
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      applyFiltersAndSort();
    });
  });

  // Search
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    clearSearch.style.display = currentSearch ? "block" : "none";
    applyFiltersAndSort();
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    clearSearch.style.display = "none";
    applyFiltersAndSort();
  });

  // Sort
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    applyFiltersAndSort();
  });
}

function applyFiltersAndSort() {
  let result = [...PRODUCTS];

  // Category filter
  if (currentFilter !== "all") {
    result = result.filter(p => p.category === currentFilter);
  }

  // Search filter
  if (currentSearch) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch) ||
      formatCategory(p.category).toLowerCase().includes(currentSearch)
    );
  }

  // Sort
  switch (currentSort) {
    case "price-low":
      result.sort((a, b) => a.priceNum - b.priceNum);
      break;
    case "price-high":
      result.sort((a, b) => b.priceNum - a.priceNum);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    case "newest":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id);
      break;
    default:
      break;
  }

  filteredProducts = result;
  renderProducts(result);
}

// ============================================================
// QUICK VIEW MODAL
// ============================================================
function initModal() {
  const overlay = document.getElementById("quickViewModal");
  const closeBtn = document.getElementById("modalClose");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openQuickView(product) {
  const modal = document.getElementById("quickViewModal");
  const body = document.getElementById("modalBody");
  const stars = generateStars(product.rating);
  const badgeClass = getBadgeClass(product.badge);

  const specsList = product.specs.map(spec =>
    `<span class="spec-tag"><i class="fas fa-check"></i>${spec}</span>`
  ).join("");

  body.innerHTML = `
    <div class="modal-img-col">
      <img 
        src="${product.image}" 
        alt="${product.name}"
        onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=60'"
      />
    </div>
    <div class="modal-info-col">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div class="modal-category">${formatCategory(product.category)}</div>
        ${product.badge ? `<span class="product-badge ${badgeClass}" style="position:relative;top:auto;left:auto;">${product.badge}</span>` : ""}
      </div>
      <h2 class="modal-title">${product.name}</h2>
      <div class="modal-rating">
        <div class="stars">${stars}</div>
        <span>${product.rating}/5 (${product.reviews} reviews)</span>
      </div>
      <p class="modal-desc">${product.fullDescription}</p>
      <div class="modal-price">${product.price}</div>
      <div class="modal-specs">
        <h4>Specifications</h4>
        <div class="modal-specs-list">${specsList}</div>
      </div>
      <div class="modal-actions">
        <button class="btn-buy-whatsapp" id="modalBuyBtn" style="cursor:none;">
          <i class="fab fa-whatsapp"></i> Buy on WhatsApp
        </button>
        <button class="btn-wishlist modal-actions" id="modalWishlistBtn" title="Add to Wishlist">
          <i class="${getWishlist().some(w => w.id === product.id) ? "fas" : "far"} fa-heart"></i>
        </button>
      </div>
    </div>
  `;

  // Modal button events
  document.getElementById("modalBuyBtn").addEventListener("click", () => {
    window.open(buildProductWhatsAppURL(product), "_blank", "noopener,noreferrer");
  });

  document.getElementById("modalWishlistBtn").addEventListener("click", (e) => {
    toggleWishlist(product, e.currentTarget);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("quickViewModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================================
// WISHLIST (LocalStorage)
// ============================================================
function initWishlist() {
  const wishlistNavBtn = document.getElementById("wishlistNavBtn");
  const wishlistOverlay = document.getElementById("wishlistOverlay");
  const closeSidebarBtn = document.getElementById("closeWishlist");

  wishlistNavBtn.addEventListener("click", () => {
    openWishlistSidebar();
  });

  closeSidebarBtn.addEventListener("click", () => {
    closeWishlistSidebar();
  });

  wishlistOverlay.addEventListener("click", () => {
    closeWishlistSidebar();
  });

  updateWishlistCount();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("arkdecor_wishlist") || "[]");
  } catch {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem("arkdecor_wishlist", JSON.stringify(wishlist));
}

function toggleWishlist(product, btn) {
  let wishlist = getWishlist();
  const idx = wishlist.findIndex(w => w.id === product.id);

  if (idx === -1) {
    wishlist.push({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
    saveWishlist(wishlist);

    if (btn) {
      btn.classList.add("wishlisted");
      const icon = btn.querySelector("i");
      if (icon) { icon.className = "fas fa-heart"; }
    }

    showToast("Added to wishlist! ❤️", "success");

    // Update all wishlist buttons for this product
    document.querySelectorAll(`[data-action="wishlist"][data-id="${product.id}"]`).forEach(b => {
      b.classList.add("wishlisted");
      const i = b.querySelector("i");
      if (i) i.className = "fas fa-heart";
    });

  } else {
    wishlist.splice(idx, 1);
    saveWishlist(wishlist);

    if (btn) {
      btn.classList.remove("wishlisted");
      const icon = btn.querySelector("i");
      if (icon) { icon.className = "far fa-heart"; }
    }

    showToast("Removed from wishlist", "info");

    document.querySelectorAll(`[data-action="wishlist"][data-id="${product.id}"]`).forEach(b => {
      b.classList.remove("wishlisted");
      const i = b.querySelector("i");
      if (i) i.className = "far fa-heart";
    });
  }

  updateWishlistCount();

  // Refresh wishlist sidebar if open
  const sidebar = document.getElementById("wishlistSidebar");
  if (sidebar.classList.contains("active")) {
    renderWishlistItems();
  }
}

function updateWishlistCount() {
  const count = getWishlist().length;
  const countEl = document.getElementById("wishlistCount");
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? "flex" : "none";
  }
}

function openWishlistSidebar() {
  document.getElementById("wishlistSidebar").classList.add("active");
  document.getElementById("wishlistOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
  renderWishlistItems();
}

function closeWishlistSidebar() {
  document.getElementById("wishlistSidebar").classList.remove("active");
  document.getElementById("wishlistOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function renderWishlistItems() {
  const container = document.getElementById("wishlistItems");
  const emptyMsg = document.getElementById("wishlistEmpty");
  const wishlist = getWishlist();

  container.innerHTML = "";

  if (wishlist.length === 0) {
    emptyMsg.classList.add("visible");
    container.style.display = "none";
    return;
  }

  emptyMsg.classList.remove("visible");
  container.style.display = "block";

  wishlist.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;

    const el = document.createElement("div");
    el.className = "wishlist-item";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60'" />
      <div class="wishlist-item-info">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <div class="wishlist-item-actions">
          <button class="btn-buy-whatsapp" data-buy-id="${item.id}">
            <i class="fab fa-whatsapp"></i> Buy
          </button>
          <button class="wishlist-remove-btn" data-remove-id="${item.id}" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    el.querySelector("[data-buy-id]").addEventListener("click", () => {
      window.open(buildProductWhatsAppURL(product), "_blank", "noopener,noreferrer");
    });

    el.querySelector("[data-remove-id]").addEventListener("click", () => {
      toggleWishlist(product, null);
      renderWishlistItems();
    });

    container.appendChild(el);
  });
}

// ============================================================
// ABOUT COUNTERS
// ============================================================
function initAboutCounters() {
  const statNums = document.querySelectorAll(".stat-num[data-count]");
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.count);
        animateCounter(el, 0, target, 1800);
      });
    }
  }, { threshold: 0.3 });

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const value = Math.floor(start + (end - start) * eased);
    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = end.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// ============================================================
// TESTIMONIALS SWIPER
// ============================================================
function initTestimonials() {
  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: ".testimonial-pagination",
      clickable: true
    },
    navigation: {
      prevEl: ".testimonial-prev",
      nextEl: ".testimonial-next"
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 }
    },
    effect: "slide"
  });
}

// ============================================================
// GALLERY
// ============================================================
function initGallery() {
  const items = document.querySelectorAll(".gallery-item");
  items.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-overlay span");
      if (img) {
        openLightbox(img.src, caption ? caption.textContent : "");
      }
    });
  });
}

// ============================================================
// LIGHTBOX
// ============================================================
let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  // Collect all gallery images
  document.querySelectorAll(".gallery-item img").forEach((img, idx) => {
    const caption = img.closest(".gallery-item")?.querySelector(".gallery-overlay span")?.textContent || "";
    lightboxImages.push({ src: img.src, caption });
  });

  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.id === "lightboxOverlay") closeLightbox();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") { lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length; updateLightboxImage(); }
    if (e.key === "ArrowRight") { lightboxIndex = (lightboxIndex + 1) % lightboxImages.length; updateLightboxImage(); }
  });
}

function openLightbox(src, caption) {
  const overlay = document.getElementById("lightboxOverlay");
  lightboxIndex = lightboxImages.findIndex(img => img.src === src);
  if (lightboxIndex === -1) lightboxIndex = 0;

  updateLightboxImage(src, caption);
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxImage(src, caption) {
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  const data = lightboxImages[lightboxIndex];

  if (data) {
    img.src = src || data.src;
    cap.textContent = caption || data.caption;
  }
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName")?.value?.trim() || "";
    const phone = document.getElementById("contactPhone")?.value?.trim() || "";
    const subject = document.getElementById("contactSubject")?.value || "General Inquiry";
    const message = document.getElementById("contactMessage")?.value?.trim() || "";

    if (!name || !message) {
      showToast("Please fill in your name and message.", "error");
      return;
    }

    const waMessage =
      `Hello ${SITE_NAME}! 👋\n\n` +
      `My name is *${name}*.\n` +
      `📱 Phone: ${phone || "Not provided"}\n` +
      `📌 Subject: ${subject}\n\n` +
      `📝 Message:\n${message}\n\n` +
      `Please get back to me at your earliest convenience. Thank you!`;

    window.open(buildWhatsAppURL(waMessage), "_blank", "noopener,noreferrer");
    form.reset();
    showToast("Message sent via WhatsApp! ✅", "success");
  });
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollTop() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================================
// AOS ANIMATIONS
// ============================================================
function initAOS() {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 0
  });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function smoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || !href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById("navbar")?.offsetHeight || 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    });
  });

  // Shop filter buttons in footer/hero
  document.querySelectorAll('[href="#shop"]').forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  });
}

// ============================================================
// FOOTER
// ============================================================
function initFooter() {
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icons = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    error: "fas fa-exclamation-circle"
  };

  toast.innerHTML = `
    <i class="${icons[type] || icons.info}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 450);
  }, 3500);
}

// ============================================================
// HERO SECTION - Shop filter buttons
// ============================================================
document.addEventListener("click", (e) => {
  const filterLink = e.target.closest('[href="#shop"]');
  if (filterLink && filterLink.closest(".hero-buttons")) {
    setTimeout(() => {
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }
});

// ============================================================
// INTERSECTION OBSERVER FOR PRODUCT CARDS
// ============================================================
function observeProductCards() {
  const cards = document.querySelectorAll(".product-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  cards.forEach(card => {
    observer.observe(card);
  });
}

// ============================================================
// WINDOW RESIZE HANDLER
// ============================================================
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    AOS.refresh();
  }, 250);
}, { passive: true });

// ============================================================
// PAGE VISIBILITY - Pause animations when hidden
// ============================================================
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    AOS.refresh();
  }
});

// ============================================================
// PREVENT CONTEXT MENU ON IMAGES (Optional luxury touch)
// ============================================================
document.querySelectorAll(".product-img-wrapper img, .gallery-item img").forEach(img => {
  img.addEventListener("contextmenu", (e) => e.preventDefault());
});

// ============================================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================================
document.addEventListener("keydown", (e) => {
  // Escape closes modal, lightbox, wishlist
  if (e.key === "Escape") {
    closeModal();
    closeLightbox();
    closeWishlistSidebar();
  }
});
