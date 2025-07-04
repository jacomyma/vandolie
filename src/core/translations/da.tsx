import type { Translation } from "../translation.tsx";

const translations: Record<string, Translation> = {
  // Available languages:
  "lang-en": "🇬🇧 Engelsk",
  "lang-da": "🇩🇰 Dansk",

  // Static files:
  "site-name": "Vandolie",
  "site-description": "Semantiske kortlægningsalgoritmer på gymnasieniveau",
  "site-start-application": "Kom i gang",
  "javascript-needed": "Du skal aktivere JavaScript for at vise denne side.",

  // Common:
  ok: "OK",
  yes: "Ja",
  no: "Nej",
  delete: "Slet",
  cancel: "Annuller",
  confirm: "Bekræft",
  save: "Gem",
  "clear-all": "Ryd alt",
  file: "Fil",
  upload: "Upload",
  edit: "Rediger",
  "docs-loaded": "dokumenter indlæst",

  // Static website commons
  "website-how-to-use": "Hvordan bruges det",

  // Static website footer
  "footer-credits": (
    <>
      <p><em>Vandolie</em> er et gratis open source-værktøj udviklet af Mathieu Jacomy, Matilde Ficozzi, Cathrine Hofmann Fried, Jesper Wad Larsen, og <a class="link-info" href="https://www.ouestware.com/en/" target="_blank">Ouestware</a>.</p>
    </>
  ),
  "footer-supported-by": (
    <>
      <img class="footer-supported-by-img" src={`${import.meta.env.BASE_URL}img/It-vest_DK_support.jpg`} alt="Støttet af IT-Vest"/>
    </>
  ),
  "footer-license": (
    <>
      Licens: <a class="link-info" href="https://github.com/jacomyma/vandolie/blob/main/LICENSE" target="_blank">GPL v3.0</a>
    </>
  ),
  "footer-repository": (
    <>
      Klon vores <a class="link-info" href="https://github.com/jacomyma/vandolie/" target="_blank">kildekode</a>
    </>
  ),
  "footer-feedback": (
    <>
      Giv os din <a class="link-info" href="https://github.com/jacomyma/vandolie/issues" target="_blank">feedback</a>
    </>
  ),

  // Landing page:
  "landing-pitch": "Analyser tekstdokumenter. Vil de skille som vand og olie?",
  "landing-mixed": "Blandet",
  "landing-mixed-info": "Dine dokumenter har et lignende indhold.",
  "landing-separated": "Adskilt",
  "landing-separated-info": "Dine dokumenter har to forskellige slags indhold. Hvad gør dem forskellige?",
  "landing-teacher": "Jeg er lærer...",

  // App navigation:
  "app-home": "Hjem",
  "app-data": "Dokumenter",
  "app-count": "Tæl ordene",
  "app-network": "Samord-netværk",
  "app-semantic": "Semantisk kort",
  "app-no-data": (
    <>
      <p>For at bruge denne side skal du først indsamle nogle dokumenter eller importere nogle eksempeldata.</p>
      <p>
        Du kan administrere dit korpus fra{" "}
        <a href={`${import.meta.env.BASE_URL}da/app/data`} className="fw-bold">
          Dokumenter
        </a>{" "}
        siden.
      </p>
    </>
  ),

  // Data page:
  "data-documents": "Dokumenter",
  "data-intro": (
    <>
      <strong>Kopier og indsæt dokumenter her</strong>, eller indlæs et eksempel-datasæt. Hvert dokument kunne være en avisartikel, et opslag på
      sociale medier, eller andet der kun består af tekst. Kopier og indsæt tekstindholdet i hovedfeltet, giv en titel,
      og vælg en kategori. Vi anbefaler 10 til 50 dokumenter, og 2 til 5 forskellige kategorier.
    </>
  ),
  "data-add-document": "Tilføj dokument",
  "data-doc-title": "Dokumenttitel",
  "data-doc-category": "Kategori",
  "data-doc-category-placeholder": "Beskriv dokumenttype...",
  "data-doc-content-placeholder": "Indsæt tekstindhold her...",
  "data-use-this": "Brug denne algoritme",
  "data-count-info": "Udvælg de vigtigste ord, og se i hvilke dokumenter de optræder. Er der ord, der kun optræder i en bestemt kategori?",
  "data-network-info": "Uddrag de vigtigste ord fra dokumenterne, og forbind dem, når de optræder sammen.",
  "data-semantic-info": "Grupperer dokumenter med lignende indhold. Afspejler grupperne dine kategorier?",
  "data-clear-dataset": "Ryd dokumenter",
  "data-clear-dataset-confirm-message": "Er du sikker på, at du vil rydde dine dokumenter?",
  "data-load-example": "Indlæs eksempel",
  "data-upload-csv": "Indlæs (CSV)",
  "data-upload-csv-message": (
    <>
      Den CSV du uploader skal have tre kolonner:
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
  "data-save-csv": "Gem (CSV)",

  // "Count the words" page:
  "count-title": "Tæl ordene",
  "count-settings": "Indstillinger: hvilket ord skal tælles?",
  "count-query-placeholder": "Ord at søge efter og tælle",
  "count-search-and-count": "Søg og tæl",
  "count-exact-words": "Præcist ord",
  "count-top-words-title": (
    <>
      Top ord <span className="opacity-50">(klik for at søge)</span>
    </>
  ),
  "count-by-category": "Tæl efter kategori",
  "count-details": "Detaljer",
  "count-missing": "Mangler",

  // "Co-word network" page:
  "network-title": "Samord-netværk",
  "network-subtitle": "Følg algoritmens trin, og se det resulterende netværk til sidst.",
  "network-1-count": "1. Tæl ordforekomster",
  "network-1-how-to-count": "Indstillinger: hvordan skal ordene tælles?",
  "network-1-settings-include-title": "Inkluder titel i teksten",
  "network-1-settings-count-multi-per-doc": "Tæl hvor mange gange et ord forekommer i samme dokument (Ikke anbefalet)",
  "network-1-result": (props) => (
    <>
      Resultat:{" "}
      <span id="count-occurrences-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      forskellige ord fundet.
    </>
  ),
  "network-1-top-50": "Top 50 mest forekommende ord",
  "network-2-remove": "2. Fjern unødvendige ord",
  "network-2-which-words": "Indstillinger: hvilke ord skal fjernes?",
  "network-2-settings-remove-stoplist-en": (
    <>
      Fjern <em>stopord</em> fra engelsk sprog
    </>
  ),
  "network-2-settings-remove-stoplist-dk": (
    <>
      Fjern <em>stopord</em> fra dansk sprog
    </>
  ),
  "network-2-threshold-1": "Fjern ord der kun forekommer én gang",
  "network-2-threshold-2": "Fjern ord der kun forekommer én eller to gange",
  "network-2-threshold-3": "Fjern ord der forekommer 3 gange eller mindre",
  "network-2-threshold-4": "Fjern ord der forekommer 4 gange eller mindre",
  "network-2-threshold-5": "Fjern ord der forekommer 5 gange eller mindre",
  "network-2-threshold-10": "Fjern ord der forekommer 10 gange eller mindre",
  "network-2-threshold-20": "Fjern ord der forekommer 20 gange eller mindre",
  "network-2-threshold-50": "Fjern ord der forekommer 50 gange eller mindre",
  "network-2-threshold-100": "Fjern ord der forekommer 100 gange eller mindre",
  "network-2-stop-words": "Stopord",
  "network-2-result": (props) => (
    <>
      Resultat:{" "}
      <span id="remove-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      resterende ord.
    </>
  ),
  "network-2-top-50": "Top 50 resterende ord",
  "network-3-count-cooccurrences": "3. Tæl samforekomster af ord",
  "network-3-how-to":
    'Tæl i hvor mange dokumenter hvert to ord (fra listen ovenfor) forekommer på samme tid ("samforekommer").',
  "network-3-result": (props) => (
    <>
      Resultat:{" "}
      <span id="cooccurrence-result-count" className="font-monospace">
        {props.count as string}
      </span>{" "}
      ordpar.
    </>
  ),
  "network-4-display": "4. Vis netværk",
  "network-4-settings": "Indstillinger",
  "network-4-settings-pmi": (
    <>
      Brug{" "}
      <a href="https://en.wikipedia.org/wiki/Pointwise_mutual_information" target="_blank">
        pointwise mutual information
      </a>{" "}
      til at normalisere samforekomst (Anbefalet)
    </>
  ),
  "network-4-settings-cooccurrence-remove-orphans": "Fjern ikke-forbundne ord (Anbefalet)",
  "network-4-network": "Netværk",

  // "Semantic map" page:
  "semantic-title": "Semantisk kort",
  "semantic-compute": "Beregn",
  "semantic-embedding-progress": (props) => (
    <>
      {props.processed}/{props.total} dokumenter indlejret
    </>
  ),
  "semantic-umap-progress": (props) => <>{props.progress}% 2D projektion</>,
  "semantic-network-placeholder": "Du kan klikke på et dokument for at se dets indhold.",
};

export default translations;
