// ============================================================
// bst.js
// Data Structure Implementation - Book Recommendation System
// Data Structure: Binary Search Tree (BST)
// Purpose: Organize books by rating so we can retrieve
//          top-rated books or search by rating efficiently
//          without re-sorting every time.
// Time Complexity: Insert O(log n) avg / O(n) worst
//                  Search O(log n) avg / O(n) worst
//                  In-order traversal O(n)
// Space Complexity: O(n)
// ============================================================

class BSTNode {
  constructor(book) {
    this.book = book;       // the full book object stored at this node
    this.left = null;       // lower rating
    this.right = null;      // higher rating
  }
}

class BookBST {
  constructor() {
    this.root = null;
  }

  /**
   * Inserts a book into the tree, positioned by its rating.
   * Books with a lower rating go left, higher rating go right.
   * @param {Object} book - must have a numeric rating field
   */
  insert(book) {
    const newNode = new BSTNode(book);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (book.rating < current.book.rating) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  /**
   * Searches for a book by exact rating.
   * Each step discards half the remaining tree, same principle as binary search.
   * @param {number} rating
   * @returns {Object|null}
   */
  search(rating) {
    let current = this.root;
    while (current) {
      if (rating === current.book.rating) return current.book;
      current = rating < current.book.rating ? current.left : current.right;
    }
    return null;
  }

  /**
   * Returns all books sorted ascending by rating (in-order traversal).
   * @returns {Array}
   */
  inOrder() {
    const result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      result.push(node.book);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /**
   * Returns the top N highest-rated books (reverse in-order traversal).
   * @param {number} n
   * @returns {Array}
   */
  getTopRated(n = 5) {
    const result = [];
    function traverse(node) {
      if (!node || result.length >= n) return;
      traverse(node.right);          // visit higher ratings first
      if (result.length < n) result.push(node.book);
      traverse(node.left);
    }
    traverse(this.root);
    return result;
  }

  /**
   * Returns books within a rating range [min, max], ascending.
   * Skips branches that can't possibly contain a match — this is
   * what keeps range queries faster than scanning every node.
   * @param {number} min
   * @param {number} max
   * @returns {Array}
   */
  getInRange(min, max) {
    const result = [];
    function traverse(node) {
      if (!node) return;
      if (node.book.rating > min) traverse(node.left);
      if (node.book.rating >= min && node.book.rating <= max) result.push(node.book);
      if (node.book.rating < max) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }
}

// ============================================================
// EXPORTS (for use in the main project)
// ============================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BookBST };
}