import type { Translations } from "../consts.ts";

const commonTranslations: Translations = {
  en: {
    "site-name": "Vandolie",
    "lang-en": "🇬🇧 English",
    "lang-da": "🇩🇰 Danish",
    "javascript-needed": "You need to enable JavaScript to display this page.",
    // Common:
    ok: "OK",
    yes: "Yes",
    no: "No",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    "clear-all": "Clear all",
    file: "File",
    upload: "Upload",
    // App navigation:
    "app-home": "Home",
    "app-data": "Documents",
    "app-count": "Count the words",
    "app-network": "Co-word network",
    "app-semantic": "Semantic map",
    // Data page:
    "data-documents": "Documents",
    "data-intro": (
      <>
        Input documents here, or load an example dataset. Each document could be a newspaper article, a post on social
        media, or anything else consisting of just text. Copy-paste the text content in the main field, give a title,
        and choose a category. We recommend 10 to 50 documents, and 2 to 5 different categories.
      </>
    ),
    "data-add-document": "Add document",
    "data-doc-title": "Document title",
    "data-doc-category": "Category",
    "data-doc-category-placeholder": "Describe document type...",
    "data-doc-content-placeholder": "Paste text content here...",
    "data-clear-dataset": "Clear documents",
    "data-clear-dataset-confirm-message": "Are you sure you want to clear your documents?",
    "data-load-example": "Load example",
    "data-upload-csv": "Load (CSV)",
    "data-upload-csv-message": (
      <>
        The CSV you upload must have three columns:
        <ul>
          <li>
            <strong>title</strong>
          </li>
          <li>
            <strong>content</strong>
          </li>
          <li>
            <strong>category</strong>
          </li>
        </ul>
      </>
    ),
    "data-save-csv": "Save (CSV)",
    // "Count the words" page:
    "count-title": "Count the words",
    "count-settings": "Settings: what word to count?",
    "count-query-placeholder": "Word to search and count",
    "count-search-and-count": "Search and count",
    "count-exact-words": "Exact word",
    "count-top-words-title": (
      <>
        Top words <span className="opacity-50">(click to search)</span>
      </>
    ),
    "count-by-category": "Count by category",
    "count-details": "Details",
    "count-missing": "Missing",
  },
  da: {
    "site-name": "Vandolie",
  },
};

export default commonTranslations;
