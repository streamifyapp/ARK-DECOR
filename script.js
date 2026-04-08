// ============================================
//   ARK DECOR — Main JavaScript
//   script.js
// ============================================

"use strict";

// ---- CONFIG ----
const OWNER_WHATSAPP = "918452099537";
const OWNER_CITY = "Mumbai";
const CURRENCY = "₹";
const CURRENCY_LABEL = "INR";

// ---- STATE ----
let wishlist = JSON.parse(localStorage.getItem("ark_wishlist")) || [];
let currentCategory = "all";
let currentSearch = "";
let currentSort = "newest";
let filteredProducts = [...PRODUCTS];
let quickViewProduct = null;
let galleryImages = [];
let lightboxIndex = 0;

// ============================================
//   INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCursor();
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
});

// ============================================
//   PRELOADER
// ============================================
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const body = document.body;

  setTimeout(() => {
    preloader.classList.add("fade-out");
    body.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 800);
  }, 2400);
}

// ============================================
//   CUSTOM CURSOR
// ============================================
function initCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (!dot || !ring) return;

  // Hide on touch devices
  if ("ontouchstart" in window) {
    dot.style.display = "none";
    ring.style.display = "none";
    return;
  }

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

  const hoverTargets = "a, button, .product-card, .filter-btn, .gallery-item, .social-icon, .nav-action-btn, .wishlist-btn, .modal-close, .scroll-top, input, textarea, select";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add("hovering");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove("hovering");
    }
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
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
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll handler
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll top button
    const scrollTopBtn = document.getElementById("scrollTop");
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }

    updateActiveNavLink();
  }, { passive: true });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = ["home", "shop", "about", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = id;
      }
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.section === current) {
      link.classList.add("active");
    }
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
    const isOpen = mobileMenu.classList.contains("active");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      closeMobileMenu();
      if (href && href.startsWith("#")) {
        e.preventDefault();
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 400);
      }
    });
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

function openMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.classList.add("active");
  mobileMenu.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
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

  searchClose.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  navSearchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();
    currentSearch = val;
    // Scroll to shop and filter
    if (val.length > 0) {
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        const top = shopSection.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // Sync with shop search
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

  // Category filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Search
  const shopSearch = document.getElementById("shopSearch");
  if (shopSearch) {
    shopSearch.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Sort
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

  // Category filter
  if (currentCategory !== "all") {
    result = result.filter(p => p.category === currentCategory);
  }

  // Search filter
  if (currentSearch.length > 0) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      p.categoryLabel.toLowerCase().includes(currentSearch)
    );
  }

  // Sort
  switch (currentSort) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
    default:
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
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

  // Bind card events
  bindProductCardEvents();
}

function createProductCard(p, index) {
  const isWishlisted = wishlist.some(w => w.id === p.id);
  const stars = renderStars(p.rating);
  const badgeClass = getBadgeClass(p.badge);
  const delay = (index % 6) * 60;

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
          <span class="rating-count">${p.rating} (${p.reviews} reviews)</span>
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
    if (i <= Math.floor(rating)) {
      stars += `<i class="fas fa-star"></i>`;
    } else if (i - rating < 1 && i - rating > 0) {
      stars += `<i class="fas fa-star-half-alt"></i>`;
    } else {
      stars += `<i class="far fa-star empty"></i>`;
    }
  }
  return stars;
}

function getBadgeClass(badge) {
  switch (badge) {
    case "New Arrival": return "badge-new";
    case "Premium": return "badge-premium";
    case "Custom": return "badge-custom";
    case "Bestseller": return "badge-bestseller";
    default: return "badge-bestseller";
  }
}

function bindProductCardEvents() {
  // Wishlist buttons
  document.querySelectorAll(".product-wishlist").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id, btn);
    });
  });

  // Quick View buttons
  document.querySelectorAll(".product-quick-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      openQuickView(id);
    });
  });

  // Product image click → Quick View
  document.querySelectorAll(".product-img-wrap").forEach(wrap => {
    wrap.addEventListener("click", (e) => {
      if (!e.target.closest(".product-wishlist") && !e.target.closest(".product-quick-view")) {
        const card = wrap.closest(".product-card");
        if (card) {
          const id = parseInt(card.dataset.id);
          openQuickView(id);
        }
      }
    });
  });

  // Order buttons
  document.querySelectorAll(".product-order-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
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
    `Please share availability and delivery details for ${OWNER_CITY} or my location.\n\nThank you!`
  );
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;
  window.open(url, "_blank");
}

