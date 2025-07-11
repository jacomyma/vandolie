import type { Translation } from "../translation.tsx";

const translations: Record<string, Translation> = {
  // Available languages:
  "lang-en": "🇬🇧 English",
  "lang-da": "🇩🇰 Danish",

  // Static files:
  "site-name": "Vandolie",
  "site-description": "Semantic mapping algorithms for high school students",
  "site-start-application": "Get started",
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
  edit: "Edit",
  "docs-loaded": "documents loaded",

  // Static website commons
  "website-how-to-use": "How to use",
  "website-teacher": "For teachers",

  // Static website footer
  "footer-credits": (
    <>
      <p><em>Vandolie</em> is a free, open source tool developed by Mathieu Jacomy, Matilde Ficozzi, Cathrine Hofmann Fried, Jesper Wad Larsen, and <a class="link-info" href="https://www.ouestware.com/en/" target="_blank">Ouestware</a>.</p>
    </>
  ),
  "footer-supported-by": (
    <>
      <img class="footer-supported-by-img" src={`${import.meta.env.BASE_URL}img/It-vest_UK_support.jpg`} alt="Supported by IT-Vest"/>
    </>
  ),
  "footer-license": (
    <>
      License: <a class="link-info" href="https://github.com/jacomyma/vandolie/blob/main/LICENSE" target="_blank">GPL v3.0</a>
    </>
  ),
  "footer-repository": (
    <>
      Clone our <a class="link-info" href="https://github.com/jacomyma/vandolie/" target="_blank">source code</a>
    </>
  ),
  "footer-feedback": (
    <>
      Give us your <a class="link-info" href="https://github.com/jacomyma/vandolie/issues" target="_blank">feedback</a>
    </>
  ),

  // Landing page:
  "landing-pitch": "Analyze text documents. Will they separate like water and oil?",
  "landing-mixed": "Mixed",
  "landing-mixed-info": "Your documents have a similar content.",
  "landing-separated": "Separated",
  "landing-separated-info": "Your documents have 2 distinct kinds of content. What makes them different?",
  "landing-teacher": "I am a teacher...",

  // App navigation:
  "app-home": "Home",
  "app-data": "Documents",
  "app-count": "Count the words",
  "app-network": "Co-word network",
  "app-semantic": "Semantic map",
  "app-no-data": (
    <>
      <p>To use this page, you first need to gather some documents, or import some sample data.</p>
      <p>
        You can manage your corpus from the{" "}
        <a href={`${import.meta.env.BASE_URL}en/app/data`} className="fw-bold">
          Documents
        </a>{" "}
        page.
      </p>
    </>
  ),

  // Data page:
  "data-documents": "Documents",
  "data-intro": (
    <>
      <strong>Copy-paste documents here</strong>, or load an example dataset. Each document could be a newspaper article, a post on social
      media, or anything else consisting of just text. Copy-paste the text content in the main field, give a title, and
      choose a category. We recommend 10 to 50 documents, and 2 to 5 different categories.
    </>
  ),
  "data-method-help": "👉 Where to find documents and how to decide categories?",
  "data-add-document": "Add document",
  "data-doc-title": "Document title",
  "data-doc-category": "Category",
  "data-doc-category-placeholder": "Describe document type...",
  "data-doc-content-placeholder": "Paste text content here...",
  "data-use-this": "Use this algorithm",
  "data-count-info": "Extract the most important words, and see in which documents they are. Are there words that appear in only a certain category?",
  "data-network-info": "Extract the important words from the documents, and connect them when they appear together.",
  "data-semantic-info": "Groups documents with a similar content. Do the groups reflect your categories?",
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
  "count-intro": (
    <>
      <strong>Search a word</strong> or click on one of the top words to see in how many documents of each categories it appears.
    </>
  ),
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

  // "Co-word network" page:
  "network-title": "Co-word network",
  "network-subtitle": "Follow the steps of the algorithm, and see the resulting network in the end.",
  "network-1-count": "1. Count word occurrences",
  "network-1-how-to-count": "Settings: how to count the words?",
  "network-1-settings-include-title": "Include title in the text",
  "network-1-settings-count-multi-per-doc": "Count how many times a word appears in a same document (Not recommended)",
  "network-1-result": (props) => (
    <>
      Result:{" "}
      <span id="count-occurrences-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      distinct words found.
    </>
  ),
  "network-1-top-50": "Top 50 most occurring words",
  "network-2-remove": "2. Remove unnecessary words",
  "network-2-which-words": "Settings: which words to remove?",
  "network-2-settings-remove-stoplist-en": (
    <>
      Remove <em>stop words</em> from English language
    </>
  ),
  "network-2-settings-remove-stoplist-dk": (
    <>
      Remove <em>stop words</em> from Danish language
    </>
  ),
  "network-2-threshold-1": "Remove words appearing only once",
  "network-2-threshold-2": "Remove words appearing only once or twice",
  "network-2-threshold-3": "Remove words appearing 3 times or less",
  "network-2-threshold-4": "Remove words appearing 4 times or less",
  "network-2-threshold-5": "Remove words appearing 5 times or less",
  "network-2-threshold-10": "Remove words appearing 10 times or less",
  "network-2-threshold-20": "Remove words appearing 20 times or less",
  "network-2-threshold-50": "Remove words appearing 50 times or less",
  "network-2-threshold-100": "Remove words appearing 100 times or less",
  "network-2-stop-words": "Stop words",
  "network-2-result": (props) => (
    <>
      Result:{" "}
      <span id="remove-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      remaining words.
    </>
  ),
  "network-2-top-50": "Top 50 remaining words",
  "network-3-count-cooccurrences": "3. Count word co-occurrences",
  "network-3-how-to":
    'Count in how many documents each two words (from the list above) appear at the same time ("co-occur").',
  "network-3-result": (props) => (
    <>
      Result:{" "}
      <span id="cooccurrence-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      word pairs.
    </>
  ),
  "network-3-top-50": "Top 50 most co-occurring word pairs",
  "network-4-display": "4. Display network",
  "network-4-settings": "Settings",
  "network-4-settings-pmi": (
    <>
      Use{" "}
      <a href="https://en.wikipedia.org/wiki/Pointwise_mutual_information" target="_blank">
        pointwise mutual information
      </a>{" "}
      to normalize co-occurrence (Recommended)
    </>
  ),
  "network-4-settings-cooccurrence-remove-orphans": "Remove disconnected words (Recommended)",
  "network-4-network": "Network",

  // "Semantic map" page:
  "semantic-title": "Semantic map",
  "semantic-compute": "Compute",
  "semantic-embedding-progress": (props) => (
    <>
      {props.processed}/{props.total} documents embedded
    </>
  ),
  "semantic-umap-progress": (props) => <>{props.progress}% 2D projection</>,
  "semantic-network-placeholder": "You can click on a document, to see its content.",
};

export default translations;
