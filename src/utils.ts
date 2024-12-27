import { GameData, ThrowData, ThrowMult, ThrowSetData, ThrowSetEval } from './pages/GamePage/types';

export function getPlayerById(game: GameData, pid: number) {
  return game.players.find((pdata) => pdata.id === pid);
}

export function getCurrentPlayer(game: GameData) {
  const ret = game.players.at(game.currPlayerIdx);
  if (!ret) throw Error('Game current player idx found no player!');
  return ret;
}

export function getThrowValue(tdata: ThrowData | null) {
  if (!tdata) return 0;
  return tdata.raw * tdata.mult;
}

export function getThrowSetValue(tsdata: ThrowSetData) {
  let ret = 0;
  ret += getThrowValue(tsdata.t1);
  ret += getThrowValue(tsdata.t2);
  ret += getThrowValue(tsdata.t3);
  return ret;
}

export function getRemainingPoints(game: GameData, pid: number) {
  const player = getPlayerById(game, pid);
  if (!player) return -1;

  const scored = player.throws
    .filter((tsdata) => tsdata.valid)
    .map((tsdata) => getThrowSetValue(tsdata))
    .reduce((acc, cv) => acc + cv, 0);
  return game.options.startingScore - scored;
}

export function isWinningThrow(
  tdata: ThrowData | null,
  remainingPoints: number,
  exitWithDouble: boolean
) {
  if (!tdata) return false;
  if (remainingPoints - getThrowValue(tdata) !== 0) return false;
  if (exitWithDouble && tdata.mult !== ThrowMult.Double) return false;
  return true;
}

export function getThrowSetEvaluation(
  game: GameData,
  td1: ThrowData | null,
  td2: ThrowData | null,
  td3: ThrowData | null
): ThrowSetEval {
  let remainingPoints = getRemainingPoints(game, getCurrentPlayer(game).id)

  if(isWinningThrow(td1, remainingPoints, game.options.exitWithDouble)) return ThrowSetEval.Winning
  remainingPoints -= getThrowValue(td1)
  if(remainingPoints <= 1) return ThrowSetEval.Invalid

  if(isWinningThrow(td2, remainingPoints, game.options.exitWithDouble)) return ThrowSetEval.Winning
  remainingPoints -= getThrowValue(td2)
  if(remainingPoints <= 1) return ThrowSetEval.Invalid

  if(isWinningThrow(td3, remainingPoints, game.options.exitWithDouble)) return ThrowSetEval.Winning
  remainingPoints -= getThrowValue(td3)
  if(remainingPoints <= 1) return ThrowSetEval.Invalid

  return ThrowSetEval.Normal
}
