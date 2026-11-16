/**
 * Part E — Performance Optimization & DOM Events
 * QuickCart Order Management System
 */

// ==========================================
// Mock Product Catalog for Live Search
// ==========================================
const catalog = [
  { id: 1, name: "Apple MacBook Pro M3", category: "Laptops", price: 199900 },
  { id: 2, name: "Dell XPS 15", category: "Laptops", price: 135000 },
  { id: 3, name: "Logitech MX Master 3S", category: "Accessories", price: 8995 },
  { id: 4, name: "Keychron K2 Mechanical Keyboard", category: "Accessories", price: 7499 },
  { id: 5, name: "LG UltraFine 4K Monitor", category: "Monitors", price: 34999 },
  { id: 6, name: "Sony WH-1000XM5 Headphones", category: "Audio", price: 26990 },
  { id: 7, name: "Bose QuietComfort 45", category: "Audio", price: 22900 },
  { id: 8, name: "Anker USB-C Hub 8-in-1", category: "Accessories", price: 4299 }
];

// ==========================================
// Task 1 — Debouncing
// ==========================================
/**
 * Debounce function: delays invoking callback until after delay ms
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */
function debounce(callback, delay) {
  let timerId = null;

  return function (...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback.apply(this, args);
      timerId = null;
    }, delay);
  };
}

// Attach debounce to search input with 500 ms delay
const searchInput = document.getElementById("search-input");
const keystrokeCountEl = document.getElementById("keystroke-count");
const searchTriggerCountEl = document.getElementById("search-trigger-count");
const searchResultsEl = document.getElementById("search-results");
const debounceBadgeEl = document.getElementById("debounce-status-badge");

let keystrokes = 0;
let debouncedTriggers = 0;

function executeSearch(query) {
  debouncedTriggers++;
  if (searchTriggerCountEl) searchTriggerCountEl.textContent = debouncedTriggers;
  if (debounceBadgeEl) {
    debounceBadgeEl.textContent = "Query Dispatched";
    debounceBadgeEl.className = "badge badge-success";
    setTimeout(() => {
      debounceBadgeEl.textContent = "Waiting for Input";
      debounceBadgeEl.className = "badge";
    }, 1200);
  }

  console.log(`[Debounce] Search query executed for: "${query}" (Trigger count: ${debouncedTriggers})`);

  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    searchResultsEl.innerHTML = `<div style="color: #94a3b8; font-style: italic;">No search query entered. Showing empty result.</div>`;
    return;
  }

  const matches = catalog.filter(
    item =>
      item.name.toLowerCase().includes(trimmed) ||
      item.category.toLowerCase().includes(trimmed)
  );

  if (matches.length === 0) {
    searchResultsEl.innerHTML = `<div style="color: #ef4444;">No products found matching "${query}".</div>`;
  } else {
    searchResultsEl.innerHTML = matches
      .map(
        item =>
          `<div class="result-item"><strong>${item.name}</strong> (${item.category}) — ₹${item.price.toLocaleString("en-IN")}</div>`
      )
      .join("");
  }
}

const debouncedSearch = debounce(executeSearch, 500);

if (searchInput) {
  searchInput.addEventListener("input", event => {
    keystrokes++;
    if (keystrokeCountEl) keystrokeCountEl.textContent = keystrokes;
    if (debounceBadgeEl) {
      debounceBadgeEl.textContent = "Typing (debouncing...)";
      debounceBadgeEl.className = "badge";
    }
    debouncedSearch(event.target.value);
  });
}

// ==========================================
// Task 2 — Throttling
// ==========================================
/**
 * Throttle function: enforces a maximum execution frequency of at most once
 * per specified interval (delay in ms).
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */
function throttle(callback, delay) {
  let lastExecutionTime = 0;
  let timerId = null;

  return function (...args) {
    const currentTime = Date.now();
    const timeRemaining = delay - (currentTime - lastExecutionTime);

    if (timeRemaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastExecutionTime = currentTime;
      callback.apply(this, args);
    } else if (!timerId) {
      // Trailing edge execution
      timerId = setTimeout(() => {
        lastExecutionTime = Date.now();
        timerId = null;
        callback.apply(this, args);
      }, timeRemaining);
    }
  };
}

