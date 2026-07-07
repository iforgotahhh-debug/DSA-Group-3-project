// ============================================================
// algorithms.js
// Algorithm Implementation - Book Recommendation System
// Algorithms: Merge Sort & Binary Search
// ============================================================

// ============================================================
// MERGE SORT
// Purpose: Sort books by rating (or any numeric field)
// Time Complexity: O(n log n)
// Space Complexity: O(n)
// ============================================================

function mergeSort(books, key = "rating") {
  if (books.length <= 1) return books;

  const mid = Math.floor(books.length / 2);
  const left = mergeSort(books.slice(0, mid), key);
  const right = mergeSort(books.slice(mid), key);

  return merge(left, right, key);
}

function merge(left, right, key) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i][key] >= right[j][key]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============================================================
// BINARY SEARCH
// Purpose: Search for a book by a specific field value
//          in a SORTED array
// Time Complexity: O(log n)
// Space Complexity: O(1)
// Prerequisite: Array must be sorted (descending) before searching
// ============================================================

function binarySearch(sortedBooks, target, key = "rating") {
  let low = 0;
  let high = sortedBooks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = sortedBooks[mid][key];

    if (midVal === target) {
      return sortedBooks[mid];
    } else if (midVal > target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null;
}

// ============================================================
// EXPORTS
// ============================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = { mergeSort, binarySearch };
}