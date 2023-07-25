import React, { useEffect, useState } from 'react';

type AutocompleteProps = {
  inputName: string;
  placeholder: string;
  onSelect: (option: Option) => void;
  options: Option[];
  defaultOption?: Option;
}

type Option = string | number;

const Autocomplete = ({
  inputName,
  placeholder,
  onSelect,
  options,
  defaultOption
}: AutocompleteProps) => {
    const [value, setValue] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [autocompleteText, setAutocompleteText] = useState<string[]>([]);

    useEffect(() => {
      if (defaultOption) {
        setValue(defaultOption.toString());
      }
    }, [defaultOption]);

    useEffect(() => {
      if (value) {
        setFilteredOptions(options.filter((option) => option.toString().includes(value)));
        const filteredOptions = options.filter((option) => option.toString().includes(value));
        setAutocompleteText([
          filteredOptions[0]
            .toString()
            .slice(
              0,
              getAutocompletePosition(
                filteredOptions[0]
                  .toString(),
                  value
              ) + 1
            ),
          filteredOptions[0]
            .toString()
            .slice(
              getAutocompletePosition(
                filteredOptions[0]
                .toString(),
                value
              ) + 1
            )
        ]);
        setFilteredOptions(filteredOptions);
      } else {
        setFilteredOptions(options);
        setAutocompleteText([]);
      }
    }, [value, options]);

    const getAutocompletePosition = (string1: string, string2: string): number => {
      let lastIndex = -1;

      for (let i = 0; i < string2.length; i++) {
        if (string1.includes(string2[i])) {
          lastIndex = i;
        }
      }

      return lastIndex;
    }

    const onFocus = (): void => {
      setMenuOpen(true);
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      setValue(value);
    }

    const handleOnSelect = (option: Option): void => {
      setValue(option.toString());
      setMenuOpen(false);
      onSelect(option);
    }

    return (
      <>
        <input
          type="text"
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onFocus={onFocus}
          role="combobox"
          aria-autocomplete="both"
          aria-expanded={menuOpen}
          aria-controls="autocomplete-menu"
        />
        <div>
          <span>{autocompleteText[0]}</span>--
          <span>{autocompleteText[1]}</span>
        </div>
        {menuOpen && (
          <div
            id="autocomplete-menu"
            role="listbox"
            aria-labelledby={inputName}
          >
            <ul>
              {filteredOptions.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleOnSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
;

export default Autocomplete;