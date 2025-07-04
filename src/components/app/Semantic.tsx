import { SigmaContainer, useRegisterEvents, useSigma } from "@react-sigma/core";
import { type FC, useEffect, useMemo, useState } from "react";
import { BsStack, BsCpuFill, BsQuestionCircle } from "react-icons/bs";

import { useAppContext } from "../../core/context.ts";
import { type DocumentNode, getGraph, useEmbedding, useExtractor, useUMAP } from "../../core/semantic.ts";
import { useTranslate } from "../../core/translation";

const GraphEventsController: FC<{
  activeNodeId: string | undefined;
  setActiveNode: (activeNode: DocumentNode | null) => void;
}> = ({ activeNodeId, setActiveNode }) => {
  const sigma = useSigma<DocumentNode>();
  const registerEvents = useRegisterEvents<DocumentNode>();

  useEffect(() => {
    registerEvents({
      clickStage: () => {
        setActiveNode(null);
      },
      clickNode: (e) => {
        const node = e.node;

        setActiveNode(node === activeNodeId ? null : sigma.getGraph().getNodeAttributes(node));
      },
    });
  }, [activeNodeId, setActiveNode, registerEvents, sigma]);

  return null;
};

export const SemanticComponent: FC = () => {
  const { t } = useTranslate();
  const { dataset, lang } = useAppContext();
  const [selectedNode, setSelectedNode] = useState<DocumentNode | null>(null);
  const extractor = useExtractor();
  const { embeddedDocuments, embeddingProgress } = useEmbedding(dataset, extractor);
  const { projectedDocuments, projectionProgress } = useUMAP(embeddingProgress === 1 ? embeddedDocuments : undefined);
  const graph = useMemo(() => getGraph(projectedDocuments || undefined), [projectedDocuments]);

  return (
    <main>
      <div className="container bg-body pb-4">
        <div className="container pt-4">
          <h1>
            {t("semantic-title")}
            <a class="btn btn-link" target="_blank" href={`${import.meta.env.BASE_URL}${lang}/how-to-use#semantic`}>
              <BsQuestionCircle />
            </a>
          </h1>
          <p>
            <BsStack /> {dataset?.documents.length} {t("docs-loaded")}
            <small class="ms-2"><a href={`${import.meta.env.BASE_URL}${lang}/app/data`}>{t("edit")}</a></small>
          </p>

          {/* Load bars (in a card) */}
          <div className="card">
            <div className="card-header"><BsCpuFill /> {t("semantic-compute")}</div>
            <div className="card-body">
              <div className="progress mb-1" role="progressbar">
                <div
                  className="progress-bar"
                  style={{ width: embeddingProgress * 100 + "%" }}
                  id="embeddings-progress-bar"
                >
                  {t("semantic-embedding-progress", {
                    processed: embeddedDocuments.length,
                    total: dataset.documents.length,
                  })}
                </div>
              </div>
              <div className="progress" role="progressbar">
                <div className="progress-bar" style={{ width: projectionProgress * 100 + "%" }} id="umap-progress-bar">
                  {t("semantic-umap-progress", {
                    progress: projectionProgress * 100,
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Viz */}
          <div className="d-flex flex-row mt-3">
            {/* Sigma */}
            <SigmaContainer<DocumentNode>
              graph={graph}
              className="flex-fill mh-100 rounded"
              style={{ height: 500, backgroundColor: "#e8e3d4" }}
              settings={{
                nodeReducer(node, data) {
                  return node === selectedNode?.id ? { ...data, highlighted: true } : data;
                },
              }}
            >
              <GraphEventsController activeNodeId={selectedNode?.id} setActiveNode={setSelectedNode} />
            </SigmaContainer>

            {/* Text preview */}
            <div className="flex-wrap ps-3" style={{ height: 500, width: 240, overflowY: "hidden" }}>
              {selectedNode && (
                <div className="h-100 overflow-y-auto">
                  <h3>{selectedNode.document.title}</h3>
                  <p>
                    <span className="badge" style={{ backgroundColor: selectedNode.color }}>{selectedNode.document.category}</span>
                  </p>
                  <p>{selectedNode.document.text}</p>
                </div>
              )}
              {!selectedNode && !!projectedDocuments?.length && (
                <div className="h-100 p-4 d-flex align-items-center justify-content-center">
                  <p className="text-center text-muted">{t("semantic-network-placeholder")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
