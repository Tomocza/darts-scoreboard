import { useState } from 'react';
import { GameData, GameState, PlayerData } from './types';
import GameSetupAddPlayerForm from '../../components/GameSetupAddPlayerForm';
import GameSetupPlayerListItem from '../../components/GameSetupPlayerListItem';

export default function GamePage() {
  const [game, setGame] = useState<GameData>(createNewGame());

  const addNewPlayer = (name: string) => {
    const nextId =
      game.players.map((pdata) => pdata.id).reduce((acc, cv) => Math.max(acc, cv), 0) + 1;
    const pdata: PlayerData = {
      id: nextId,
      name: name,
      throws: [],
    };
    const newGame = { ...game };
    newGame.players.push(pdata);
    setGame(newGame);
  };

  const deletePlayer = (id: number) => {
    const newPlayerList = game.players.filter((pdata) => pdata.id !== id);
    const newGame = { ...game, players: newPlayerList };
    setGame(newGame);
  };

  const renderGameSetup = () => {
    return (
      <div>
        <GameSetupAddPlayerForm handleSubmit={addNewPlayer} />
        <div>Players</div>
        {game.players.map((pdata) => (
          <GameSetupPlayerListItem playerData={pdata} handleDelete={deletePlayer}/>
        ))}
      </div>
    );
  };

  const renderActiveGame = () => {
    return <div>this is where you play the game.</div>;
  };

  const renderCompletedGame = () => {
    return <div>this is when the game is done.</div>;
  };

  switch (game.state) {
    case GameState.Setup:
      return renderGameSetup();
    case GameState.InProgress:
      return renderActiveGame();
    case GameState.Completed:
      return renderCompletedGame();
  }
}

function createNewGame() {
  const ret: GameData = {
    state: GameState.Setup,
    players: [],
  };
  return ret;
}
