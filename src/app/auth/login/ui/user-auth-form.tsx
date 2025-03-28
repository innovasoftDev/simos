"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticate } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import clsx from "clsx";
import { PasswordInput } from "../../../../components/password-input";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor ingresa tu correo electrónico." })
    .max(20, { message: "Máximo 30 caracteres." })
    .email({ message: "Dirección de correo electrónico no válida" })
    .regex(/^[a-zA-Z0-9._%+-]+@*[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Correo inválido." }),
  password: z
    .string()
    .min(1, { message: "Por favor ingresa tu contraseña." })
    .min(7, { message: "Debe tener al menos 7 caracteres." })
    .max(30, { message: "Máximo 30 caracteres." })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();
  const [charWarning, setCharWarning] = useState({ email: "", password: "" });

  const defaultValues = {
    email: "admin@google.com",
    password: "12345678",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { setValue, handleSubmit, control } = form;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof UserFormValue
  ) => {
    const value = e.target.value;

    if (/[^a-zA-Z0-9.@]/.test(value) && fieldName === "email") {
      setCharWarning((prev) => ({ ...prev, [fieldName]: "¡No se permiten caracteres especiales!" }));
      return;
    }

    if (/[^a-zA-Z0-9.*]/.test(value) && fieldName === "password") {
      setCharWarning((prev) => ({ ...prev, [fieldName]: "¡No se permiten caracteres especiales!" }));
      return;
    }

    if (value.length > 30) {
      setCharWarning((prev) => ({ ...prev, [fieldName]: "" }));
    } else {
      setCharWarning((prev) => ({ ...prev, [fieldName]: "" }));
    }

    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
  };

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/dashboard/overview");
    }
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form action={dispatch} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingrese su email..."
                    disabled={loading}
                    maxLength={30}
                    {...field}
                    onChange={(e) => handleChange(e, field.name)}
                  />
                </FormControl>
                {charWarning.email && <p className="text-red-700 text-sm font-medium">{charWarning.email}</p>}
                <FormMessage className="text-red-700 text-sm font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-white">Contraseña</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-muted-foreground hover:opacity-75"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="Ingrese su contraseña..."
                    maxLength={31}
                    {...field}
                    onChange={(e) => handleChange(e, field.name)}
                  />
                </FormControl>
                {charWarning.password && <p className="text-red-700 text-sm font-medium">{charWarning.password}</p>}
                <FormMessage className="text-red-700 text-sm font-medium" />
              </FormItem>
            )}
          />

          <LoginButton />
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
        "ml-auto w-full": true,
      })}
      disabled={pending}
      type="submit"
    >
      Ingresar
    </Button>
  );
}