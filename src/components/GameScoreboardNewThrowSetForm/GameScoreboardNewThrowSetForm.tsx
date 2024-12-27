import { useState } from 'react';
import { ThrowData, ThrowMult } from '../../pages/GamePage/types';

interface Props {
  handleSubmit: (td1: ThrowData | null, td2: ThrowData | null, td3: ThrowData | null) => void;
}

export default function GameScoreboardNewThrowSetForm({ handleSubmit }: Props) {
  const [throwInput1, setThrowInput1] = useState('');
  const [throwData1, setThrowData1] = useState<ThrowData | null>(null);
  const [throwInput2, setThrowInput2] = useState('');
  const [throwData2, setThrowData2] = useState<ThrowData | null>(null);
  const [throwInput3, setThrowInput3] = useState('');
  const [throwData3, setThrowData3] = useState<ThrowData | null>(null);

  return (
    <div>
      <div>
        <div>Value: {JSON.stringify(throwData1)}</div>
        <input value={throwInput1} onChange={(event) => setThrowInput1(event.target.value)} />
        <button onClick={() => setThrowData1(inputStringToThrowData(throwInput1))}>Set</button>
      </div>
      <div>
        <div>Value: {JSON.stringify(throwData2)}</div>
        <input value={throwInput2} onChange={(event) => setThrowInput2(event.target.value)} />
        <button onClick={() => setThrowData2(inputStringToThrowData(throwInput2))}>Set</button>
      </div>
      <div>
        <div>Value: {JSON.stringify(throwData3)}</div>
        <input value={throwInput3} onChange={(event) => setThrowInput3(event.target.value)} />
        <button onClick={() => setThrowData3(inputStringToThrowData(throwInput3))}>Set</button>
      </div>
      <button onClick={() => handleSubmit(throwData1, throwData2, throwData3)}>Submit</button>
    </div>
  );
}

function inputStringToThrowData(str: string): ThrowData {
  const re = /^(?<mult>[dt]?)(?<raw>\d{1,2})$/;
  const match = re.exec(str);
  if (!match) throw Error('Invalid throw input!');

  const rawStr = match.groups!['raw'];
  const multStr = match.groups!['mult'];

  const rawVal = parseInt(rawStr);
  if (isNaN(rawVal) || rawVal < 0 || (rawVal > 20 && rawVal !== 25)) throw Error('Invalid throw raw value!');

  let multVal: ThrowMult;
  switch (multStr) {
    case '':
      multVal = ThrowMult.Single;
      break;
    case 'd':
      multVal = ThrowMult.Double;
      break;
    case 't':
      multVal = ThrowMult.Triple;
      break;
    default:
      throw Error('Invalid throw mult value!');
  }

  return { raw: rawVal, mult: multVal };
}
