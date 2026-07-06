
// ============================================================
// hashTable.js
// Data Structure Implementation - Book Recommendation System
// Member: Nicole
// Data Structure: Hash Table
// ============================================================


// ============================================================
// HASH TABLE IMPLEMENTATION
// Purpose: Store and retrieve book & user data in O(1) time
// Time Complexity: Insert O(1), Lookup O(1), Delete O(1)
// Space Complexity: O(n)
// ============================================================

class HashTable {
  /**
   * Creates a hash table with a fixed number of buckets
   * @param {number} size - Number of buckets (default 53, a prime number reduces collisions)
   */
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
  }

  /**
   * Hash function: converts a string key into an array index
   * @param {string} key
   * @returns {number} - Index between 0 and size-1
   */
  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  /**
   * Inserts or updates a key-value pair in the hash table
   * Handles collisions using separate chaining (array of pairs per bucket)
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const index = this._hash(key);

    if (!this.table[index]) {
      this.table[index] = [];
    }

    // Check if key already exists and update it
    const bucket = this.table[index];
    const existing = bucket.find(pair => pair[0] === key);

    if (existing) {
      existing[1] = value; // Update
    } else {
      bucket.push([key, value]); // Insert
    }
  }

  /**
   * Retrieves a value by key
   * @param {string} key
   * @returns {*} - The stored value or null if not found
   */
  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    if (!bucket) return null;

    const pair = bucket.find(pair => pair[0] === key);
    return pair ? pair[1] : null;
  }

  /**
   * Deletes a key-value pair from the hash table
   * @param {string} key
   * @returns {boolean} - True if deleted, false if not found
   */
  delete(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    if (!bucket) return false;

    const pairIndex = bucket.findIndex(pair => pair[0] === key);

    if (pairIndex !== -1) {
      bucket.splice(pairIndex, 1);
      return true;
    }

    return false;
  }

  /**
   * Returns all keys in the hash table
   * @returns {Array} - Array of keys
   */
  keys() {
    const keysArr = [];
    for (let bucket of this.table) {
      if (bucket) {
        for (let [key] of bucket) {
          keysArr.push(key);
        }
      }
    }
    return keysArr;
  }

  /**
   * Returns all values in the hash table
   * @returns {Array} - Array of values
   */
  values() {
    const valuesArr = [];
    for (let bucket of this.table) {
      if (bucket) {
        for (let [, value] of bucket) {
          valuesArr.push(value);
        }
      }
    }
    return valuesArr;
  }
}


// ============================================================
// BOOK STORAGE — stores books with their ID as the key
// ============================================================

const bookStorage = new HashTable();

// Adding books to the hash table
bookStorage.set("B001", { id: "B001", title: "The Alchemist",    author: "Paulo Coelho",  genre: "Fiction",   rating: 4.2, year: 1988 });
bookStorage.set("B002", { id: "B002", title: "Atomic Habits",    author: "James Clear",   genre: "Self-Help", rating: 4.8, year: 2018 });
bookStorage.set("B003", { id: "B003", title: "1984",             author: "George Orwell", genre: "Dystopian", rating: 4.7, year: 1949 });
bookStorage.set("B004", { id: "B004", title: "Sapiens",          author: "Yuval Noah",    genre: "History",   rating: 4.5, year: 2011 });
bookStorage.set("B005", { id: "B005", title: "Deep Work",        author: "Cal Newport",   genre: "Self-Help", rating: 4.6, year: 2016 });


// ============================================================
// USER STORAGE — stores users with reading history
// ============================================================

const userStorage = new HashTable();

// Adding users to the hash table
userStorage.set("U001", { id: "U001", name: "Alice", readBooks: ["B001", "B003"], preferredGenre: "Fiction"   });
userStorage.set("U002", { id: "U002", name: "Bob",   readBooks: ["B002", "B005"], preferredGenre: "Self-Help" });
userStorage.set("U003", { id: "U003", name: "Carol", readBooks: ["B003", "B004"], preferredGenre: "History"   });


// ============================================================
// USAGE EXAMPLE
// ============================================================

console.log("=== Book Lookup (O(1)) ===");
console.log(bookStorage.get("B002")); // Atomic Habits

console.log("\n=== User Lookup (O(1)) ===");
console.log(userStorage.get("U001")); // Alice

console.log("\n=== All Book IDs ===");
console.log(bookStorage.keys());

console.log("\n=== Delete a Book ===");
bookStorage.delete("B005");
console.log("After deleting B005:", bookStorage.get("B005")); // null


// ============================================================
// EXPORTS (for use in the main project)
// ============================================================

module.exports = { HashTable, bookStorage, userStorage };