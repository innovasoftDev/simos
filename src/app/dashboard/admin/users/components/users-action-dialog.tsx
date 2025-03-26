"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PasswordInput } from "@/components/password-input";
import { SelectDropdown } from "@/components/select-dropdown";
import { userTypes } from "../data/data";
import { User } from "../data/schema";
import { AddOrUpdateUser } from "@/actions/admin/users/add-update-user";
import { useState } from "react";

const specialCharRegex = /^[a-zA-Z0-9_@.]*$/;

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Nombre requerido." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "No se permiten caracteres especiales." }),
    lastName: z
      .string()
      .min(1, { message: "Apellidos requerido." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "No se permiten caracteres especiales." }),
    username: z
      .string()
      .min(1, { message: "Usuario requerido." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Solo letras, números y guion bajo." }),
    phoneNumber: z
      .string()
      .min(1, { message: "Teléfono requerido." })
      .max(8, { message: "Máximo 8 caracteres." })
      .regex(/^[0-9]+$/, { message: "Solo números permitidos." }),
    email: z
      .string()
      .min(1, { message: "Email requerido." })
      .email({ message: "Formato de email inválido." })
      .max(30, { message: "Máximo 30 caracteres." }),
    password: z
      .string()
      .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." }) 
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
      .regex(/\d/, { message: "Debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, { message: "Debe contener al menos un carácter especial." }) 
      .transform((pwd) => pwd.trim()),
    tbl_usr_roles_id_rol: z.string().min(1, { message: "Role requerido." }),
    confirmPassword: z
      .string() 
      .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
      .regex(/\d/, { message: "Debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, { message: "Debe contener al menos un carácter especial." })       
      .transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })




  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    // Validación de contraseña mínima
    if (!isEdit || (isEdit && password !== "")) {
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

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
  });

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: "",
          confirmPassword: "",
          isEdit,
        }
      : {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          tbl_usr_roles_id_rol: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          isEdit,
        },
  });

  const handleInputChange = (fieldName: keyof typeof specialCharError) => (e: any) => {
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

  const preventSpecialChars = (fieldName: keyof typeof specialCharError) => (e: any) => {
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

  const onSubmit = async (values: UserForm) => {
    const result = await AddOrUpdateUser(values);

    if (result.ok) {
      toast.success(isEdit ? "Usuario editado" : "Usuario creado");
    } else {
      toast.error("¡Ya existe un usuario con ese mismo nombre, porfavor ingresar uno diferente!");
    }

    form.reset();
    onOpenChange(false);
  };

  const isPasswordTouched = !!form.formState.dirtyFields.password;




  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
        setSpecialCharError({
          firstName: "",
          lastName: "",
          username: "",
          phoneNumber: "",
          email: "",
        });
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? "Editar Usuario" : "Agregar Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza al usuario aquí."
              : "Crea un nuevo usuario aquí."} Haga clic en guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                        value={field.value}
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
  
              {/* Apellidos */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Apellidos</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                        value={field.value}
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
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Usuario</FormLabel>
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
  
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Email</FormLabel>
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
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345678"
                        className="col-span-4"
                        {...field}
                        value={field.value}
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
              <FormField
                control={form.control}
                name="tbl_usr_roles_id_rol"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">Role</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar un rol"
                      className="col-span-4"
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">Contraseña</FormLabel>
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
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">Confirmar Contraseña</FormLabel>
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
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="flex justify-between">
          {/* Botón Cancelar */}
          <Button
            type="button"
            onClick={() => {
              form.reset();
              onOpenChange(false); // Cierra el modal sin guardar
              setSpecialCharError({
                firstName: "",
                lastName: "",
                username: "",
                phoneNumber: "",
                email: "",
              });
            }}
            variant="outline" // Cambia el estilo si es necesario
          >
            Cancelar
          </Button>
          
          {/* Botón Guardar Cambios */}
          <Button type="submit" form="user-form">
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}  