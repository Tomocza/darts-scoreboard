import { useState } from 'react';
import { GameData, GameState, PlayerData, ThrowData, ThrowSetData, ThrowSetEval } from './types';
import GameSetupAddPlayerForm from '../../components/GameSetupAddPlayerForm';
import GameSetupPlayerListItem from '../../components/GameSetupPlayerListItem';
import GameScoreboardPlayerList from '../../components/GameScoreboardPlayerList';
import { getCurrentPlayer, getThrowSetEvaluation } from '../../utils';
import GameScoreboardNewThrowSetForm from '../../components/GameScoreboardNewThrowSetForm';

export default function GamePage() {
  const [game, setGame] = useState<GameData>(createNewGame());

  const startGame = () => {
    setGame({
      ...game,
      state: GameState.InProgress,
    });
  };

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
        <button onClick={() => startGame()}>Start game</button>
        <GameSetupAddPlayerForm handleSubmit={addNewPlayer} />
        <div>Players</div>
        {game.players.map((pdata) => (
          <GameSetupPlayerListItem
            key={`player_${pdata.id}`}
            playerData={pdata}
            handleDelete={deletePlayer}
          />
        ))}
      </div>
    );
  };

  const addThrowSetToActivePlayer = (
    td1: ThrowData | null,
    td2: ThrowData | null,
    td3: ThrowData | null
  ) => {
    const throwEval = getThrowSetEvaluation(game, td1, td2, td3);
    const newThrowSet: ThrowSetData = {
      valid: throwEval !== ThrowSetEval.Invalid,
      t1: td1,
      t2: td2,
      t3: td3,
    };
    const newGame = { ...game };
    const pdata = getCurrentPlayer(newGame);
    pdata.throws.push(newThrowSet);
    if (throwEval === ThrowSetEval.Winning) newGame.state = GameState.Completed;
    setGame(newGame);
  };

  const renderActiveGame = () => {
    return (
      <div>
        <GameScoreboardNewThrowSetForm handleSubmit={addThrowSetToActivePlayer} />
        <GameScoreboardPlayerList game={game} />
      </div>
    );
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
    currPlayerIdx: 0,
    players: [],
    options: {
      startingScore: 301,
      exitWithDouble: true,
    },
  };
  return ret;
}
