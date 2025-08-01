import React from 'react'
import { Server } from '../data/schema'

export type UsersDialogType = 'add' | 'edit' | 'delete' | 'consult'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: Server | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Server | null>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: UsersContextType
}

export default function UsersContextProvider({ children, value }: Props) {
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export const useUsersContext = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error(
      'useUsersContext has to be used within <UsersContext.Provider>'
    )
  }

  return usersContext
}
