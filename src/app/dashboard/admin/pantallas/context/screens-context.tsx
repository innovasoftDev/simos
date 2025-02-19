import React from 'react'
import { Screens } from '../data/schema';

export type ScreensDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface ScreensContextType {
  open: ScreensDialogType | null
  setOpen: (str: ScreensDialogType | null) => void
  currentRow: Screens | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Screens | null>>
}

const ScreensContext = React.createContext<ScreensContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: ScreensContextType
}

export default function ScreensContextProvider({ children, value }: Props) {
  return <ScreensContext.Provider value={value}>{children}</ScreensContext.Provider>
}

export const useScreensContext = () => {
  const screensContext = React.useContext(ScreensContext)

  if (!screensContext) {
    throw new Error(
      'useScreensContext has to be used within <ScreensContext.Provider>'
    )
  }

  return screensContext
}