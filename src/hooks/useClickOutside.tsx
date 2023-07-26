import { MutableRefObject, useEffect } from 'react';

type ClickOutsideProps = {
  ref: MutableRefObject<any>;
  onClickOutside: () => void;
}

const useClickOutside = ({ ref, onClickOutside }: ClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current?.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return {

  }
}

export default useClickOutside;
