import { ChangeEvent, useState } from 'react';

type MassInputProps = {
  onMassChange: (mass: number) => void;
}

const MassInput = ({ onMassChange }: MassInputProps) => {
  const [mass, setMass] = useState('');

  const handleMassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMass(event.target.value);
    onMassChange(parseInt(event.target.value));
  }

  return (
    <input
      type="number"
      name="mass"
      id="mass"
      placeholder="Meteorite Mass"
      value={mass}
      onChange={handleMassChange}
      min={0}
      max={Number.MAX_VALUE}
    />
  );
};

export default MassInput;
