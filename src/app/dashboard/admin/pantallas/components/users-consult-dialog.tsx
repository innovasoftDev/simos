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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pantalla } from "../data/schema";
import { useState } from "react";

const formSchema = z.object({
  Id_Objeto: z.string(),
  Nombre_Objeto: z
    .string()
    .min(1, { message: "Pantalla es requerido." })
    .max(30, { message: "Máximo 30 caracteres." })
    .regex(/^[a-zA-Z0-9_ ]+$/, {
      message: "No se permiten caracteres especiales.",
    }),
  Descripcion: z.nullable(
    z.string().max(200, { message: "Máximo 200 caracteres." })
  ),
  Tipo_Objeto: z
    .string()
    .min(1, { message: "Tipo Objeto es requerido." })
    .max(200, { message: "Máximo 200 caracteres." })
    .regex(/^[a-zA-Z0-9_ ]+$/, {
      message: "No se permiten caracteres especiales.",
    }),
  Estado: z.string(),
  created: z.nullable(z.date()),
  updated: z.nullable(z.date()),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Pantalla;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersConsultDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    Id_Objeto: "",
    Nombre_Objeto: "",
    Descripcion: "",
    Tipo_Objeto: "",
    Estado: "",
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
          Id_Objeto: "",
          Nombre_Objeto: "",
          Descripcion: "",
          Tipo_Objeto: "",
          Estado: "",
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
                name="Id_Objeto"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      ID
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
                name="Nombre_Objeto"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Descripción
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
                name="Descripcion"
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

              <FormField
                control={form.control}
                name="Estado"
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
                Id_Objeto: "",
                Nombre_Objeto: "",
                Descripcion: "",
                Tipo_Objeto: "",
                Estado: "",
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
