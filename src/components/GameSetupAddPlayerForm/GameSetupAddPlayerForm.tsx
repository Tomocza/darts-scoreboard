import { useState } from 'react';

interface Props {
  handleSubmit: (name: string) => void;
}

export default function GameSetupAddPlayerForm({ handleSubmit }: Props) {
  const [name, setName] = useState('');

  const addOnClick = () => {
    handleSubmit(name);
    setName('');
  };

  return (
    <div>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={() => addOnClick()}>Add</button>
    </div>
  );
}
