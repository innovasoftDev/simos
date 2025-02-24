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
/* import { signIn } from "next-auth/react"; */
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
    .email({ message: "Dirección de correo electrónico no válida" }),
  password: z
    .string()
    .min(1, {
      message: "Por favor ingresa tu contraseña.",
    })
    .min(7, {
      message: "La contraseña debe tener al menos 7 caracteres.",
    }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();

  const defaultValues = {
    email: "admin@google.com",
    password: "12345678",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  /* const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? "/dashboard/overview",
      });
      //toast.success("Signed In Successfully!");
    });
  }; */

  useEffect(() => {
    if (state === "Success") {
      // redireccionar
      // router.replace('/');
      window.location.replace("/dashboard/overview");
    }
  }, [state]);

  {
    state === "CredentialsSignin" &&
      toast.error("Error de inicio de sesión", {
        description: "¡Credenciales no son correctas!",
      });
  }
  /* console.log(state); */

  return (
    <>
      <Form {...form}>
        <form
          action={dispatch}
          /* onSubmit={form.handleSubmit(onSubmit)} */
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Ingrese su email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Contraseña</FormLabel>
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button disabled={loading} className="ml-auto w-full" type="submit">
            Ingresar
          </Button> */}

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
        "btn-disabled": !pending,
        "ml-auto w-full": true,
      })}
      disabled={pending}
      type="submit"
    >
      Ingresar
    </Button>
  );
}
