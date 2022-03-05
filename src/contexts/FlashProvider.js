import { createContext, useContext, useState, useCallback } from 'react';

export const FlashContext = createContext();
let flashTimer;

export default function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({});
  const [visible, setVisible] = useState(false);

  const hideFlash = useCallback(() => {
    setVisible(false);
  }, []);

  const flash = useCallback((message, type, duration = 10) => {
    if (flashTimer) {
      clearTimeout(flashTimer);
      flashTimer = undefined;
    }
    setFlashMessage({message, type});
    setVisible(true);
    if (duration) {
      flashTimer = setTimeout(hideFlash, duration * 1000);
    }
  }, [hideFlash]);

  return (
    <FlashContext.Provider value={{flash, hideFlash, flashMessage, visible}}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  return useContext(FlashContext).flash;
}
