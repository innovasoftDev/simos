import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Pencil , Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScreensDialogType, useScreensContext } from '../context/screens-context'
import { Screens } from '../data/schema'
import useDialogState from '@/hooks/use-dialog-state';
import { ScreenssActionDialog } from './screens-action-dialog';

interface DataTableRowActionsProps {
  row: Row<Screens>
}

// export function DataTableRowActions({ row }: DataTableRowActionsProps) {
export function DataTableRowActions() {
  const { setOpen, setCurrentRow } = useScreensContext()
  const [open, setOpenModal] = useDialogState<ScreensDialogType>(null);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              // setCurrentRow(row.original)
              setOpenModal('edit')
            }}
          >
            Editar
            <DropdownMenuShortcut>
              <Pencil  size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='!text-red-500'
          >
            Eliminar
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
       <ScreenssActionDialog
                      
                      key="user-add"
                       open={open === "edit"}
                      onOpenChange={() => setOpenModal("edit")}/>
    </>
  )
}
