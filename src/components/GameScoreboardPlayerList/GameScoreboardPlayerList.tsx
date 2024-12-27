import { GameData } from '../../pages/GamePage/types';
import GameScoreboardPlayerListItem from '../GameScoreboardPlayerListItem';

interface Props {
  game: GameData;
}

export default function GameScoreboardPlayerList({ game }: Props) {
  return (
    <div>
      {game.players.map((player, idx) => (
        <GameScoreboardPlayerListItem key={`player_${player.id}`} game={game} pid={player.id} isActive={idx === game.currPlayerIdx} />
      ))}
     </div>
  );
}
