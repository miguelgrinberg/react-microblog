import { createContext, useContext, useState, useCallback } from 'react';

export const FlashContext = createContext();
let flashId = 0;

export default function FlashProvider({ children }) {
  const [flashMessages, setFlashMessages] = useState([]);

  const hideMessage = useCallback(id => {
    const deleteMessage = id => {
      setFlashMessages(messages => {
        return messages.filter(message => message.id !== id);
      });
    };

    setFlashMessages(messages => {
      return messages.map(message => (message.id === id) ? {...message, visible: false} : message);
    });
    setTimeout(deleteMessage.bind(null, id), 2000);
  }, []);

  const flash = useCallback((message, type, duration = 10) => {
    const id = ++flashId;
    setFlashMessages(messages => [...messages, {id, message, type, visible: true}]);
    if (duration) {
      setTimeout(hideMessage.bind(null, id), duration * 1000);
    }
  }, [hideMessage]);

  return (
    <FlashContext.Provider value={{flash, flashMessages, hideMessage}}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  return useContext(FlashContext).flash;
}
