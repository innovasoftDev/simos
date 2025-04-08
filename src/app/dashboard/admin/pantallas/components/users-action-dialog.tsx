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
import { Pantalla } from "../data/schema";
import { useState } from "react";
import { pantallaStatus } from "../data/data";
import { AddOrUpdatePantalla } from "@/actions/admin/pantallas/add-update-pantalla";
import { SelectDropdown } from "@/components/select-dropdown";

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
  Estado: z
    .string(),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Pantalla;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
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
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          Id_Objeto: "",
          Nombre_Objeto: "",
          Descripcion: "",
          Tipo_Objeto: "",
          Estado: "active",
          isEdit,
        },
  });

  const handleInputChange =
    (fieldName: keyof typeof specialCharError) => (e: any) => {
      const value = e.target.value;

      // Validación de caracteres especiales
      if (
        fieldName === "Descripcion" ||
        fieldName === "Estado" ||
        fieldName === "Tipo_Objeto"
      ) {
        if (/[^a-zA-Z0-9_ ]/.test(value)) {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales.",
          }));
          return;
        }
      }

      // Validación para el descripcion (solo letras, números, guion bajo)
      if (fieldName === "Nombre_Objeto") {
        if (/[^a-zA-Z0-9_ ]/.test(value)) {
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

      if (
        fieldName === "Descripcion" ||
        fieldName === "Estado" ||
        fieldName === "Tipo_Objeto"
      ) {
        if (/[^a-zA-Z0-9_ ]+$/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales..",
          }));
        }
      }

      if (fieldName === "Nombre_Objeto") {
        if (/[^a-zA-Z0-9_ ]/.test(key) && key !== "Backspace") {
          e.preventDefault();
          setSpecialCharError((prev) => ({
            ...prev,
            [fieldName]: "No se permiten caracteres especiales.",
          }));
        }
      }
    };

  const onSubmit = async (values: UserForm) => {
    const result = await AddOrUpdatePantalla(values);

    form.reset();
    onOpenChange(false);

    if (result.ok) {
      location.reload();
    }else{
      toast.error(result.message);
    }
  };

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
          <DialogTitle>
            {isEdit ? "Editar Pantalla" : "Agregar Nueva Pantalla"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza las pantallas aquí."
              : "Crea una nueva pantalla aquí."}{" "}
            Haga clic en guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              
              {/* Pantalla */}
              <FormField
                control={form.control}
                name="Nombre_Objeto"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">
                      Pantalla
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de pantalla"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                        value={field.value}
                        onChange={handleInputChange("Nombre_Objeto")}
                        onKeyDown={preventSpecialChars("Nombre_Objeto")}
                      />
                    </FormControl>
                    {specialCharError.Nombre_Objeto && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.Nombre_Objeto}
                      </p>
                    )}
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Descripcion */}
              <FormField
                control={form.control}
                name="Descripcion"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">
                      Descripción
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descripción de pantalla"
                        className="col-span-4"
                        {...field}
                        value={field.value?.toString()}
                        onChange={handleInputChange("Descripcion")}
                        onKeyDown={preventSpecialChars("Descripcion")}
                      />
                    </FormControl>
                    {specialCharError.Descripcion && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.Descripcion}
                      </p>
                    )}
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Tipo Objeto */}
              <FormField
                control={form.control}
                name="Tipo_Objeto"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">
                      Tipo_Objeto
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de pantalla"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                        value={field.value}
                        onChange={handleInputChange("Tipo_Objeto")}
                        onKeyDown={preventSpecialChars("Tipo_Objeto")}
                      />
                    </FormControl>
                    {specialCharError.Tipo_Objeto && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.Tipo_Objeto}
                      </p>
                    )}
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Estado */}
              <FormField
                control={form.control}
                name="Estado"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Estado
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar un Estado"
                      className="col-span-4"
                      items={pantallaStatus.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
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
                Id_Objeto: "",
                Nombre_Objeto: "",
                Descripcion: "",
                Tipo_Objeto: "",
                Estado: "",
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
