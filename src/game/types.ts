export type Point = { x: number; y: number };
export type UnlockKind = 'costumes' | 'headwear' | 'accessories' | 'colors';
export type UnlockReward = { kind: UnlockKind; id: string; name: string; image?: string };
export type PuzzlePiece = {
  id: string; label: string; note: string; asset: string;
  bounds: [number, number, number, number]; initialPosition: Point; zIndex: number;
};
export type PuzzleLevel = {
  id: string; name: string; gender: 'nam' | 'nu'; difficulty: string;
  description: string; period: string; features: string[]; usage: string[];
  learning: string; thumbnail: string; base: string; baseFront: string; dimensions: [number, number];
  figure: Point; scale: number; prerequisites: string[];
  pieces: PuzzlePiece[]; rewards: UnlockReward[]; outfitId: string;
};
export type ChallengeType = 'assemble' | 'image-grid' | 'detective' | 'reconstruction';
export type ChallengeMeta = Pick<PuzzleLevel, 'id' | 'name' | 'gender' | 'difficulty' | 'description' | 'period' | 'features' | 'usage' | 'learning' | 'thumbnail' | 'prerequisites' | 'rewards' | 'outfitId'> & {
  type: ChallengeType; title: string; gameLabel: string; total: number;
};
export type AssembleChallengeData = ChallengeMeta & {type:'assemble';costume:PuzzleLevel};
export type ImageGridChallengeData = ChallengeMeta & {type:'image-grid';image:string;imageAspect:number;gridSize:3;previewMs:number;previewLimit:number};
export type WardrobeLook = {headwear:string;footwear:string;jewelry:string[];handheld:string;genz:string[]};
export type DetectiveOption = {id:string;label:string;look:Partial<WardrobeLook>};
export type DetectiveError = {id:string;label:string;bounds:[number,number,number,number];genzKeys?:string[];correctOption:string;options:DetectiveOption[];learning:string};
export type DetectiveChallengeData = ChallengeMeta & {type:'detective';modelId:string;dimensions:[number,number];initialLook:WardrobeLook;errors:DetectiveError[]};
export type ReconstructionChoice = {id:string;label:string;asset:string;wardrobeItemId?:string};
export type ReconstructionSlot = {id:string;label:string;correctChoice:string;choices:ReconstructionChoice[]};
export type ReconstructionChallengeData = ChallengeMeta & {type:'reconstruction';costume:PuzzleLevel;scenario:{character:string;occasion:string;mission:string};slots:ReconstructionSlot[]};
export type Challenge = AssembleChallengeData | ImageGridChallengeData | DetectiveChallengeData | ReconstructionChallengeData;
export type GridRun = {type:'image-grid';tiles:number[];moves:number;previewsUsed:number;previewSeen:boolean};
export type DetectiveRun = {type:'detective';fixed:string[];attempts:number};
export type ReconstructionRun = {type:'reconstruction';choices:Record<string,string>;submissions:number;lastAccuracy:number|null};
export type ChallengeRun = GridRun | DetectiveRun | ReconstructionRun;
export type BestResult = {actions:number;previews:number;total:number;completedAt:number};
export type UnlockedItems = Record<UnlockKind,string[]>;
export type Progress = {
  version:3;completed:string[];placed:Record<string,string[]>;activeLevel:string;unlockedCostumeFamilies:string[];
  runs:Record<string,ChallengeRun>;best:Record<string,BestResult>;unlockedItems:UnlockedItems;
  migrated:boolean;
};