function getUserCity() {
  const savedCity = localStorage.getItem("ark_user_city");
  if (savedCity) return savedCity;

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

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeQuickView();
  });

  closeBtn.addEventListener("click", closeQuickView);

  orderBtn.addEventListener("click", () => {
    if (quickViewProduct) {
      orderViaWhatsApp(quickViewProduct);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeQuickView();
    }
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

  const ratingEl = document.getElementById("modalRating");
  ratingEl.innerHTML = `
    <div class="stars">${renderStars(product.rating)}</div>
    <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
  `;

  const specsList = document.getElementById("modalSpecs");
  specsList.innerHTML = product.specs.map(s => `<li>${s}</li>`).join("");

  const overlay = document.getElementById("quickViewOverlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const overlay = document.getElementById("quickViewOverlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  quickViewProduct = null;
}

// ============================================
//   WISHLIST
// ============================================
function initWishlist() {
  const wishlistToggle = document.getElementById("wishlistToggle");
  const wishlistOverlay = document.getElementById("wishlistOverlay");
  const wishlistClose = document.getElementById("wishlistClose");

  if (!wishlistToggle || !wishlistOverlay) return;

  wishlistToggle.addEventListener("click", openWishlist);
  wishlistClose.addEventListener("click", closeWishlist);

  wishlistOverlay.addEventListener("click", (e) => {
    if (e.target === wishlistOverlay) closeWishlist();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wishlistOverlay.classList.contains("active")) {
      closeWishlist();
    }
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
    showToast(`Removed from wishlist`, "info", "fas fa-heart-broken");
  } else {
    wishlist.push(product);
    btn.classList.add("active");
    btn.innerHTML = `<i class="fas fa-heart"></i>`;
    showToast(`Added to wishlist: ${product.name}`, "success", "fas fa-heart");

    // Bump badge
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

    // Remove buttons
    itemsContainer.querySelectorAll(".wishlist-item-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        wishlist = wishlist.filter(w => w.id !== id);
        localStorage.setItem("ark_wishlist", JSON.stringify(wishlist));
        updateWishlistBadge();
        openWishlist(); // Re-render

        // Update card wishlist button
        const cardBtn = document.querySelector(`.product-wishlist[data-id="${id}"]`);
        if (cardBtn) {
          cardBtn.classList.remove("active");
          cardBtn.innerHTML = `<i class="far fa-heart"></i>`;
        }

        showToast("Removed from wishlist", "info", "fas fa-heart-broken");
      });
    });
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeWishlist() {
  const overlay = document.getElementById("wishlistOverlay");
  overlay.classList.remove("active");
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
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target);
        observer.unobserve(el);
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
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString("en-IN");
    }
  }

  requestAnimationFrame(update);
}

// ============================================
//   TESTIMONIALS SWIPER
// ============================================
function initTestimonials() {
  const swiperEl = document.querySelector(".testimonials-swiper");
  if (!swiperEl || typeof Swiper === "undefined") return;

  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 28,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      prevEl: ".testimonial-prev",
      nextEl: ".testimonial-next"
    },
    pagination: {
      el: ".testimonial-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 1.5
      },
      900: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    },
    grabCursor: true
  });
}

// ============================================
//   GALLERY
// ============================================
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryImages = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    if (img) {
      galleryImages.push({
        src: img.src,
        alt: img.alt
      });
    }

    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });
}

// ============================================
//   LIGHTBOX
// ============================================
function initLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!overlay) return;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  });
  nextBtn.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    updateLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
      updateLightbox();
    }
  });
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  const overlay = document.getElementById("lightboxOverlay");
  overlay.classList.add("active");
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
  const overlay = document.getElementById("lightboxOverlay");
  overlay.classList.remove("active");
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

    const whatsappMessage = encodeURIComponent(
      `Hi ARK Decor! My name is ${name}.\n\n${message}` +
      (phone ? `\n\nContact: ${phone}` : "")
    );

    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${whatsappMessage}`;
    window.open(url, "_blank");

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

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
//   FOOTER LINKS — Category Shortcut
// ============================================
function initFooterLinks() {
  const footerCatLinks = document.querySelectorAll("[data-filter]");
  footerCatLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.dataset.filter;
      currentCategory = category;

      // Update filter buttons
      const filterBtns = document.querySelectorAll(".filter-btn");
      filterBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
      });

      applyFilters();

      // Scroll to shop
      setTimeout(() => {
        const shop = document.getElementById("shop");
        if (shop) {
          const top = shop.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    });
  });
}

// ============================================
//   AOS INIT
// ============================================
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      delay: 0
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
  toast.innerHTML = `
    <i class="toast-icon ${iconClass}"></i>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
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
    }, 500);
  }, 3500);
}

// ============================================
//   SMOOTH SECTION ANCHOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ============================================
//   PERFORMANCE: PASSIVE TOUCH EVENTS
// ============================================
document.addEventListener("touchstart", () => {}, { passive: true });
document.addEventListener("touchmove", () => {}, { passive: true });
