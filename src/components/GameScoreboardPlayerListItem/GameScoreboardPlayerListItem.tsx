import { useEffect, useState } from 'react';
import { GameData, PlayerData } from '../../pages/GamePage/types';
import { getPlayerById, getRemainingPoints, getThrowSetValue, getThrowValue } from '../../utils';

interface Props {
  game: GameData;
  pid: number;
  isActive: boolean;
}

export default function GameScoreboardPlayerListItem({ game, pid, isActive }: Props) {
  const [player, setPlayer] = useState<PlayerData | null>(null);

  useEffect(() => {
    const player = getPlayerById(game, pid);
    if (player) setPlayer(player);
  }, [game, pid]);

  return (
    <div>
      <div>
        Name: {player?.name} | Points: {getRemainingPoints(game, pid)}{isActive ? " | Active" : ""}
      </div>
      <div>
        {player?.throws.map((tsdata) => (
          <div>
            <div>1: {getThrowValue(tsdata.t1)}</div>
            <div>2: {getThrowValue(tsdata.t2)}</div>
            <div>3: {getThrowValue(tsdata.t3)}</div>
            <div>sum: {getThrowSetValue(tsdata)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
