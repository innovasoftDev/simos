'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { userTypes } from '../data/data'
import { Screens } from '../data/schema'
import { Switch } from "@/components/ui/switch";



const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Nombre Requerido.' }),
    lastName: z.string().min(1, { message: 'Descripción Requerida.' }),
    username: z.string().min(1, { message: '' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Email is invalid.' }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: 'Role is required.' }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
    status: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password is required.',
          path: ['password'],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must be at least 8 characters long.',
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one lowercase letter.',
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must contain at least one number.',
          path: ['password'],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ['confirmPassword'],
        })
      }
    }
  })
type ScreensForm = z.infer<typeof formSchema>

interface Props {
  isEdit: boolean 
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScreenssActionDialog({ open, onOpenChange, isEdit }: Props) {
  // const isEdit = !!currentRow
  const form = useForm<ScreensForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          role: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          status: true,
        },
        mode: "onChange", // Valida en cada cambio
  })

  const { 
      setValue, // <-- Add the setValue prop
      handleSubmit,
      control,
  } = form;
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof z.infer<typeof formSchema>
  ) => {
    const { value } = e.target; // <-- Extract the value
    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true }); // <-- Set the form value
    console.log(`${fieldName}: `, value);  };

  const onSubmit = (values: ScreensForm) => {
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Editar la pantalla aquí' : 'Agregar Nueva Pantalla. '}</DialogTitle>
          {/* <DialogTitle>{'Agregar pantalla'}</DialogTitle> */}
          <DialogDescription>
            {isEdit ? 'Actualiza la pantalla aquí. Haga clic en guardar cuando haya terminado. ' : 'Crea una nueva pantalla. Haga clic en guardar cuando haya terminado. '}
            {'' }
            {/* Agregar una nueva pantalla. Haga clic en guardar cuando haya terminado. */}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
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
                        maxLength={20}
                        {...field}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>

                  
                                   
                )}
              />

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
                        maxLength={20}
                        {...field}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>

                                   
                )}
              />
              
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-right'>
                      Estado
                    </FormLabel>
                    <FormControl>
                    <Switch {...field}/>

                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>

                                   
                )}
              />
            
            
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}