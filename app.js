// ============================================================
// app.js
// Ties the UI to the real backend: HashTable, BST, Merge Sort, Binary Search
// No external API, no database — everything runs client-side over BOOKS.
// ============================================================

// ---- Initialize data structures from the in-memory dataset ----
const bookStorage = new HashTable();   // O(1) average lookup by book ID
const ratingTree = new BookBST();      // organizes books by rating

BOOKS.forEach(book => {
  bookStorage.set(book.id, book);      // insert into hash table
  ratingTree.insert(book);             // insert into BST
});

let currentBooks = ratingTree.getTopRated(6); // default view: top rated, via BST
let filterQuery = "";

const coverBgs = ["#1E1828", "#182018", "#201A10", "#0E1A1A", "#1A1020"];
function getBg(title) {
  return coverBgs[title.charCodeAt(0) % coverBgs.length];
}

// Stylized library call-number tag, derived from genre + id (decorative, not real Dewey data)
const GENRE_PREFIX = {
  "Sci-Fi": "813.9", "Fantasy": "823.9", "Dystopian": "813.5", "History": "909",
  "Self-Help": "158", "Classic": "813.2", "Fiction": "813", "Thriller": "813.6",
  "Magical Realism": "863", "Memoir": "921"
};
function callNumber(book) {
  const prefix = GENRE_PREFIX[book.genre] || "800";
  return `${book.genre.slice(0, 3).toUpperCase()} ${prefix}`;
}

const spineColors = ["#8B3A2A", "#2E5339", "#3A4A6B", "#7A5C2E", "#5C3A5C", "#2E5C5C", "#6B3A3A"];

// ---- Bookshelf hero: signature visual element, built from the same dataset ----
function renderShelf() {
  const shelf = document.getElementById("shelf");
  if (!shelf) return;
  shelf.innerHTML = "";
  BOOKS.forEach((book, i) => {
    const spine = document.createElement("div");
    spine.className = "spine";
    const height = 130 + (book.rating - 3.5) * 30; // taller spine = higher rating
    spine.style.height = `${Math.round(height)}px`;
    spine.style.background = spineColors[i % spineColors.length];
    spine.style.animationDelay = `${i * 0.05}s`;
    spine.title = `${book.title} — ${book.rating}★`;
    spine.onclick = () => openDetail(book.id);
    spine.innerHTML = `<span class="spine-label">${book.title}</span>`;
    shelf.appendChild(spine);
  });
}

// ---- Rendering ----
function renderBooks(books) {
  const container = document.getElementById("booksContainer");
  container.innerHTML = "";

  const filtered = filterQuery
    ? books.filter(b => {
        const q = filterQuery.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.genre || "").toLowerCase().includes(q)
        );
      })
    : books;

  if (filtered.length === 0) {
    container.innerHTML = `<p class="status-text">No books match "${filterQuery}".</p>`;
    return;
  }

  filtered.forEach(book => {
    const bg = getBg(book.title);
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <div class="book-cover" style="background:${bg}">
        <img src="${book.cover}" alt="${book.title}" loading="lazy" onerror="this.style.display='none'">
        <span class="call-number">${callNumber(book)}</span>
      </div>
      <div class="book-body">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author} &middot; ${book.rating}\u2605</div>
        <p class="book-reason">${book.reason}</p>
        <button class="btn-details" onclick="openDetail('${book.id}')">View details</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function onFilter() {
  filterQuery = document.getElementById("filterInput").value.trim();
  document.getElementById("filterClear").style.display = filterQuery ? "block" : "none";
  renderBooks(currentBooks);
}

function clearFilter() {
  document.getElementById("filterInput").value = "";
  filterQuery = "";
  document.getElementById("filterClear").style.display = "none";
  renderBooks(currentBooks);
}

// ---- Detail overlay: demonstrates O(1) Hash Table lookup ----
function openDetail(id) {
  const book = bookStorage.get(id); // <-- real O(1) average hash table lookup
  console.log(`HashTable.get("${id}") -> O(1) average lookup:`, book);

  document.getElementById("detailGenre").textContent = book.genre || "Fiction";
  document.getElementById("detailTitle").textContent = book.title;
  document.getElementById("detailAuthor").textContent = `${book.author} (${book.year})`;
  document.getElementById("detailReason").textContent = book.reason;
  document.getElementById("detailImg").src = book.cover;

  document.getElementById("overlay").classList.add("open");
}

function closeOverlay() {
  document.getElementById("overlay").classList.remove("open");
}

function closeOverlayOnBg(e) {
  if (e.target === document.getElementById("overlay")) closeOverlay();
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeOverlay();
});

// ---- Recommend: demonstrates Merge Sort + Binary Search ----
function fillAndSearch(query) {
  document.getElementById("recommendInput").value = query;
  getRecommendations();
}

function getRecommendations() {
  const query = document.getElementById("recommendInput").value.trim().toLowerCase();
  const label = document.getElementById("sectionLabel");

  if (!query) return;

  // Step 1: filter candidates by keyword match against genre/title/reason
  const candidates = BOOKS.filter(b =>
    b.genre.toLowerCase().includes(query) ||
    b.title.toLowerCase().includes(query) ||
    b.reason.toLowerCase().includes(query) ||
    query.split(" ").some(word => b.genre.toLowerCase().includes(word))
  );

  const pool = candidates.length > 0 ? candidates : BOOKS;

  // Step 2: rank the pool using our own Merge Sort (O(n log n))
  const ranked = mergeSort([...pool], "rating");
  console.log("mergeSort() ranked candidates by rating:", ranked.map(b => `${b.title} (${b.rating})`));

  // Step 3: demonstrate Binary Search — find the top-rated book's exact rating in the ranked list
  const topRating = ranked[0].rating;
  const found = binarySearch(ranked, topRating, "rating");
  console.log(`binarySearch() confirmed top match at rating ${topRating}:`, found?.title);

  currentBooks = ranked.slice(0, 3);
  filterQuery = "";
  document.getElementById("filterInput").value = "";
  label.textContent = `Results for "${query.length > 45 ? query.slice(0, 45) + "…" : query}"`;
  renderBooks(currentBooks);
}

// ---- Top Rated shortcut: demonstrates BST traversal ----
function showTopRated() {
  currentBooks = ratingTree.getTopRated(6); // real BST traversal, highest ratings first
  filterQuery = "";
  document.getElementById("filterInput").value = "";
  document.getElementById("sectionLabel").textContent = "Top rated (via Binary Search Tree)";
  renderBooks(currentBooks);
}

document.getElementById("recommendInput").addEventListener("keydown", e => {
  if (e.key === "Enter") getRecommendations();
});

// ---- init ----
renderShelf();
renderBooks(currentBooks);