// Attach throttle to scroll event with 1000 ms interval
const scrollBox = document.getElementById("scroll-box");
const rawScrollCountEl = document.getElementById("raw-scroll-count");
const throttledScrollCountEl = document.getElementById("throttled-scroll-count");
const throttleBadgeEl = document.getElementById("throttle-status-badge");

let rawScrollEvents = 0;
let throttledExecutions = 0;

function handleThrottledScroll(scrollTop) {
  throttledExecutions++;
  if (throttledScrollCountEl) throttledScrollCountEl.textContent = throttledExecutions;
  if (throttleBadgeEl) {
    throttleBadgeEl.textContent = "Throttled Ping";
    throttleBadgeEl.className = "badge badge-success";
    setTimeout(() => {
      throttleBadgeEl.textContent = "Monitoring";
      throttleBadgeEl.className = "badge";
    }, 600);
  }

  console.log(
    `[Throttle 1000ms] Scroll callback executed at ${new Date().toLocaleTimeString()} | Position: ${Math.round(
      scrollTop
    )}px | Executions: ${throttledExecutions}`
  );
}

const throttledScrollHandler = throttle(handleThrottledScroll, 1000);

if (scrollBox) {
  scrollBox.addEventListener("scroll", () => {
    rawScrollEvents++;
    if (rawScrollCountEl) rawScrollCountEl.textContent = rawScrollEvents;
    throttledScrollHandler(scrollBox.scrollTop);
  });
}

// ==========================================
// Task 3 — Memoization
// ==========================================
/**
 * Pure calculation function for discount
 * @param {number} price
 * @param {number} percentage
 * @returns {number}
 */
function calculateDiscount(price, percentage) {
  return price - price * (percentage / 100);
}

/**
 * Memoize wrapper using closure over cache Map
 * @param {Function} fn
 * @returns {Function}
 */
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    // Generate cache key from serialized arguments
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`[Memoize CACHE HIT] Key: "${key}" -> Result returned from cache.`);
      return { result: cache.get(key), isFromCache: true, key };
    }

    console.log(`[Memoize CACHE MISS] Key: "${key}" -> Fresh calculation executed.`);
    const computedResult = fn(...args);
    cache.set(key, computedResult);
    return { result: computedResult, isFromCache: false, key };
  };
}

const memoizedDiscount = memoize(calculateDiscount);

// Connect UI for Memoization
const memoPriceInput = document.getElementById("memo-price");
const memoDiscountInput = document.getElementById("memo-discount");
const btnCalcDiscount = document.getElementById("btn-calc-discount");
const btnQuickRepeat = document.getElementById("btn-quick-repeat");
const memoFreshCountEl = document.getElementById("memo-fresh-count");
const memoCacheCountEl = document.getElementById("memo-cache-count");
const memoResultDisplay = document.getElementById("memo-result-display");
const memoBadgeEl = document.getElementById("memo-status-badge");

let freshCalcs = 0;
let cacheHits = 0;

function runMemoTest() {
  const price = Number(memoPriceInput.value);
  const discount = Number(memoDiscountInput.value);

  const { result, isFromCache, key } = memoizedDiscount(price, discount);

  if (isFromCache) {
    cacheHits++;
    if (memoCacheCountEl) memoCacheCountEl.textContent = cacheHits;
    if (memoBadgeEl) {
      memoBadgeEl.textContent = "Cache Hit";
      memoBadgeEl.className = "badge badge-success";
    }
  } else {
    freshCalcs++;
    if (memoFreshCountEl) memoFreshCountEl.textContent = freshCalcs;
    if (memoBadgeEl) {
      memoBadgeEl.textContent = "Fresh Computed";
      memoBadgeEl.className = "badge";
    }
  }

  if (memoResultDisplay) {
    memoResultDisplay.innerHTML = `
      <strong>Final Price: ₹${result.toLocaleString("en-IN")}</strong>
      <span style="display:block; font-size: 0.8rem; margin-top: 4px; color: ${isFromCache ? "#16a34a" : "#2563eb"};">
        Source: ${isFromCache ? "💾 CACHE HIT (retrieved in 0ms)" : "⚡ FRESH COMPUTATION (stored in cache)"} | Args: ${key}
      </span>
    `;
  }
}

if (btnCalcDiscount) {
  btnCalcDiscount.addEventListener("click", runMemoTest);
}

