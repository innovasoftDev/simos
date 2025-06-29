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
import { Server } from "../data/schema";
import { useState } from "react";

const formSchema = z.object({
  Id_Servidor: z.string(),
  Nombre_Servidor: z
    .string()
    .min(1, { message: "Nombre del servidor es requerido." }),
  Descripcion: z.nullable(z.string()),
  CPU: z.nullable(z.string()),
  Memoria: z.nullable(z.string()),
  Tipo_Sevidor: z.nullable(z.string()),
  Nombre_AD: z.nullable(z.string()),
  URL: z.nullable(z.string()),
  Estado: z.string().min(1, { message: "Estado es requerido." }),
  Grup_ServidorId: z.string(),
  Grup_Servidor: z.object({
    Nombre_Grupo_Servidores: z
      .string()
      .min(1, { message: "Grupo Servidor es requerido." }),
  }),
  created: z.nullable(z.date()),
  updated: z.nullable(z.date()),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Server;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersConsultDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    Id_Servidor: "",
    Nombre_Servidor: "",
    Descripcion: "",
    CPU: "",
    Memoria: "",
    Tipo_Sevidor: "",
    Nombre_AD: "",
    URL: "",
    Estado: "",
    Grup_ServidorId: "",
    Grup_Servidor: {
      Nombre_Grupo_Servidores: "",
    },
    isEdit,
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
          Id_Servidor: "",
          Nombre_Servidor: "",
          Descripcion: "",
          CPU: "",
          Memoria: "",
          Tipo_Sevidor: "",
          Nombre_AD: "",
          URL: "",
          Estado: "",
          Grup_ServidorId: "",
          Grup_Servidor: {
            Nombre_Grupo_Servidores: "",
          },
          isEdit,
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
                name="Id_Servidor"
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
                name="Nombre_Servidor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Nombre Servidor
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
                      Descripción
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
                name="CPU"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      CPU
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
                name="Memoria"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Memoria
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Tipo_Sevidor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Tipo Sevidor
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Nombre_AD"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Nombre AD
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="URL"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      URL Sevidor
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
                Id_Servidor: "",
                Nombre_Servidor: "",
                Descripcion: "",
                CPU: "",
                Memoria: "",
                Tipo_Sevidor: "",
                Nombre_AD: "",
                URL: "",
                Estado: "",
                Grup_ServidorId: "",
                Grup_Servidor: {
                  Nombre_Grupo_Servidores: "",
                },
                isEdit,
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
