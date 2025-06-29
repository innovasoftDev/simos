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
import { Pantalla } from "../data/schema";
import { useState } from "react";

const formSchema = z.object({
  Id_Permiso: z.string(),
  Permiso_Inserta: z.boolean(),
  Permiso_Actualiza: z.boolean(),
  Permiso_Elimina: z.boolean(),
  Permiso_Consulta: z.boolean(),
  ObjetoId: z.string(),
  TBL_USR_ROLESId: z.string(),
  created: z.nullable(z.date()),
  updated: z.nullable(z.date()),
  Objeto: z.object({
    Nombre_Objeto: z.string(),
  }),
  TBL_USR_ROLES: z.object({
    rol: z.string(),
  }),
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
    Id_Permiso: "",
    Permiso_Inserta: false,
    Permiso_Actualiza: false,
    Permiso_Elimina: false,
    Permiso_Consulta: false,
    created: "",
    updated: "",
    ObjetoId: "",
    TBL_USR_ROLESId: "",
    Objeto: {
      Nombre_Objeto: "",
    },
    TBL_USR_ROLES: {
      rol: "",
    },
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
          Id_Permiso: "",
          Permiso_Inserta: false,
          Permiso_Actualiza: false,
          Permiso_Elimina: false,
          Permiso_Consulta: false,
          created: "",
          updated: "",
          ObjetoId: "",
          TBL_USR_ROLESId: "",
          Objeto: {
            Nombre_Objeto: "",
          },
          TBL_USR_ROLES: {
            rol: "",
          },
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
                name="Id_Permiso"
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

              {/* Nombre */}
              <FormField
                control={form.control}
                name="Objeto.Nombre_Objeto"
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
                name="Permiso_Inserta"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Permiso Insertar
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
                name="Permiso_Actualiza"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Permiso Actualiza
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
                name="Permiso_Elimina"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Permiso Elimina
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
                name="Permiso_Consulta"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Permiso Consulta
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value?.toString()}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TBL_USR_ROLES.rol"
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
                Id_Permiso: "",
                Permiso_Inserta: false,
                Permiso_Actualiza: false,
                Permiso_Elimina: false,
                Permiso_Consulta: false,
                created: "",
                updated: "",
                ObjetoId: "",
                TBL_USR_ROLESId: "",
                Objeto: {
                  Nombre_Objeto: "",
                },
                TBL_USR_ROLES: {
                  rol: "",
                },
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
