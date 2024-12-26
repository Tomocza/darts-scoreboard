import { PlayerData } from '../../pages/GamePage/types';

interface Props {
  playerData: PlayerData;
  handleDelete: (id: number) => void;
}

export default function GameSetupPlayerListItem({ playerData, handleDelete }: Props) {
  return (
    <div>
      <div>Name: {playerData.name}</div>
      <button onClick={() => handleDelete(playerData.id)}>Delete</button>
    </div>
  );
}
