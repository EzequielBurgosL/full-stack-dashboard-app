import React, { createContext, useState, PropsWithChildren } from 'react';

export type TimeRangeContextType = {
  selectedValue: string;
  setSelectedValue: (str: string) => void;
} 

export const TimeRangeContext = createContext<TimeRangeContextType | null>(null);

export function TimeRangeProvider({ children }: PropsWithChildren<{}>) {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <TimeRangeContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </TimeRangeContext.Provider>
  );
};