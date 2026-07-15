import type { CtViewerConfig } from "@medml/ct-mri-viewer";

/**
 * Конфиг просмотрщика: снимки из public/dicoms.
 * Яркость при открытии берётся из DICOM (WC/WW); modality влияет только на запасной VOI, если тегов нет.
 */
export const defaultViewerConfig: CtViewerConfig = {
  pacsBasePath: "/dicoms",
  series: [{ id: "S1", sliceStart: 0, sliceCount: 14 }, { id: "S2", sliceStart: 0, sliceCount: 14 }, { id: "S3", sliceStart: 0, sliceCount: 18 }],
  modality: "MR",
};
