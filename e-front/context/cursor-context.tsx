// import React, { createContext, useState } from "react";

// export const CursorContext = createContext();

// const CursorContextProvider = ({ children }) => {
//     const [cursor, setCursor] = useState({ active: false });

//     return (
//         <CursorContext.Provider value={[cursor, setCursor]}>
//             {children}
//         </CursorContext.Provider>
//     );
// };

// export default CursorContextProvider;
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context state
type CursorContextType = {
  cursor: { active: boolean };
  setCursor: React.Dispatch<React.SetStateAction<{ active: boolean }>>;
    position: { clientX: number | 0; clientY: number | 0};
    setPosition: React.Dispatch<React.SetStateAction<{ clientX: number; clientY: number }>>;
};

// Create the context with an initial value
export const CursorContext = createContext<CursorContextType | undefined>(undefined);

type CursorContextProviderProps = {
  children: ReactNode;
};

const CursorContextProvider: React.FC<CursorContextProviderProps> = ({ children }) => {
  const [cursor, setCursor] = useState<{ active: boolean }>({ active: false });
  const [position, setPosition] = useState({ clientX: 0, clientY: 0 });

  return (
    <CursorContext.Provider value={{ cursor, setCursor, position, setPosition }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorContextProvider;
