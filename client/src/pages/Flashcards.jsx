import React, { useState, useEffect } from "react";
// Import icons from lucide-react, which is available
import { Edit, Trash2, X } from "lucide-react";
// Import the global theme hook (this will work in your local project)
import { useTheme } from "../context/ThemeContext";
import { fetchFlashcards, addFlashcard } from "../utils/api";
import { motion } from "framer-motion";
export default function Flashcards() {
  const { theme } = useTheme();

// --- API Functions (from ../utils/api) ---
// We place all API logic directly in this file.
const API_URL = "http://localhost:5050/api/flashcards";

// CREATE
const addFlashcard = async (flashcard) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flashcard),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})); // Try to parse error
    throw new Error(err.message || "Failed to add flashcard");
  }
  return await res.json();
};

// READ (All)
const fetchFlashcards = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch flashcards");
  }
  return await res.json();
};

// UPDATE
const updateFlashcard = async (id, flashcard) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flashcard),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update flashcard");
  }
  return await res.json();
};

// DELETE
const deleteFlashcard = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete flashcard");
  }
  return await res.json();
};
// --- End API Functions ---

// --- Base Modal Component (from ../components/Modal) ---
// A generic, self-contained Modal component.
function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      // Backdrop
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        // Modal Content
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="relative m-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        {/* Body */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
// --- End Modal Component ---

// --- FlashcardModal Component (from ../components/FlashcardModal) ---
function FlashcardModal({
  open,
  onClose,
  mode = "add", // 'add' or 'edit'
  cardToEdit, // The card data to pre-fill the form
  onCardAdded, // Callback for when a new card is created
  onCardUpdated, // Callback for when a card is updated
  topics = [], // New prop to receive the topics list
}) {
  const [form, setForm] = useState({ term: "", definition: "", topic: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topicChoice, setTopicChoice] = useState("select"); // State for dropdown

  useEffect(() => {
    if (open) {
      if (mode === "edit" && cardToEdit) {
        const cardTopic = cardToEdit.topic || "";
        // Check if the card's topic is in the predefined list
        const isCustomTopic = !topics.includes(cardTopic) && cardTopic !== "";

        setForm({
          term: cardToEdit.term || "",
          definition: cardToEdit.definition || "",
          topic: cardTopic,
        });
        // Set dropdown state accordingly
        setTopicChoice(isCustomTopic ? "custom" : "select");
      } else {
        // Reset for 'add' mode
        setForm({ term: "", definition: "", topic: "" });
        setTopicChoice("select");
      }
      setError(null);
    }
  }, [open, mode, cardToEdit, topics]); // Added 'topics' to dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const cardData = {
        term: form.term.trim(),
        definition: form.definition.trim(),
        topic:
          form.topic.trim().charAt(0).toUpperCase() +
          form.topic.trim().slice(1),
      };

      if (!cardData.term || !cardData.definition || !cardData.topic) {
        setError("All fields are required.");
        setIsLoading(false);
        return;
      }

      if (mode === "edit") {
        const updatedCard = await updateFlashcard(cardToEdit._id, cardData);
        if (onCardUpdated) onCardUpdated(updatedCard);
      } else {
        const newCard = await addFlashcard(cardData);
        if (onCardAdded) onCardAdded(newCard);
      }
      onClose();
    } catch (err) {
      console.error(
        mode === "edit"
          ? "Error updating flashcard:"
          : "Error adding flashcard:",
        err
      );
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const title = mode === "edit" ? "Edit Flashcard" : "Add Flashcard";
  const buttonText = mode === "edit" ? "Save Changes" : "Add Card";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Term
          </label>
          <input
            type="text"
            placeholder="e.g., 'What is a closure?'"
            value={form.term}
            onChange={(e) => setForm({ ...form, term: e.target.value })}
            required
            className="w-full border p-2 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Definition
          </label>
          <textarea
            placeholder="A function that remembers its outer scope..."
            value={form.definition}
            onChange={(e) => setForm({ ...form, definition: e.target.value })}
            required
            className="w-full border p-2 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
            rows={3}
          />
        </div>

        {/* --- Updated Topic Selection --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Topic
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="w-full border p-2 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 flex-1"
              value={topicChoice === "custom" ? "custom" : form.topic || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "custom") {
                  setTopicChoice("custom");
                  setForm((f) => ({ ...f, topic: "" }));
                } else {
                  setTopicChoice("select");
                  setForm((f) => ({ ...f, topic: val }));
                }
              }}
            >
              <option value="">-- Choose topic --</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="custom">Other (type new)</option>
            </select>

            {/* Show text input only if 'Other' is selected or in edit mode with a custom topic */}
            {topicChoice === "custom" && (
              <input
                type="text"
                placeholder="Type new topic"
                value={form.topic}
                onChange={(e) => {
                  setForm((f) => ({ ...f, topic: e.target.value }));
                }}
                required
                className="w-full border p-2 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 flex-1"
              />
            )}
          </div>
        </div>
        {/* --- End Updated Topic Selection --- */}

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 font-semibold hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800"
        >
          {isLoading ? "Saving..." : buttonText}
        </button>
      </form>
    </Modal>
  );
}
// --- End FlashcardModal Component ---

