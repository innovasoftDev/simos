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
//import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
//import { toast } from "sonner";
import * as z from "zod";
import clsx from "clsx";
import { PasswordInput } from "../../../../components/password-input";
import Link from "next/link";
import { Info } from "lucide-react";

// Validación SOLO para email
const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Usuario requerido." })
    .max(30, { message: "Máximo 30 caracteres." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Solo letras, números y guion bajo.",
    }),
  password: z.string(), // Sin validaciones
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  //console.log();
  //const searchParams = useSearchParams();
  //const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();
  //const [charWarning, setCharWarning] = useState({ email: "", password: "" });
  const [specialCharError, setSpecialCharError] = useState({
    username: "",
    password: "",
  });

  /*  const defaultValues = {
    email: "admin@google.com",
    password: "12345678",
  }; */

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  //const { setValue, handleSubmit, control } = form;

  /*  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof UserFormValue
  ) => {
    const value = e.target.value;

    // Validación para el username (solo letras, números, guion bajo)
    if (fieldName === "username") {
      if (/[^a-zA-Z0-9_]/.test(value)) {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "Solo letras, números y guion bajo.",
        }));
        return;
      }
    }

    setCharWarning((prev) => ({ ...prev, [fieldName]: "" }));

    setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
  }; */

  const handleInputChange =
    (fieldName: keyof typeof specialCharError) => (e: any) => {
      const value = e.target.value;

      // Validación para el username (solo letras, números, guion bajo)
      if (fieldName === "username") {
        if (/[^a-zA-Z0-9_]/.test(value)) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Solo letras, números y guion bajo.",
          }));
          return;
        }
      }

      setSpecialCharError((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      form.setValue(fieldName as any, value);
    };

  const preventSpecialChars =
    (fieldName: keyof typeof specialCharError) => (e: any) => {
      const key = e.key;

      if (fieldName === "username") {
        if (/[^a-zA-Z0-9_]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Solo letras, números y guion bajo.",
          }));
        }
      }
    };

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/dashboard/overview");
    }
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form action={dispatch} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    type="username"
                    placeholder="Ingrese su usuario..."
                    disabled={loading}
                    maxLength={30}
                    {...field}
                    onChange={handleInputChange("username")}
                    onKeyDown={preventSpecialChars("username")}
                    suppressHydrationWarning
                  />
                </FormControl>
                {specialCharError.username && (
                  <p className="text-red-500 col-span-4 col-start-3 text-sm">
                    {specialCharError.username}
                  </p>
                )}
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
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="Ingrese su contraseña..."
                    {...field}
                    suppressHydrationWarning
                  />
                </FormControl>
                <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
              </FormItem>
            )}
          />

          <div
            className=""
            aria-live="polite"
            aria-atomic="true"
          >
            {state === "CredentialsSignin" && (
              <div className="flex flex-row mb-2">
                <Info className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">
                  Credenciales no son correctas
                </p>
              </div>
            )}
          </div>

          <LoginButton />
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground"></span>
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
