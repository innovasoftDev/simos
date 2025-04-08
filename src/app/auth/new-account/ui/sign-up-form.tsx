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
        .min(1, { message: "Apellidos requerido." })
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

export function SignUpForm({ className, ...props }: SignUpFormProps) {
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
    //const result = await AddOrUpdatePermiso(values);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      setIsLoading(false);
      return;
    }

    await login(email.toLowerCase(), confirmPassword);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    window.location.replace("/");
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* Nombre */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4">
                  <FormLabel className="col-span-1 text-right">
                    Nombre
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                      value={field.value?.toString()}
                      onChange={handleInputChange("firstName")}
                      onKeyDown={preventSpecialChars("firstName")}
                    />
                  </FormControl>
                  {specialCharError.firstName && (
                    <p className="text-red-500 col-span-4 col-start-3 text-sm">
                      {specialCharError.firstName}
                    </p>
                  )}
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />

            {/* Apellido */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4">
                  <FormLabel className="col-span-1 text-right">
                    Apellido
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="col-span-4"
                      autoComplete="off"
                      {...field}
                      value={field.value?.toString()}
                      onChange={handleInputChange("lastName")}
                      onKeyDown={preventSpecialChars("lastName")}
                    />
                  </FormControl>
                  {specialCharError.lastName && (
                    <p className="text-red-500 col-span-4 col-start-3 text-sm">
                      {specialCharError.lastName}
                    </p>
                  )}
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />

            {/* Usuario */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4">
                  <FormLabel className="col-span-1 text-right">
                    Usuario
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john_doe"
                      className="col-span-4"
                      {...field}
                      value={field.value}
                      onChange={handleInputChange("username")}
                      onKeyDown={preventSpecialChars("username")}
                    />
                  </FormControl>
                  {specialCharError.username && (
                    <p className="text-red-500 col-span-4 col-start-3 text-sm">
                      {specialCharError.username}
                    </p>
                  )}
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const filtered = handleInput(
                          e.target.value,
                          emailRegex,
                          setEmailError
                        );
                        field.onChange(filtered);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4">
                  <FormLabel className="col-span-1 text-right">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@gmail.com"
                      className="col-span-4"
                      {...field}
                      value={field.value}
                      onChange={handleInputChange("email")}
                      onKeyDown={preventSpecialChars("email")}
                    />
                  </FormControl>
                  {specialCharError.email && (
                    <p className="text-red-500 col-span-4 col-start-3 text-sm">
                      {specialCharError.email}
                    </p>
                  )}
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />

            {/* Teléfono */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4">
                  <FormLabel className="col-span-1 text-right">
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345678"
                      className="col-span-4"
                      {...field}
                      value={field.value?.toString()}
                      onChange={handleInputChange("phoneNumber")}
                      onKeyDown={preventSpecialChars("phoneNumber")}
                    />
                  </FormControl>
                  {specialCharError.phoneNumber && (
                    <p className="text-red-500 col-span-4 col-start-3 text-sm">
                      {specialCharError.phoneNumber}
                    </p>
                  )}
                  <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-5 items-center gap-x-4 gap-y-1 space-y-0">
                  <FormLabel className="col-span-1 text-right">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="e.g., S3cur3P@ssw0rd"
                      className="col-span-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-3" />
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
            />

            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <Button className="mt-2" disabled={isLoading}>
              Crear cuenta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
