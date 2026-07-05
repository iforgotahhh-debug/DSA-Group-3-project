// ============================================================
// algorithms.js
// Correct Algorithm Implementation - Book Recommendation System
// Algorithms: Binary Search & Merge Sort
// ============================================================


// ============================================================
// MERGE SORT
// Purpose: Sort books by rating (or any numeric field)
// Time Complexity: O(n log n)
// Space Complexity: O(n)
// ============================================================

/**
 * Splits the array in half, sorts each half, then merges them back.
 * @param {Array} books - Array of book objects
 * @param {string} key - The field to sort by e.g. "rating", "year"
 * @returns {Array} - Sorted array of books
 */
function mergeSort(books, key = "rating") {
  // Base case: array of 0 or 1 is already sorted
  if (books.length <= 1) return books;

  // Find the midpoint and split into left and right halves
  const mid = Math.floor(books.length / 2);
  const left = mergeSort(books.slice(0, mid), key);
  const right = mergeSort(books.slice(mid), key);

  return merge(left, right, key);
}

/**
 * Merges two sorted arrays into one sorted array.
 * @param {Array} left - Left sorted half
 * @param {Array} right - Right sorted half
 * @param {string} key - Field to compare on
 * @returns {Array} - Merged sorted array
 */
function merge(left, right, key) {
  const result = [];
  let i = 0;
  let j = 0;

  // Compare elements from both halves and push the larger one first (descending)
  while (i < left.length && j < right.length) {
    if (left[i][key] >= right[j][key]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append any remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}


// ============================================================
// BINARY SEARCH
// Purpose: Search for a book by a specific field value
//          in a SORTED array
// Time Complexity: O(log n)
// Space Complexity: O(1)
// Prerequisite: Array must be sorted before searching
// ============================================================

/**
 * Searches for a book by an exact field value in a sorted array.
 * @param {Array} sortedBooks - Array of books already sorted by `key`
 * @param {*} target - The value to search for
 * @param {string} key - The field to search on e.g. "rating", "year"
 * @returns {Object|null} - The matched book object, or null if not found
 */
function binarySearch(sortedBooks, target, key = "rating") {
  let low = 0;
  let high = sortedBooks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = sortedBooks[mid][key];

    if (midVal === target) {
      return sortedBooks[mid]; // Found
    } else if (midVal > target) {
      low = mid + 1; // Target is in the lower half (array is descending)
    } else {
      high = mid - 1; // Target is in the upper half
    }
  }

  return null; // Not found
}


// ============================================================
// USAGE EXAMPLE
// ============================================================

const books = [
  { title: "The Alchemist",       author: "Paulo Coelho",    genre: "Fiction",    rating: 4.2, year: 1988 },
  { title: "Atomic Habits",       author: "James Clear",     genre: "Self-Help",  rating: 4.8, year: 2018 },
  { title: "1984",                author: "George Orwell",   genre: "Dystopian",  rating: 4.7, year: 1949 },
  { title: "Sapiens",             author: "Yuval Noah",      genre: "History",    rating: 4.5, year: 2011 },
  { title: "The Great Gatsby",    author: "F. Scott",        genre: "Classic",    rating: 3.9, year: 1925 },
  { title: "Deep Work",           author: "Cal Newport",     genre: "Self-Help",  rating: 4.6, year: 2016 },
];

// Step 1: Sort books by rating using Merge Sort
const sortedBooks = mergeSort(books, "rating");

console.log("=== Books Sorted by Rating (Descending) ===");
sortedBooks.forEach(b => console.log(`${b.rating} - ${b.title}`));

// Step 2: Search for a book with rating 4.7 using Binary Search
const found = binarySearch(sortedBooks, 4.7, "rating");

console.log("\n=== Binary Search Result (rating = 4.7) ===");
console.log(found ? `Found: ${found.title} by ${found.author}` : "Book not found");


// ============================================================
// EXPORTS (for use in the main project)
// ============================================================

module.exports = { mergeSort, binarySearch };