"use client";
import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor ingrese su correo electrónico.' })
    .max(30, { message: 'Máximo 30 caracteres.' })
    .email({ message: 'Dirección de correo electrónico no válida' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Correo inválido.' }),
})

export function OtpForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [charWarning, setCharWarning] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    
    if (/[^a-zA-Z0-9.@+-]/.test(value)) {
      setCharWarning('¡No se permiten caracteres especiales!');
      return;
    }
    if (value.length > 30) {
      setCharWarning('Máximo 30 caracteres permitidos.');
      return;
    }
    setCharWarning('');
    form.setValue('email', value, { shouldDirty: true, shouldValidate: true });
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    //console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    //window.location.replace("/auth/otp");
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='nombre@ejemplo.com' {...field} onChange={handleChange} />
                  </FormControl>
                  {charWarning && <p className='text-red-700 text-sm font-medium'>{charWarning}</p>}
                  <FormMessage className='text-red-700 text-sm font-medium' />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}