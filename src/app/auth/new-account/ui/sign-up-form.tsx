"use client";
import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
/* import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react' */
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
import { PasswordInput } from "../../../../components/password-input";
import { login, registerUser } from '@/actions';
import async from '../../../dashboard/admin/pantallas/components/pantallas';

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Por favor ingrese su correo electrónico.' })
      .email({ message: 'Dirección de correo electrónico no válida.' }),      
    password: z
      .string()
      .min(1, {
        message: 'Por favor ingrese su contraseña.',
      })
      .min(7, {
        message: 'La contraseña debe tener al menos 7 caracteres',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading ] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    /* defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }, */
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    const { email, password, confirmPassword } = data;

    // Server action
    const resp = await registerUser( email, password, confirmPassword );
    
    if ( !resp.ok ) {
      setErrorMessage( resp.message );
      return;
    }

    await login( email.toLowerCase(), password );

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    window.location.replace('/');

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
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Crear cuenta
            </Button>          
          </div>
        </form>
      </Form>
    </div>
  )
}
