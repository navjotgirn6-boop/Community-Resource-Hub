"use strict";

/*
 * Community Resource Hub
 * Client-side only
 * No frameworks, APIs, databases, or external dependencies.
 */

/* =========================================================
   MOCK RESOURCE DATA
   ========================================================= */

const resources = [
  {
    id: 1,
    name: "Springfield Community Shelter",
    category: "Shelters",
    address: "1350 E St. Louis St, Springfield, MO",
    status: "Open",
    phone: "417-555-0101",
    details:
      "Emergency overnight shelter with beds, blankets, restrooms, and basic supplies. Families and individuals welcome."
  },
  {
    id: 2,
    name: "Northside Emergency Shelter",
    category: "Shelters",
    address: "820 N Glenstone Ave, Springfield, MO",
    status: "Full",
    phone: "417-555-0102",
    details:
      "Currently at capacity. Call ahead for waitlist information and the next available opening."
  },
  {
    id: 3,
    name: "Community Food & Water Center",
    category: "Water/Food",
    address: "215 W Commercial St, Springfield, MO",
    status: "Open",
    phone: "417-555-0103",
    details:
      "Free bottled water, shelf-stable food, hygiene supplies, and emergency meal kits."
  },
  {
    id: 4,
    name: "Southside Relief Distribution",
    category: "Water/Food",
    address: "3025 S Kansas Expy, Springfield, MO",
    status: "Closing Soon",
    phone: "417-555-0104",
    details:
      "Food and bottled-water distribution. Last pickup is 30 minutes before closing."
  },
  {
    id: 5,
    name: "Downtown Charging Center",
    category: "Charging Stations",
    address: "1450 E Republic Rd, Springfield, MO",
    status: "Open",
    phone: "417-555-0105",
    details:
      "Indoor charging stations for phones and small personal electronics. Seating and Wi-Fi available."
  },
  {
    id: 6,
    name: "West Springfield Charging Hub",
    category: "Charging Stations",
    address: "1900 W Sunshine St, Springfield, MO",
    status: "Closing Soon",
    phone: "417-555-0106",
    details:
      "Public charging stations with limited seating. Bring your own charging cable."
  },
  {
    id: 7,
    name: "Mercy Emergency Medical Center",
    category: "Medical",
    address: "1235 E Cherokee St, Springfield, MO",
    status: "Open",
    phone: "417-555-0107",
    details:
      "Emergency medical services and urgent care support. Call 911 for life-threatening emergencies."
  },
  {
    id: 8,
    name: "Community Health Response Center",
    category: "Medical",
    address: "950 S Campbell Ave, Springfield, MO",
    status: "Open",
    phone: "417-555-0108",
    details:
      "Basic medical assessments, first-aid supplies, prescription assistance, and health information."
  },
  {
    id: 9,
    name: "Eastside Emergency Shelter",
    category: "Shelters",
    address: "2700 E Battlefield Rd, Springfield, MO",
    status: "Open",
    phone: "417-555-0109",
    details:
      "Temporary emergency shelter with sleeping areas, restrooms, water, and basic personal supplies."
  },
  {
    id: 10,
    name: "Battlefield Relief Station",
    category: "Water/Food",
    address: "3100 E Battlefield Rd, Springfield, MO",
    status: "Full",
    phone: "417-555-0110",
    details:
      "Emergency food and water distribution center. Supplies are currently limited."
  }
];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const resourceGrid = document.getElementById("resourceGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const resetFilters = document.getElementById("resetFilters");
const filterButtons = document.querySelectorAll(".filter-btn");


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let activeFilter = "All";
let searchTerm = "";


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

/**
 * Escape user-controlled text before inserting it into HTML.
 */
function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}


/**
 * Converts a resource status into a CSS-friendly class.
 */
function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "open":
      return "status-open";

    case "full":
      return "status-full";

    case "closing soon":
      return "status-closing";

    default:
      return "status-default";
  }
}


/**
 * Returns an appropriate symbol for each category.
 */
function getCategoryIcon(category) {
  switch (category) {
    case "Shelters":
      return "⌂";

    case "Water/Food":
      return "✚";

    case "Charging Stations":
      return "⚡";

    case "Medical":
      return "✚";

    default:
      return "•";
  }
}


/* =========================================================
   RESOURCE CARD
   ========================================================= */

