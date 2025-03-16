'use client'

import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from "@/components/ui/switch";
import React, { useState } from 'react'

const formSchema = {
  firstName: '',
  lastName: '',
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  status: true,
};

type ScreensForm = typeof formSchema

interface Props {
  isEdit: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScreenssActionDialog({ open, onOpenChange, isEdit }: Props) {
  const [warningMessage, setWarningMessage] = useState<string | null>(null)

  const form = useForm<ScreensForm>({
    defaultValues: formSchema,
    mode: "onChange",
  })

  const {
    setValue,
    handleSubmit,
  } = form;

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof ScreensForm
  ) => {
    let value = e.target.value;

    if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      setWarningMessage("No se permiten caracteres especiales.");
      return;
    }

    if (value.length > 30) {
      setWarningMessage("Máximo 30 caracteres permitidos.");
      value = value.slice(0, 30);
    } else {
      setWarningMessage(null);
    }

    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = (values: ScreensForm) => {
    toast({
      title: 'Se guardaron los siguientes datos:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    form.reset()
    onOpenChange(false)
  }

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={(state) => { form.reset(); onOpenChange(state); }}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Editar la pantalla aquí' : 'Agregar Nueva Pantalla.'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Actualiza la pantalla aquí. Haga clic en guardar cuando haya terminado.' : 'Crea una nueva pantalla. Haga clic en guardar cuando haya terminado.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form id='user-form' onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-0.5'>

              {/* Nombre de la pantalla */}
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Nombre de la pantalla
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ingrese el nombre de la pantalla'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        onChange={(e) => handleNameChange(e, field.name)}
                      />
                    </FormControl>
                    {warningMessage && (
                      <FormMessage className='text-red-600 col-span-4 col-start-3'>{warningMessage}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Descripción de la pantalla */}
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Descripción de la pantalla
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ingrese descripción de la pantalla'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                        onChange={(e) => handleNameChange(e, field.name)}
                      />
                    </FormControl>
                    {warningMessage && (
                      <FormMessage className='text-red-600 col-span-4 col-start-3'>{warningMessage}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Estado */}
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Estado
                    </FormLabel>
                    <FormControl>
                      <Switch checked={!!field.value} onCheckedChange={(checked) => setValue('username', checked ? 'activo' : 'inactivo')} />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant='outline' type='button' onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type='submit' form='user-form'>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
