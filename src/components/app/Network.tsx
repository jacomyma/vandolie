import { SigmaContainer } from "@react-sigma/core";
import { type FC, useMemo, useState } from "react";

import { useAppContext } from "../../core/context.ts";
import { useTranslate } from "../../core/i18n";
import { DEFAULT_NETWORK_OPTIONS, type NetworkOptions, makeNetwork } from "../../core/network.ts";

export const NetworkComponent: FC = () => {
  const { t } = useTranslate();
  const { dataset } = useAppContext();
  const [options, setOptions] = useState<NetworkOptions>(DEFAULT_NETWORK_OPTIONS);

  const { graph, vocabulary, vocabularyData, filteredVocabularyData, stopWords, cooccurrences } = useMemo(
    () => makeNetwork(dataset, options),
    [dataset, options],
  );

  return (
    <main>
      <div className="container bg-body pb-4">
        <div className="container pt-4">
          <h1>Co-word network</h1>
          <p>Follow the steps of the algorithm, and see the resulting network in the end.</p>
        </div>

        <div className="container">
          <h2 className="mt-5">1. Count word occurrences</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">Settings: how to count the words?</div>
            <div className="card-body">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-include-title"
                  checked={options.includeTitle}
                  onChange={(e) => setOptions((o) => ({ ...o, includeTitle: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-include-title">
                  Include title in the text
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-count-multi-per-doc"
                  checked={options.multiPerDoc}
                  onChange={(e) => setOptions((o) => ({ ...o, multiPerDoc: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-count-multi-per-doc">
                  Count how many times a word appears in a same document (Not recommended)
                </label>
              </div>
            </div>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">
              Result:{" "}
              <span id="count-occurrences-result-count" className="font-monospace">
                {t(vocabulary.size)}
              </span>{" "}
              distinct words found.
            </h5>
            <div className="card-body">
              <div className="form-floating">
                <textarea
                  className="form-control font-monospace"
                  id="count-occurrences-result-top-words"
                  style={{ height: 180 }}
                  value={vocabularyData
                    .filter((_, i) => i < 50)
                    .map(({ token, count }, i) => `${i + 1}. ${token} (${count})`)
                    .join("\n")}
                  readOnly
                ></textarea>
                <label htmlFor="count-occurrences-result-top-words" className="form-label">
                  Top 50 most occurring words
                </label>
              </div>
            </div>
          </div>

          <h2 className="mt-5">2. Remove unnecessary words</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">Settings: which words to remove?</div>
            <div className="card-body">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-remove-stoplist-en"
                  checked={options.stopWordsEN}
                  onChange={(e) => setOptions((o) => ({ ...o, stopWordsEN: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-remove-stoplist-en">
                  Remove <em>stop words</em> from English language
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-remove-stoplist-dk"
                  checked={options.stopWordsDK}
                  onChange={(e) => setOptions((o) => ({ ...o, stopWordsDK: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-remove-stoplist-dk">
                  Remove <em>stop words</em> from Danish language
                </label>
              </div>

              <select
                className="form-select mt-2"
                id="settings-remove-threshold"
                value={options.threshold}
                onChange={(e) => setOptions((o) => ({ ...o, threshold: +e.target.value }))}
              >
                <option value="1">Remove words appearing only once</option>
                <option value="2">Remove words appearing only once or twice</option>
                <option value="3">Remove words appearing 3 times or less</option>
                <option value="4">Remove words appearing 4 times or less</option>
                <option value="5">Remove words appearing 5 times or less</option>
                <option value="10">Remove words appearing 10 times or less</option>
                <option value="20">Remove words appearing 20 times or less</option>
                <option value="50">Remove words appearing 50 times or less</option>
                <option value="100">Remove words appearing 100 times or less</option>
              </select>
            </div>
          </div>

          {/* Info */}
          <div className="form-floating mt-3">
            <textarea
              className="form-control form-control-sm font-monospace"
              id="remove-result-stop-words"
              readOnly
              style={{ height: 100 }}
              value={stopWords.length ? stopWords.join(", ") : "(No stop words)"}
            ></textarea>
            <label htmlFor="remove-result-stop-words" className="form-label">
              Stop words
            </label>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">
              Result:{" "}
              <span id="remove-result-count" className="font-monospace">
                {t(filteredVocabularyData.length)}
              </span>{" "}
              remaining words.
            </h5>
            <div className="card-body">
              <div className="form-floating">
                <textarea
                  className="form-control font-monospace"
                  id="remove-result-top-words"
                  readOnly
                  style={{ height: 180 }}
                  value={filteredVocabularyData
                    .filter((_, i) => i < 50)
                    .map(({ token, count }, i) => `${i + 1}. ${token} (${count})`)
                    .join("\n")}
                ></textarea>
                <label htmlFor="remove-result-top-words" className="form-label">
                  Top 50 remaining words
                </label>
              </div>
            </div>
          </div>

          <h2 className="mt-5">3. Count word co-occurrences</h2>

          <p>Count in how many documents each two words (from the list above) appear at the same time ("co-occur").</p>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">
              Result:{" "}
              <span id="cooccurrence-result-count" className="font-monospace">
                {t(cooccurrences.length)}
              </span>{" "}
              word pairs.
            </h5>
            <div className="card-body">
              <div className="form-floating">
                <textarea
                  className="form-control font-monospace"
                  id="cooccurrence-result-top-pairs"
                  readOnly
                  style={{ height: 180 }}
                  value={cooccurrences
                    .filter((_, i) => i < 50)
                    .map(([pair, count], i) => `${i + 1}. ${pair.replace("|", " + ")} (${count})`)
                    .join("\n")}
                ></textarea>
                <label htmlFor="cooccurrence-result-top-pairs" className="form-label">
                  Top 50 most co-occurring word pairs
                </label>
              </div>
            </div>
          </div>

          <h2 className="mt-5">4. Display network</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">Settings</div>
            <div className="card-body">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-cooccurrence-pmi"
                  checked={options.usePmi}
                  onChange={(e) => setOptions((o) => ({ ...o, usePmi: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-cooccurrence-pmi">
                  Use{" "}
                  <a href="https://en.wikipedia.org/wiki/Pointwise_mutual_information" target="_blank">
                    pointwise mutual information
                  </a>{" "}
                  to normalize co-occurrence (Recommended)
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="settings-cooccurrence-remove-orphans"
                  checked={options.removeOrphans}
                  onChange={(e) => setOptions((o) => ({ ...o, removeOrphans: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="settings-cooccurrence-remove-orphans">
                  Remove disconnected words (Recommended)
                </label>
              </div>
            </div>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">Network</h5>
            <SigmaContainer graph={graph} style={{ height: 500, backgroundColor: "#DDD" }} />
          </div>
        </div>
      </div>
    </main>
  );
};
