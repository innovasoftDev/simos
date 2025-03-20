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
import { PasswordInput } from "../../../../components/password-input";
import { login, registerUser } from '@/actions';

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

// REGEX sin especiales
const emailRegex = /^[a-zA-Z0-9@._]+$/;
const passwordRegex = /^[a-zA-Z0-9]+$/;

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Por favor ingrese su correo electrónico.' })
      .email({ message: 'Dirección de correo electrónico no válida.' }),
      
    password: z
      .string()
      .min(1, { message: 'Por favor ingrese su contraseña.' })
      .min(7, { message: 'La contraseña debe tener al menos 7 caracteres.' }),
      
    confirmPassword: z
      .string()
      .min(1, { message: 'Por favor confirme su contraseña.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ['confirmPassword'],
  });

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Nueva lógica: FILTRO hard antes de permitir escribir
  const handleInput = (value: string, regex: RegExp, setError: any) => {
    if (value.length > 30) {
      setError("Máximo 30 caracteres.");
      return value.slice(0, 30); // Recorta al máximo permitido
    }
    if (!regex.test(value)) {
      setError("¡No se permiten caracteres especiales!");
      // Elimina el último carácter ingresado
      return value.slice(0, -1);
    }
    setError("");
    return value;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { email, password, confirmPassword } = data;

    const resp = await registerUser(email, password, confirmPassword);
    
    if (!resp.ok) {
      setErrorMessage(resp.message);
      setIsLoading(false)
      return;
    }

    await login(email.toLowerCase(), password);

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

            {/* EMAIL */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='name@example.com' 
                      {...field} 
                      value={field.value || ''}
                      onChange={(e) => {
                        const filtered = handleInput(e.target.value, emailRegex, setEmailError);
                        field.onChange(filtered);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex justify-between'>
                    <FormLabel>Contraseña</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput 
                      placeholder='********' 
                      {...field} 
                      value={field.value || ''}
                      onChange={(e) => {
                        const filtered = handleInput(e.target.value, passwordRegex, setPasswordError);
                        field.onChange(filtered);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                </FormItem>
              )}
            />

            {/* CONFIRM PASSWORD */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput 
                      placeholder='********' 
                      {...field} 
                      value={field.value || ''}
                      onChange={(e) => {
                        const filtered = handleInput(e.target.value, passwordRegex, setConfirmPasswordError);
                        field.onChange(filtered);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {confirmPasswordError && <p className="text-sm text-red-500">{confirmPasswordError}</p>}
                </FormItem>
              )}
            />

            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{errorMessage}</div>
            )}

            <Button className='mt-2' disabled={isLoading}>
              Crear cuenta
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
