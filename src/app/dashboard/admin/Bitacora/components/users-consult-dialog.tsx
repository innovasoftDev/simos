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
import { Bitacora } from "../data/schema";
import { useState, useEffect } from "react";


const formSchema = z.object({
  id_bitacora: z.string(),
  id_user: z.string(),
  username: z.string(),
  accion: z.string(),
  entidad: z.string(),
  descripcion: z.nullable(z.string()),
  fechaHora: z.date(),
  isEdit: z.boolean().optional(),
});


type BitacoraForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Bitacora;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersConsultDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    id_bitacora: "",
    id_user: "",
    username: "",
    fechaHora: "",
    accion: "",
    descripcion: "",
    entidad: "",
  });

  const form = useForm<BitacoraForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_bitacora: currentRow?.id_bitacora || "",
      id_user: currentRow?.id_user || "",
      username: currentRow?.username || "",
      accion: currentRow?.accion || "",
      entidad: currentRow?.entidad || "",
      descripcion: currentRow?.descripcion || null,
      fechaHora: currentRow?.fechaHora || new Date(),
      isEdit,
    },
  });

  useEffect(() => {
    if (currentRow && open) {
      form.reset({
        id_bitacora: currentRow.id_bitacora,
        id_user: currentRow.id_user,
        username: currentRow.username,
        accion: currentRow.accion,
        entidad: currentRow.entidad,
        descripcion: currentRow.descripcion || null,
        fechaHora: currentRow.fechaHora,
        isEdit: true,
      });
    } else if (!open) {
      form.reset();
    }
  }, [currentRow, open, form]);


  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
        setSpecialCharError({
          id_bitacora: "",
          id_user: "",
          username: "",
          fechaHora: "",
          accion: "",
          descripcion: "",
          entidad: "",
        });
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Consultar Bitácora</DialogTitle> {/* Título más específico */}
          <DialogDescription>
            Visualiza todos los datos del registro de bitácora seleccionado.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form id="bitacora-consult-form" className="space-y-8 p-0.5"> {/* ID del formulario */}
              {/* 4. **Ajusta los FormField para mostrar los campos de Bitacora** */}

              {/* ID Bitacora */}
              <FormField
                control={form.control}
                name="id_bitacora"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      ID Bitácora
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value} {/* Muestra el valor */}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* ID Usuario */}
              <FormField
                control={form.control}
                name="id_user"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      ID Usuario
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Nombre de Usuario */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Usuario
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Acción */}
              <FormField
                control={form.control}
                name="accion"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Acción
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Entidad */}
              <FormField
                control={form.control}
                name="entidad"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Entidad
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value}
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Descripción (puede ser nula) */}
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Descripción
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value || "N/A"} {/* Muestra "N/A" si es null */}
                    </FormLabel>
                  </FormItem>
                )}
              />
              {/* Fecha y Hora */}
              <FormField
                control={form.control}
                name="fechaHora"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-center border border-gray-300 rounded-md px-2 py-1">
                      Fecha y Hora
                    </FormLabel>
                    <FormLabel className="col-span-4 text-center">
                      {field.value instanceof Date && !isNaN(field.value.getTime())
                        ? field.value.toLocaleString()
                        : "N/A"}
                    </FormLabel>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="flex justify-between">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              onOpenChange(false);
              setSpecialCharError({
                id_bitacora: "",
                id_user: "",
                username: "",
                fechaHora: "",
                accion: "",
                descripcion: "",
                entidad: "",
              });
            }}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}