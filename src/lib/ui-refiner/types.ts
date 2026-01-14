export type NodeType =
  | 'frame'
  | 'container'
  | 'text'
  | 'image'
  | 'icon'
  | 'button';

export interface LayoutMetrics {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutMode {
  display: 'block' | 'flex' | 'grid' | 'absolute';
  flexDirection?: 'row' | 'column';
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
}

export interface LayoutNode {
  id: string; // figmaId or dom-selector
  name?: string; // e.g., "MenuCardTitle"
  type: NodeType;
  textContent?: string;
  role?: string; // from DOM or inferred
  metrics: LayoutMetrics;
  layoutMode: LayoutMode;
  children: LayoutNode[];
}

export type DiffKind =
  | 'missing_node'
  | 'extra_node'
  | 'layout_mode_mismatch'
  | 'position_mismatch'
  | 'spacing_mismatch'
  | 'size_mismatch'
  | 'alignment_mismatch';

export interface LayoutSuggestion {
  targetComponent: string; // e.g. 'ResultPage', 'MenuCard'
  changeType: 'refactor_layout' | 'wrap_in_container' | 'extract_component';
  targetTailwind?: string; // e.g., "flex flex-col items-center gap-4"
  notes?: string; // e.g., "Keep decor images absolute inside relative wrapper"
}

export interface LayoutDiffItem {
  id: string; // reference to design or runtime node
  kind: DiffKind;
  severity: 'info' | 'warn' | 'error';
  design?: Partial<LayoutNode>;
  runtime?: Partial<LayoutNode>;
  suggestion?: LayoutSuggestion;
}

export interface LayoutDiff {
  targetFile: string; // "src/pages/ResultPage.tsx"
  designFrameId: string;
  urlOrStoryId: string; // story-id or route
  items: LayoutDiffItem[];
  summary: {
    errorCount: number;
    warnCount: number;
    score: number; // 0..1, 1 = perfect match
  };
}
