"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "../data/schema";
import { useState } from "react";

const formSchema = z
  .object({
    id_user: z.string(),
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
    created: z.nullable(z.date()),
    updated: z.nullable(z.date()),
    tbl_usr_roles_id_rol: z.string(),
    status: z
      .string()
      .min(1, { message: "Estado es requerido." })
      .max(200, { message: "Máximo 200 caracteres." })
      .regex(/^[a-zA-Z0-9_ ]+$/, {
        message: "No se permiten caracteres especiales.",
      }),
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
    rol: z.object({
      id_rol: z.string(),
      rol: z.string(),
      descripcion: z.nullable(z.string()),
    }),
    isEdit: z.boolean(),
  });

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersConsultDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    id_user: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    tbl_usr_roles_id_rol: "",
    rol: {
      rol: "",
      id_rol: "",
      descripcion: "",
    },
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    status: "",
  });

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...currentRow,
      isEdit,
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
        setSpecialCharError({
          id_user: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          tbl_usr_roles_id_rol: "",
          rol: {
            rol: "",
            id_rol: "",
            descripcion: "",
          },
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          status: "",
        });
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Consultar</DialogTitle>
          <DialogDescription>
            Visualiza todos los datos del registro.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form id="user-form" className="space-y-8 p-0.5">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Nombre
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Apellido */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Apellido
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Usuario */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Usuario
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Email
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Teléfono */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Teléfono
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rol.rol"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Role
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Estado
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />     
              <FormField
                control={form.control}
                name="created"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Fecha creación
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />     
              <FormField
                control={form.control}
                name="updated"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Fecha Modificado
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
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
                id_user: "",
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                tbl_usr_roles_id_rol: "",
                rol: {
                  rol: "",
                  id_rol: "",
                  descripcion: "",
                },
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                status: "",
              });
            }}
            // Cambia el estilo si es necesario
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
