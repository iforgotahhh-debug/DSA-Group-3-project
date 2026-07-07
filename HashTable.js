// ============================================================
// hashTable.js
// Data Structure Implementation - Book Recommendation System
// Data Structure: Hash Table
// Purpose: Store and retrieve book & user data in O(1) time
// Time Complexity: Insert O(1), Lookup O(1), Delete O(1) average
// Space Complexity: O(n)
// ============================================================

class HashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash * PRIME + key.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.table[index]) this.table[index] = [];

    const bucket = this.table[index];
    const existing = bucket.find(pair => pair[0] === key);

    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];
    if (!bucket) return null;

    const pair = bucket.find(pair => pair[0] === key);
    return pair ? pair[1] : null;
  }

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

  keys() {
    const keysArr = [];
    for (let bucket of this.table) {
      if (bucket) for (let [key] of bucket) keysArr.push(key);
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];
    for (let bucket of this.table) {
      if (bucket) for (let [, value] of bucket) valuesArr.push(value);
    }
    return valuesArr;
  }
}

// ============================================================
// EXPORTS
// ============================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = { HashTable };
}
