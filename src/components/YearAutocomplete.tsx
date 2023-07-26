import { Dispatch, SetStateAction } from 'react';
import Autocomplete from './Autocomplete';

type YearAutocompleteProps = {
  yearsArray: number[];
  forceValue: string;
  setOption: Dispatch<SetStateAction<number>>;
}

const YearAutocomplete = ({ yearsArray, forceValue, setOption }: YearAutocompleteProps) => (
  <Autocomplete
    inputName="year"
    placeholder="Select year"
    forceValue={forceValue?.toString()}
    onSelect={(optionValue) => setOption(optionValue as number)}
    options={yearsArray}
  />
);

export default YearAutocomplete;
