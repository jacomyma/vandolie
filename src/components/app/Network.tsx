import { SigmaContainer } from "@react-sigma/core";
import { type FC, useMemo, useState } from "react";

import { useAppContext } from "../../core/context.ts";
import { DEFAULT_NETWORK_OPTIONS, type NetworkOptions, makeNetwork } from "../../core/network.ts";
import { useTranslate } from "../../core/translation";

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
          <h1>{t("network-title")}</h1>
          <p>{t("network-subtitle")}</p>
        </div>

        <div className="container">
          <h2 className="mt-5">{t("network-1-count")}</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">{t("network-1-how-to-count")}</div>
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
                  {"network-1-settings-include-title"}
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
                  {t("network-1-settings-count-multi-per-doc")}
                </label>
              </div>
            </div>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">{t("network-1-result", { count: t(vocabulary.size) })}</h5>
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
                  {t("network-1-top-50")}
                </label>
              </div>
            </div>
          </div>

          <h2 className="mt-5">{t("network-2-remove")}</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">{t("network-2-which-words")}</div>
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
                  {t("network-2-settings-remove-stoplist-en")}
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
                  {t("network-2-settings-remove-stoplist-dk")}
                </label>
              </div>

              <select
                className="form-select mt-2"
                id="settings-remove-threshold"
                value={options.threshold}
                onChange={(e) => setOptions((o) => ({ ...o, threshold: +e.target.value }))}
              >
                <option value="1">{t("network-2-threshold-1")}</option>
                <option value="2">{t("network-2-threshold-2")}</option>
                <option value="3">{t("network-2-threshold-3")}</option>
                <option value="4">{t("network-2-threshold-4")}</option>
                <option value="5">{t("network-2-threshold-5")}</option>
                <option value="10">{t("network-2-threshold-10")}</option>
                <option value="20">{t("network-2-threshold-20")}</option>
                <option value="50">{t("network-2-threshold-50")}</option>
                <option value="100">{t("network-2-threshold-100")}</option>
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
              {t("network-2-stop-words")}
            </label>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">{t("network-2-result", { count: t(filteredVocabularyData.length) })}</h5>
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
                  {t("network-2-top-50")}
                </label>
              </div>
            </div>
          </div>

          <h2 className="mt-5">{t("network-3-count-cooccurrences")}</h2>

          <p>{t("network-3-how-to")}</p>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">{t("network-3-result", { count: t(cooccurrences.length) })}</h5>
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

          <h2 className="mt-5">{t("network-4-display")}</h2>

          {/* Settings (in a card) */}
          <div className="card">
            <div className="card-header">{t("network-4-settings")}</div>
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
                  {t("network-4-settings-pmi")}
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
                  {t("network-4-settings-cooccurrence-remove-orphans")}
                </label>
              </div>
            </div>
          </div>

          {/* Results (in a card) */}
          <div className="card mt-3 text-bg-primary">
            <h5 className="card-header">{t("network-4-network")}</h5>
            <SigmaContainer graph={graph} style={{ height: 500, backgroundColor: "#DDD" }} />
          </div>
        </div>
      </div>
    </main>
  );
};