function createResourceCard(resource) {
  const statusClass = getStatusClass(resource.status);
  const categoryIcon = getCategoryIcon(resource.category);

  return `
    <article class="resource-card">
      <div class="card-top">
        <div class="category-icon" aria-hidden="true">
          ${categoryIcon}
        </div>

        <span class="category-tag">
          ${escapeHTML(resource.category)}
        </span>

        <span class="status-badge ${statusClass}">
          <span class="status-dot" aria-hidden="true"></span>
          ${escapeHTML(resource.status)}
        </span>
      </div>

      <div class="card-body">
        <h3>${escapeHTML(resource.name)}</h3>

        <div class="resource-address">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12z"/>
            <circle cx="12" cy="9" r="2.2"/>
          </svg>

          <span>${escapeHTML(resource.address)}</span>
        </div>

        <div class="resource-details">
          <strong>Notes</strong>
          <p>${escapeHTML(resource.details)}</p>
        </div>
      </div>

      <div class="card-footer">
        <a
          class="call-button"
          href="tel:${escapeHTML(resource.phone)}"
          aria-label="Call ${escapeHTML(resource.name)}"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M6.6 3.5l3 3.8-1.8 2.3c1 2.1 2.6 3.6 4.7 4.7l2.3-1.8 3.8 3c.4.3.5.8.3 1.2-.6 1.4-1.8 2.2-3.4 2.2-1 0-2.1-.3-3.3-.8-5.4-2.4-9.5-6.5-11.9-11.9C5.4 4.8 5.1 3.7 5.1 2.7c0-1.6.8-2.8 2.2-3.4.4-.2.9-.1 1.2.3z"/>
          </svg>

          Call Resource
        </a>

        <span class="phone-number">
          ${escapeHTML(resource.phone)}
        </span>
      </div>
    </article>
  `;
}


/* =========================================================
   FILTERING
   ========================================================= */

function getFilteredResources() {
  return resources.filter((resource) => {
    const matchesCategory =
      activeFilter === "All" ||
      resource.category === activeFilter;

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return matchesCategory;
    }

    const searchableText = [
      resource.name,
      resource.category,
      resource.address,
      resource.status,
      resource.details
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchableText.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}


/* =========================================================
   RENDER RESOURCES
   ========================================================= */

function renderResources() {
  const filteredResources = getFilteredResources();

  resourceGrid.innerHTML = "";

  if (filteredResources.length === 0) {
    emptyState.hidden = false;
    resultCount.textContent = "0 resources";
    return;
  }

  emptyState.hidden = true;

  resourceGrid.innerHTML = filteredResources
    .map(createResourceCard)
    .join("");

  const count = filteredResources.length;

  resultCount.textContent =
    `${count} ${count === 1 ? "resource" : "resources"} found`;
}


/* =========================================================
   SEARCH
   ========================================================= */

function handleSearch(event) {
  searchTerm = event.target.value;
  renderResources();

  clearSearch.classList.toggle(
    "visible",
    searchTerm.length > 0
  );
}


/* =========================================================
   CATEGORY FILTERS
   ========================================================= */

function handleFilterClick(event) {
  const clickedButton = event.currentTarget;

  activeFilter = clickedButton.dataset.filter;

  filterButtons.forEach((button) => {
    const isActive =
      button.dataset.filter === activeFilter;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderResources();
}


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

function handleClearSearch() {
  searchInput.value = "";
  searchTerm = "";

  clearSearch.classList.remove("visible");

  searchInput.focus();

  renderResources();
}


/* =========================================================
   RESET EVERYTHING
   ========================================================= */

function handleResetFilters() {
  activeFilter = "All";
  searchTerm = "";

  searchInput.value = "";

  clearSearch.classList.remove("visible");

  filterButtons.forEach((button) => {
    const isActive =
      button.dataset.filter === "All";

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderResources();
}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", (event) => {
  /*
   * Press "/" to jump directly to search.
   */
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    event.preventDefault();
    searchInput.focus();
  }

  /*
   * Press Escape to clear search.
   */
  if (
    event.key === "Escape" &&
    document.activeElement === searchInput &&
    searchTerm.length > 0
  ) {
    handleClearSearch();
  }
});


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

searchInput.addEventListener("input", handleSearch);

clearSearch.addEventListener(
  "click",
  handleClearSearch
);

resetFilters.addEventListener(
  "click",
  handleResetFilters
);

filterButtons.forEach((button) => {
  button.addEventListener(
    "click",
    handleFilterClick
  );
});


/* =========================================================
   INITIALIZE APPLICATION
   ========================================================= */

renderResources();
