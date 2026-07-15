import React, { useEffect, useMemo } from "react";
import {
  OpenSeadragonAnnotationPopup,
  OpenSeadragonAnnotator,
  OpenSeadragonViewer,
  UserSelectAction,
  useAnnotator,
} from "@annotorious/react";

import CommentPopup from "../CommentPopup/CommentPopup";
import { UziDrawingTool } from "../../../types";

interface OSDViewerProps {
  drawingEnable?: boolean;
  needPopup?: boolean;
  tool: UziDrawingTool;
  imageUrl: string;
  onDeleteSegment?: (segmentId: string) => void;
  onUndoDeleteSegment?: (segmentId: string) => void;
  onViewerReady?: (viewer: OpenSeadragon.Viewer | null) => void;
}

const OSDViewerContent: React.FC<OSDViewerProps> = ({
  drawingEnable = false,
  needPopup = false,
  imageUrl,
  onDeleteSegment,
  onUndoDeleteSegment,
  onViewerReady,
}) => {
  const annotator = useAnnotator();

const viewerOptions = useMemo(
  () => ({
    tileSources: {
      type: "image" as const,
      url: imageUrl,
    },
    prefixUrl: "/openseadragon-images/",
    maxZoomLevel: 15,
    minZoomLevel: 0.5,
    gestureSettingsMouse: {
      clickToZoom: false,
      dragToPan: !drawingEnable,
    },
  }),
  [imageUrl, drawingEnable]
);

  useEffect(() => {
    if (!annotator || !onViewerReady) return;

    const osdViewer = (annotator as unknown as { viewer?: OpenSeadragon.Viewer }).viewer ?? null;
    onViewerReady(osdViewer);

    return () => {
      onViewerReady(null);
    };
  }, [annotator, onViewerReady]);

  return (
    <>
      <OpenSeadragonViewer options={viewerOptions} className="osd" />
      {needPopup && (
        <OpenSeadragonAnnotationPopup
          popup={(props) => (
            <CommentPopup
              {...props}
              isEditingMode={drawingEnable}
              onDeleteSegment={onDeleteSegment}
              onUndoDeleteSegment={onUndoDeleteSegment}
            />
          )}
        />
      )}
    </>
  );
};

const OSDViewer: React.FC<OSDViewerProps> = (props) => {
  const { imageUrl, drawingEnable = false, tool, needPopup, onDeleteSegment, onUndoDeleteSegment, onViewerReady } = props;

  return imageUrl !== "" ? (
    <OpenSeadragonAnnotator
      drawingEnabled={drawingEnable}
      tool={drawingEnable ? tool : undefined}
      userSelectAction={!drawingEnable ? UserSelectAction.SELECT : UserSelectAction.EDIT}
    >
      <OSDViewerContent
        drawingEnable={drawingEnable}
        needPopup={needPopup}
        tool={tool}
        imageUrl={imageUrl}
        onDeleteSegment={onDeleteSegment}
        onUndoDeleteSegment={onUndoDeleteSegment}
        onViewerReady={onViewerReady}
      />
    </OpenSeadragonAnnotator>
  ) : (
    <p style={{ width: "100%", height: "100%", margin: 0 }}>Изображение отсутствует</p>
  );
};

export default OSDViewer;