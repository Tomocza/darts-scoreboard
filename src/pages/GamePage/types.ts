interface GameData {
  state: GameState;
  players: PlayerData[];
}

interface PlayerData {
  id: number;
  name: string;
  throws: ThrowSetData[];
}

interface ThrowSetData {
  pid: number;
  round: number;
  t1: ThrowData;
  t2: ThrowData;
  t3: ThrowData;
}

interface ThrowData {
  raw: number;
  mult: number;
}

enum GameState {
  Setup,
  InProgress,
  Completed,
}

export type { GameData, PlayerData, ThrowSetData, ThrowData };
export { GameState };
