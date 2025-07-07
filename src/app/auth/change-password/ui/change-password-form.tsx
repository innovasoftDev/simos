"use client";
import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "../../../../components/password-input";
import { CambiarContrasenia } from "@/actions/auth/change-password";
import { useSearchParams } from "next/navigation"


type SignUpFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email requerido." })
      .email({ message: "Formato de email inválido." })
      .max(30, { message: "Máximo 30 caracteres." }),
    password: z
      .string()
      .regex(/[A-Z]/, {
        message: "Debe contener al menos una letra mayúscula.",
      })
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
      .regex(/\d/, { message: "Debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Debe contener al menos un carácter especial.",
      })
      .transform((pwd) => pwd.trim()),
    confirmPassword: z
      .string()
      .regex(/[A-Z]/, {
        message: "Debe contener al menos una letra mayúscula.",
      })
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
      .regex(/\d/, { message: "Debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Debe contener al menos un carácter especial.",
      })
      .transform((pwd) => pwd.trim()),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    // Validación de contraseña mínima
    if (password !== "") {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contraseña requerida.",
          path: ["password"],
        });
      }
      if (password.length < 7) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe tener al menos 8 caracteres.",
          path: ["password"],
        });
      }
      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe contener una letra minúscula.",
          path: ["password"],
        });
      }
      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe contener un número.",
          path: ["password"],
        });
      }
      // Validación de confirmación de contraseña
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Las contraseñas no coinciden.",
          path: ["confirmPassword"],
        });
      }
    }
  });

export function ChangePasswordForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  type UserForm = z.infer<typeof formSchema>;

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email!,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await CambiarContrasenia(data.email, data.password);

    if (!result.ok) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    window.location.replace("/auth/login?returnTo=/perfil");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            {/* New Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">Nueva Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="******"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar Contraseña
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="******"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SI HUBO UN ERROR */}
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <Button className="mt-2" disabled={isLoading}>
              Restablecer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
