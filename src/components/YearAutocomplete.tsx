import React, { useState } from 'react';
import Autocomplete from './Autocomplete';

type YearAutocompleteProps = {
  minYear: number;
  maxYear: number;
}

const YearAutocomplete = ({ minYear, maxYear }: YearAutocompleteProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('');

  return (
    <Autocomplete
      inputName="test"
      placeholder="Select year"
      onSelect={(optionValue) => setSelectedYear(optionValue.toString())}
      options={[2019, 2020, 2021]}
    />
  );
};

export default YearAutocomplete;