if (btnQuickRepeat) {
  btnQuickRepeat.addEventListener("click", () => {
    runMemoTest();
    setTimeout(runMemoTest, 100);
    setTimeout(runMemoTest, 200);
  });
}

// ==========================================
// Task 4 — Event Bubbling & Delegation
// ==========================================
const initialProducts = [
  { id: "prod-101", name: "Apple MacBook Pro M3", category: "Laptops", price: 199900 },
  { id: "prod-102", name: "Sony WH-1000XM5 Headphones", category: "Audio", price: 26990 },
  { id: "prod-103", name: "Apple Magic Keyboard", category: "Accessories", price: 9500 }
];

const productsListEl = document.getElementById("products-list");
const productListContainer = document.getElementById("product-list-container");
const toggleStopProp = document.getElementById("toggle-stop-propagation");
const eventsTerminal = document.getElementById("events-terminal");
const btnResetProducts = document.getElementById("btn-reset-products");
const btnClearLogs = document.getElementById("btn-clear-logs");

function logTerminal(message, type = "info") {
  console.log(`[Event Lab] ${message}`);
  if (!eventsTerminal) return;
  const line = document.createElement("div");
  line.className = `terminal-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  eventsTerminal.appendChild(line);
  eventsTerminal.scrollTop = eventsTerminal.scrollHeight;
}

// Render product list dynamically
function renderProducts() {
  if (!productsListEl) return;
  productsListEl.innerHTML = "";
  initialProducts.forEach(prod => {
    const itemEl = document.createElement("div");
    itemEl.className = "product-item";
    itemEl.id = prod.id;
    itemEl.innerHTML = `
      <div class="product-info">
        <h4>${prod.name}</h4>
        <p>${prod.category} • ₹${prod.price.toLocaleString("en-IN")}</p>
      </div>
      <button class="btn btn-danger btn-remove" data-id="${prod.id}" data-name="${prod.name}">
        Remove
      </button>
    `;
    productsListEl.appendChild(itemEl);
  });
  logTerminal("Product list rendered (3 items). Ready for event bubbling / delegation testing.", "info");
}

renderProducts();

// 1. Child Button Click Listener: Demonstrating stopPropagation()
// Attached directly or via document capture to demonstrate stopPropagation
document.addEventListener(
  "click",
  event => {
    const removeBtn = event.target.closest(".btn-remove");
    if (!removeBtn) return;

    const shouldStop = toggleStopProp && toggleStopProp.checked;
    logTerminal(
      `CHILD CLICK DETECTED on <${event.target.tagName}> "${removeBtn.dataset.name}". StopPropagation = ${shouldStop}`,
      "warning"
    );

    if (shouldStop) {
      event.stopPropagation();
      logTerminal(
        `⛔ event.stopPropagation() called! Bubbling halted. Parent container listener will NOT be notified!`,
        "danger"
      );
      // Even though propagation stopped to parent, remove element to show visual outcome
      const itemRow = removeBtn.closest(".product-item");
      if (itemRow) itemRow.remove();
    }
  },
  false
);

// 2. Parent Container Delegated Listener
if (productListContainer) {
  productListContainer.addEventListener("click", event => {
    logTerminal(
      `PARENT CONTAINER HEARD EVENT: Bubbled to <${event.currentTarget.tagName} id="${event.currentTarget.id}"> from target <${event.target.tagName}>`,
      "success"
    );

    // Event Delegation: Check if the clicked target was a Remove button
    const removeBtn = event.target.closest(".btn-remove");
    if (removeBtn && productListContainer.contains(removeBtn)) {
      const productId = removeBtn.dataset.id;
      const productName = removeBtn.dataset.name;
      const productRow = document.getElementById(productId);

      if (productRow) {
        productRow.remove();
        logTerminal(
          `DELEGATION SUCCESS: Removed "${productName}" [ID: ${productId}] using single parent container listener.`,
          "success"
        );
      }
    }
  });
}

// Reset and Clear buttons
if (btnResetProducts) {
  btnResetProducts.addEventListener("click", () => {
    renderProducts();
    logTerminal("Products reset. Dynamically recreated elements immediately inherit delegation listener!", "info");
  });
}

if (btnClearLogs) {
  btnClearLogs.addEventListener("click", () => {
    if (eventsTerminal) eventsTerminal.innerHTML = "";
  });
}
