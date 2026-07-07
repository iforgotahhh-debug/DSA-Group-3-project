// ============================================================
// data.js
// In-memory book dataset (no database required for this project)
// ============================================================

const BOOKS = [
  { id: "B001", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", rating: 4.8, year: 1965, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", reason: "An unmatched blend of ecology, religion, and interstellar politics." },
  { id: "B002", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", rating: 4.7, year: 1937, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", reason: "A perfect adventure story full of warmth and hard-won courage." },
  { id: "B003", title: "1984", author: "George Orwell", genre: "Dystopian", rating: 4.7, year: 1949, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", reason: "A chillingly precise vision of surveillance and control." },
  { id: "B004", title: "Sapiens", author: "Yuval Noah Harari", genre: "History", rating: 4.5, year: 2011, cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&q=80", reason: "A sweeping, readable account of how humans came to rule the planet." },
  { id: "B005", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", rating: 4.8, year: 2018, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", reason: "Practical, well-structured advice on building lasting habits." },
  { id: "B006", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", rating: 3.9, year: 1925, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", reason: "A sharp, glittering critique of the American Dream." },
  { id: "B007", title: "Deep Work", author: "Cal Newport", genre: "Self-Help", rating: 4.6, year: 2016, cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80", reason: "A compelling case for focus in a distracted world." },
  { id: "B008", title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", rating: 4.2, year: 1988, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", reason: "A simple, fable-like story about following your dreams." },
  { id: "B009", title: "Gone Girl", author: "Gillian Flynn", genre: "Thriller", rating: 4.4, year: 2012, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80", reason: "A twisting, unreliable-narrator thriller that keeps you guessing." },
  { id: "B010", title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", genre: "Magical Realism", rating: 4.6, year: 1967, cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80", reason: "The defining work of magical realism, lush and generational." },
  { id: "B011", title: "The Martian", author: "Andy Weir", genre: "Sci-Fi", rating: 4.7, year: 2011, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80", reason: "Hard science fiction with real engineering and real tension." },
  { id: "B012", title: "Educated", author: "Tara Westover", genre: "Memoir", rating: 4.7, year: 2018, cover: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&q=80", reason: "A powerful memoir about self-invention through education." },
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BOOKS };
}