// --- Flashcard Component (from ../components/Flashcard) ---
function Flashcard({ card, onReview, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const { _id, term, definition } = card;

  const handleFlip = () => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);
    if (nextFlipped && !hasReviewed) {
      setHasReviewed(true);
      if (typeof onReview === "function") onReview();
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(card);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(_id);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-80 h-48 sm:w-96 sm:h-56 perspective cursor-pointer group"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border shadow-md backface-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="text-lg font-semibold text-center text-gray-900 dark:text-white">
            {term}
          </div>
          <p className="text-sm text-gray-400 mt-2 group-hover:opacity-100 opacity-0 transition-opacity">
            (Click to flip)
          </p>
          <div className="absolute top-2 right-2 flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEditClick}
              className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
              title="Edit Card"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-gray-700 dark:text-red-300 dark:hover:bg-gray-600"
              title="Delete Card"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50 border shadow-md backface-hidden rotate-y-180 dark:bg-blue-900 dark:border-blue-700">
          <div className="text-sm text-gray-700 font-medium mb-2 dark:text-blue-200">
            Definition
          </div>
          <div className="text-base text-center text-gray-900 dark:text-white">
            {definition}
          </div>
          <div className="absolute top-2 right-2 flex gap-2 transform -scale-x-100">
            <button
              onClick={handleEditClick}
              className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
              title="Edit Card"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-gray-700 dark:text-red-300 dark:hover:bg-gray-600"
              title="Delete Card"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// --- End Flashcard Component ---

// --- Main Flashcards Component ---
// This is now the default export and will be rendered by your app's router
export default function FlashcardsPage() {
  const { theme } = useTheme(); // This will now use the imported global hook
  const isDark = theme === "dark";

  const defaultTopics = [
    "JavaScript Fundamentals",
    "Git and Version Control",
    "CSS Mastery",
    "Python Basics",
    "UI/UX Design Patterns",
    "React Patterns",
    "TypeScript Essentials",
    "Database Systems",
    "Node.js Development",
    "API Design and REST",
    "Testing Strategies",
    "Docker Container",
    "DSA",
    "Web Security",
    "Performance Optimization",
    "AWS Cloud Service",
    "Microservice Architecture",
    "DevOps and CI/CD",
  ];
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };
  const [topics, setTopics] = useState(defaultTopics);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [reviewCount, setReviewCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reviewedCards, setReviewedCards] = useState(new Set());

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentCardToEdit, setCurrentCardToEdit] = useState(null);

  const filteredFlashcards =
    selectedTopic === "All"
      ? flashcards
      : flashcards.filter((f) => f.topic === selectedTopic);

  const loadFlashcards = async () => {
    try {
      const data = await fetchFlashcards();
      setFlashcards(data || []);
      // Dynamically populate topics from fetched cards
      const fetchedTopics = [...new Set(data.map((c) => c.topic))];
      setTopics((prev) => [...new Set([...prev, ...fetchedTopics])].sort());
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error loading flashcards:", err);
    }
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  const handleCardAdded = (newCard) => {
    setFlashcards((prev) => [newCard, ...prev]);
    if (!topics.includes(newCard.topic)) {
      setTopics((prev) => [...prev, newCard.topic].sort());
    }
    setSelectedTopic("All");
    setCurrentIndex(0);
  };

  const handleCardUpdated = (updatedCard) => {
    setFlashcards((prev) =>
      prev.map((c) => (c._id === updatedCard._id ? updatedCard : c))
    );
    if (!topics.includes(updatedCard.topic)) {
      setTopics((prev) => [...prev, updatedCard.topic].sort());
    }
  };

  const handleOpenEditModal = (card) => {
    setCurrentCardToEdit(card);
    setEditModalOpen(true);
  };

  const handleDeleteCard = async (id) => {
    // NOTE: You should replace this with a custom, non-blocking modal
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteFlashcard(id);
        setFlashcards((prev) => prev.filter((c) => c._id !== id));
        setCurrentIndex(0);
      } catch (err) {
        console.error("Error deleting card:", err);
      }
    }
  };

  const handleReview = () => {
    const currentCard = filteredFlashcards[currentIndex];
    if (currentCard && !reviewedCards.has(currentCard._id)) {
      setReviewCount((c) => c + 1);
      setReviewedCards((prevSet) => new Set(prevSet).add(currentCard._id));
    }
  };

  const nextCard = () => {
    if (filteredFlashcards.length > 0) {
      setCurrentIndex((i) => (i + 1) % filteredFlashcards.length);
    }
  };
  const prevCard = () => {
    if (filteredFlashcards.length > 0) {
      setCurrentIndex(
        (i) => (i - 1 + filteredFlashcards.length) % filteredFlashcards.length
      );
    }
  };

  // Toggle flip 
  const toggleFlip = () => {
    setFlipped((prev) => {
      const newFlip = !prev;

      // If flipping to the back and the card wasn't reviewed before → increment count
      if (newFlip) {
        const currentCard = filteredFlashcards[currentIndex];
        if (currentCard && !reviewedCards.has(currentCard._id)) {
          setReviewCount((c) => c + 1);
          setReviewedCards((prevSet) => new Set(prevSet).add(currentCard._id));
        }
      }

      return newFlip;
    });
  };



  const handleReview = () => setReviewCount((c) => c + 1);
  const resetFilter = () => {
    setSelectedTopic("All");
    setReviewCount(0);
    setCurrentIndex(0);
    setReviewedCards(new Set());
  };

  const handleOpenAddModal = () => setAddModalOpen(true);

  const hasCards = filteredFlashcards.length > 0;
  const currentCard = hasCards ? filteredFlashcards[currentIndex] : null;

  return (
    <div
      className={`relative min-h-screen ${isDark ? "text-white" : "text-gray-900"
        } overflow-x-hidden`}
    >
      {/* Grid Background */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
        </motion.div>
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="page-heading">Flashcards</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Flip the card to view definitions. Practice one at a time.
          </p>
        </div>

        {/* Topic Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-lg font-medium border ${isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
                }`}
            >
              {selectedTopic === "All" ? "Select Topic" : selectedTopic}
              <span className="text-lg">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <div
                className={`absolute mt-2 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg border z-50 ${isDark
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
              >
                <button
                  onClick={() => {
                    setSelectedTopic("All");
                    setDropdownOpen(false);
                    setCurrentIndex(0);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-primary-100 dark:hover:bg-gray-800 rounded-t-lg"
                >
                  All Topics
                </button>
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTopic(t);
                      setDropdownOpen(false);
                      setCurrentIndex(0);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-primary-100 dark:hover:bg-gray-800"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review & Add */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <button
              onClick={handleReview}
              className="p-2 bg-primary-100 text-primary-800 rounded font-medium dark:bg-primary-800 dark:text-primary-100"
            >
              Reviewed: {reviewCount}
            </button>
            <button
              onClick={resetFilter}
              className="p-2 bg-red-100 text-red-700 rounded font-medium dark:bg-red-800 dark:text-red-100"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleOpenModal}
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
            >
              + Add Flashcard
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Selected: <span className="font-medium">{selectedTopic}</span>
            </div>
          </div>
        </div>

        {/* Flashcard Display Area */}
        {hasCards ? (
          <>
            <div className="w-full flex justify-center items-center min-h-[250px] sm:min-h-[400px]">
              <Flashcard
                key={currentCard._id}
                card={currentCard}
                onReview={handleReview}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteCard}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevCard}
                className="px-6 py-2 rounded bg-primary-200 hover:bg-primary-300 text-primary-900 font-medium dark:bg-primary-700 dark:text-white dark:hover:bg-primary-600"
              >
                ← Previous
              </button>
              <button
                onClick={nextCard}
                className="px-6 py-2 rounded bg-primary hover:bg-primary-600 text-white font-medium dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Next →
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              {currentIndex + 1} / {filteredFlashcards.length}
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic text-center mt-10">
            No flashcards for this topic yet.
          </p>
        )}
      </div>

      {/* --- Modal for ADDING a card --- */}
      <FlashcardModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        mode="add"
        onCardAdded={handleCardAdded}
        topics={topics}
      />

      {/* --- Modal for EDITING a card --- */}
      <FlashcardModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        mode="edit"
        cardToEdit={currentCardToEdit}
        onCardUpdated={handleCardUpdated}
        topics={topics}
      />

      {/* Styles */}
      <style jsx>{`
        .page-heading {
          font-size: 3rem;
          font-weight: 900;
          font-family: "Righteous", sans-serif;
          /* color: var(--text_clr); */ /* Removed for dark mode compatibility */
          text-align: center;
        }

        /* CSS variables for Tailwind-like properties */
        :root {
          --primary: #4f46e5;
          --primary-100: #e0e7ff;
          --primary-200: #c7d2fe;
          --primary-300: #a5b4fc;
          --primary-600: #4338ca;
          --primary-700: #3730a3;
          --primary-800: #312e81;
          --primary-900: #2b2a6c;
        }

        .text-primary {
          color: var(--primary);
        }
        .bg-primary {
          background-color: var(--primary);
        }
        .bg-primary-100 {
          background-color: var(--primary-100);
        }
        .bg-primary-200 {
          background-color: var(--primary-200);
        }
        .hover\\:bg-primary-300:hover {
          background-color: var(--primary-300);
        }
        .hover\\:bg-primary-600:hover {
          background-color: var(--primary-600);
        }
        .text-primary-800 {
          color: var(--primary-800);
        }
        .text-primary-900 {
          color: var(--primary-900);
        }

        .dark .bg-primary-800 {
          background-color: var(--primary-800);
        }
        .dark .text-primary-100 {
          color: var(--primary-100);
        }
        .dark .bg-primary-700 {
          background-color: var(--primary-700);
        }
        .dark .bg-primary-600 {
          background-color: var(--primary-600);
        }
        .dark .hover\\:bg-primary-700:hover {
          background-color: var(--primary-700);
        }
        .dark .hover\\:bg-primary-600:hover {
          background-color: var(--primary-600);
        }

        /* Flip Card Styles */
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .-scale-x-100 {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}

