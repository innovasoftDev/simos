'use client'

import { useState } from 'react'
import { TriangleAlert } from 'lucide-react';
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Service, User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Service
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.id) return

    onOpenChange(false)
    toast({
      title: 'The following user has been deleted:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <TriangleAlert
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Eliminar Servicio
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            ¿Estás segura de que quieres eliminar?{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            Esta acción eliminará permanentemente al servicio con el status de{' '}
            <span className='font-bold'>
              {currentRow.status.toUpperCase()}
            </span>{' '}
            del sistema. Esto no se puede deshacer.
          </p>

          <Label className='my-2'>
            Nombre de servicio:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Introduzca el nombre de usuario para confirmar la eliminación.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>¡Advertencia!</AlertTitle>
            <AlertDescription>
              Tenga cuidado, esta operación no se puede revertir.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
