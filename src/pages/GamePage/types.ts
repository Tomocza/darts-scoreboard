export interface GameData {
  state: GameState;
  currPlayerIdx: number;
  players: PlayerData[];
  options: GameOptions;
}

export interface GameOptions {
  startingScore: number;
  exitWithDouble: boolean;
}

export interface PlayerData {
  id: number;
  name: string;
  throws: ThrowSetData[];
}

export interface ThrowSetData {
  valid: boolean;
  t1: ThrowData | null;
  t2: ThrowData | null;
  t3: ThrowData | null;
}

export interface ThrowData {
  raw: number;
  mult: ThrowMult;
}

export enum ThrowMult {
  Single = 1,
  Double = 2,
  Triple = 3,
}

export enum GameState {
  Setup,
  InProgress,
  Completed,
}

export enum ThrowSetEval {
  Normal,
  Invalid,
  Winning,
}
