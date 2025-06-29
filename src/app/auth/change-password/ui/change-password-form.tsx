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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "../../../../components/password-input";
import { login, registerUser } from "@/actions";

type SignUpFormProps = HTMLAttributes<HTMLDivElement>;

// REGEX para validar correo electrónico
const emailRegex = /^[a-zA-Z0-9@.]+$/;

const passwordRegex = /.*/;

const formSchema = z
  .object({
    firstName: z.nullable(
      z
        .string()
        .min(1, { message: "Nombre requerido." })
        .max(30, { message: "Máximo 30 caracteres." })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: "No se permiten caracteres especiales.",
        })
    ),
    lastName: z.nullable(
      z
        .string()
        .min(1, { message: "Apellido requerido." })
        .max(30, { message: "Máximo 30 caracteres." })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: "No se permiten caracteres especiales.",
        })
    ),
    username: z
      .string()
      .min(1, { message: "Usuario requerido." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Solo letras, números y guion bajo.",
      }),
    phoneNumber: z.nullable(
      z
        .string()
        .min(1, { message: "Teléfono requerido." })
        .max(8, { message: "Máximo 8 caracteres." })
        .regex(/^[0-9]+$/, { message: "Solo números permitidos." })
    ),
    email: z
      .string()
      .min(1, { message: "Email requerido." })
      .email({ message: "Formato de email inválido." })
      .max(30, { message: "Máximo 30 caracteres." }),
    rol: z.string(),
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

  const [specialCharError, setSpecialCharError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    rol: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange =
    (fieldName: keyof typeof specialCharError) => (e: any) => {
      const value = e.target.value;

      // Validación de caracteres especiales
      if (fieldName === "firstName" || fieldName === "lastName") {
        if (/[^a-zA-Z0-9_]/.test(value)) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales.",
          }));
          return;
        }
      }

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

      // Validación para teléfono (solo números y máximo 8 caracteres)
      if (fieldName === "phoneNumber") {
        if (/[^0-9]/.test(value)) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Solo números permitidos.",
          }));
          return;
        }
        // Bloquear la entrada si el valor tiene más de 8 caracteres
        if (value.length > 8) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Máximo 8 caracteres.",
          }));
          return;
        }
      }

      // Validación para email (permitir @, _, . y letras/números)
      if (fieldName === "email") {
        if (/[^a-zA-Z0-9@._]/.test(value)) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales.",
          }));
          return;
        }
      }

      // Validación de longitud
      if (value.length > 30) {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "Máximo 30 caracteres.",
        }));
        return;
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

      if (fieldName === "firstName" || fieldName === "lastName") {
        if (/[^a-zA-Z\s]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten números ni, caracteres especiales.",
          }));
        }
      }

      if (fieldName === "username") {
        if (/[^a-zA-Z0-9_]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Solo letras, números y guion bajo.",
          }));
        }
      }

      if (fieldName === "phoneNumber") {
        if (/[^0-9]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "Solo números permitidos.",
          }));
        }
      }

      if (fieldName === "email") {
        if (/[^a-zA-Z0-9@._]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales.",
          }));
        }
      }
    };

  /* const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  }); */

  type UserForm = z.infer<typeof formSchema>;

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      rol: "user",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Manejo de entradas
  const handleInput = (
    value: string,
    regex: RegExp,
    setError: any,
    isPasswordField: boolean = false
  ) => {
    // Si el campo está vacío, no mostramos ningún error.
    if (value.length === 0) {
      setError("");
      return value;
    }

    // Si el valor supera los 30 caracteres, lo recortamos
    if (value.length > 30) {
      setError("Máximo 30 caracteres.");
      return value.slice(0, 30);
    }

    // Si no es un campo de contraseña y contiene caracteres especiales, mostramos el error
    if (!isPasswordField && !regex.test(value)) {
      setError("¡No se permiten caracteres especiales!");
      return value.slice(0, -1); // Elimina el último carácter que no es permitido
    }

    // Si todo está bien, limpiamos el error
    setError("");
    return value;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const resp = await registerUser(data);

    const { email, password, confirmPassword } = data;

    if (!resp.ok) {
      setErrorMessage(resp.message);
      setIsLoading(false);
      return;
    }

    await login(email.toLowerCase(), password);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    window.location.replace("/auth/login?returnTo=/perfil");
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4">
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">New Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-1 text-right">
                    Confirmar
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={!isPasswordTouched}
                      placeholder="e.g., S3cur3P@ssw0rd"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            /> */}

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

            {/* SI HUBO UN ERROR A LA HORA DE CREAR UN USUARIO */}
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
