import {
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from 'react';
import useClickOutside from '../hooks/useClickOutside';
import './Autocomplete.css';

type AutocompleteProps = {
  inputName: string;
  placeholder: string;
  forceValue: string;
  onSelect: (option: Option) => void;
  options: Option[];
}

type Option = string | number;

const Autocomplete = ({
  inputName,
  placeholder,
  forceValue,
  onSelect,
  options,
}: AutocompleteProps) => {
  const [optionSelected, setOptionSelected] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [autocompleteText, setAutocompleteText] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (forceValue) {
      setValue(forceValue.toString());
      setOptionSelected(true);
    }
  }, [forceValue]);

  useEffect(() => {
    if (value === filteredOptions[0]?.toString()) {
      setOptionSelected(true);
    } else if (value) {
      setOptionSelected(false);

      const filteredOptions = options.filter((option) => option.toString()
      ?.match(new RegExp(`^${value}`)));
      setFilteredOptions(filteredOptions);

      const autocompletePosition = getAutocompletePosition(
        filteredOptions[0]
        ?.toString(),
        value
      );
      setAutocompleteText([
        filteredOptions[0]
        ?.toString()
        .slice(0, autocompletePosition + 1),
        filteredOptions[0]
        ?.toString()
        .slice(autocompletePosition + 1)
      ]);
    } else {
      setFilteredOptions(options);
      setAutocompleteText([]);
      setOptionSelected(false);
      onSelect('');
    }
  }, [value, options]);

  const getAutocompletePosition = (string1: string, string2: string): number => {
    let lastIndex = -1;

    for (let i = 0; i < string2.length; i++) {
      if (string1?.includes(string2[i])) {
        lastIndex = i;
      }
    }

    return lastIndex;
  }

  const onFocus = (): void => {
    setMenuOpen(true);
  }

  const handleOnBlur = (): void => {
    setMenuOpen(false);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setValue(value);
  }

  const handleOnSelect = (option: Option): void => {
    setValue(option.toString());
    setOptionSelected(true);
    setMenuOpen(false);
    onSelect(option);
  }

  const clickOutside = () => {
    setMenuOpen(false)
    handleOnBlur()
  }
  useClickOutside({ ref: wrapperRef, onClickOutside: clickOutside })

    return (
      <div className="autocomplete_container">
        <div className="autocomplete_menu_container">
          <div
            className="autocomplete_input_container"
            ref={wrapperRef as MutableRefObject<HTMLDivElement>}
          >
            <input
              type="text"
              id={inputName}
              name={inputName}
              placeholder={placeholder}
              value={value}
              onChange={handleOnChange}
              onFocus={onFocus}
              onBlur={handleOnBlur}
              role="combobox"
              aria-autocomplete="both"
              aria-expanded={menuOpen}
              aria-controls="autocomplete-menu"
            />
            {menuOpen && !optionSelected
              ? (
                <div className="autocomplete_text">
                  <span className="hidden">{autocompleteText[0]}</span>
                  <span className="highlighted">{autocompleteText[1]}</span>
                </div>
              ) : null
            }
          </div>
          {menuOpen && (
            <div
              id="autocomplete-menu"
              className="autocomplete_menu"
              role="listbox"
              aria-labelledby={inputName}
            >
              <ul>
                {filteredOptions.map((option) => (
                  <li key={option} onMouseDown={() => handleOnSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
;

export default Autocomplete;
