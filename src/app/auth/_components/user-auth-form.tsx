"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/auth/_components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions";
import clsx from "clsx";
import { Link } from "lucide-react";
/* import GithubSignInButton from './github-auth-button'; */

const formSchema = z.object({
  email: z.string().email({ message: "Ingrese un nombre de usuario válido" }),
  password: z.string().min(8, { message: "Ingrese una contraseña válida" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: "demo@gmail.com",
    password: "123456789",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      signIn("credentials", {
        email: data.email,
        callbackUrl: callbackUrl ?? "/dashboard/overview",
      });
      toast.success("Inicio de sesión con éxito!");
    });
  };

  const [state, dispatch] = useFormState(authenticate, undefined);

  console.log(state);

  useEffect(() => {
    if (state === "Success") {
      // redireccionar
      // router.replace('/');
      window.location.replace("/dashboard/overview");
    }
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
          action={dispatch}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingrese su usuario..."
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
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese su contraseña..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button disabled={loading} className="ml-auto w-full" type="submit">
            Iniciar Sesión
          </Button> */}

          <LoginButton />

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>
          {/* <Button disabled={loading} className="ml-auto w-full" type="submit">
            Iniciar Sesión
          </Button> */}

          <Link href="/auth/new-account" className="btn-secondary text-center">
            Crear una nueva cuenta
          </Link>
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

  function LoginButton() {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        className={clsx({
          "btn-primary": !pending,
          "btn-disabled": pending,
        })}
        disabled={pending}
      >
        Ingresar
      </button>
    );
  }
}
