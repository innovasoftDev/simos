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
import { Role } from "../data/schema";
import { useState } from "react";

const formSchema = z.object({
  id_rol: z.string(),
  rol: z
    .string()
    .min(1, { message: "Rol es requerido." })
    .max(30, { message: "Máximo 30 caracteres." })
    .regex(/^[a-zA-Z0-9_ ]+$/, {
      message: "No se permiten caracteres especiales.",
    }),
  descripcion: z.nullable(
    z
      .string()
      .min(1, { message: "Descripción es requerido." })
      .max(200, { message: "Máximo 200 caracteres." })
      .regex(/^[a-zA-Z0-9_ ]+$/, {
        message: "No se permiten caracteres especiales.",
      })
  ),
  created: z.nullable(z.date()),
  updated: z.nullable(z.date()),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersConsultDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    id_rol: "",
    rol: "",
    descripcion: "",
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
          id_rol: "",
          rol: "",
          descripcion: "",
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
              {/* Rol */}
              <FormField
                control={form.control}
                name="rol"
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

              {/* descripcion */}
              <FormField
                control={form.control}
                name="descripcion"
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
                id_rol: "",
                rol: "",
                descripcion: "",
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
