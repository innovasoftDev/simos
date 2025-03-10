import { useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { UsersActionDialog } from './users-action-dialog'

export function UserPrimaryActions() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className='flex gap-2'>
        <Button onClick={() => setOpen(true)}>
          Agregar Usuario
          <IconUserPlus />
        </Button>
      </div>

      <UsersActionDialog key='user-add' open={open} onOpenChange={setOpen} />
    </>
  )
}
