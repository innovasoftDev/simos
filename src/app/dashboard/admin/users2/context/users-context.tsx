import React from 'react'
//import { User } from '../data/schema'

export type User = {
  id_user: string;
  status: string;
  tbl_usr_roles_id_rol: string;
  email: string;
  image: string | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  emailVerified: Date | null;
  phoneNumber: string | null;
  created: Date | null;
  updated: Date | null;
};

export type UsersDialogType = 'add' | 'edit' | 'delete'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
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
