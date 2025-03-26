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
import { Role } from "../data/schema";
import { useState } from "react";
import { AddOrUpdateRole } from "@/actions/admin/roles/add-update-role";

const formSchema = z
  .object({
    id_rol: z
      .string(),
    rol: z
      .string()
      .min(1, { message: "Rol es requerido." })
      .max(30, { message: "Máximo 30 caracteres." })
      .regex(/^[a-zA-Z\s]*$/, { message: "No se permiten caracteres especiales." }),
    descripcion: z
      .string()
      .min(1, { message: "Descripción es requerido." })
      .max(200, { message: "Máximo 200 caracteres." })
      .regex(/^[a-zA-Z0-9_ ]+$/, { message: "Solo letras, números y guion bajo." }),    
    isEdit: z.boolean(),
  })

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    id_rol: "",
    rol: "",
    descripcion: "",
  });

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          id_rol: "",
          rol: "",
          descripcion: "",
          isEdit,
        },
  });

  const handleInputChange = (fieldName: keyof typeof specialCharError) => (e: any) => {
    const value = e.target.value;

    // Validación de caracteres especiales
    if (fieldName === "id_rol" || fieldName === "descripcion") {
      if (/[^a-zA-Z\s]/.test(value)) {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "No se permiten caracteres especiales.",
        }));
        return;
      }
    }

    // Validación para el descripcion (solo letras, números, guion bajo)
    if (fieldName === "rol") {
      if (/[^a-zA-Z0-9_]/.test(value)) {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "Solo letras, números y guion bajo.",
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

    if (fieldName === "id_rol" || fieldName === "descripcion") {
      if (/[^a-zA-Z\s]/.test(key) && key !== "Backspace") {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "No se permiten caracteres especiales.",
        }));
      }
    }

    if (fieldName === "rol") {
      if (/[^a-zA-Z0-9_]/.test(key) && key !== "Backspace") {
        e.preventDefault();
        setSpecialCharError((prev) => ({
          ...prev,
          [fieldName]: "Solo letras, números y guion bajo.",
        }));
      }
    }
  };

  const onSubmit = async (values: UserForm) => {
    //const result = await AddOrUpdateUser(values);
    const result = await AddOrUpdateRole(values);

    if (result.ok) {
      toast.success(isEdit ? "Rol editado" : "Rol creado");
    } else {
      toast.error("¡Ocurrió un error!");
    }

    form.reset();
    onOpenChange(false);
  };

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
          <DialogTitle>{isEdit ? "Editar Rol" : "Agregar Nuevo Rol"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza los roles aquí."
              : "Crea un nuevo rol aquí."} Haga clic en guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <Form {...form}>
            <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
              {/* Nombre */}
              {/* <FormField
                control={form.control}
                name="id_rol"
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
                        onChange={handleInputChange("id_rol")}
                        onKeyDown={preventSpecialChars("id_rol")}
                      />
                    </FormControl>
                    {specialCharError.id_rol && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.id_rol}
                      </p>
                    )}
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              /> */}
  
              {/* Rol */}
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Nombre del Rol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                        value={field.value}
                        onChange={handleInputChange("rol")}
                        onKeyDown={preventSpecialChars("rol")}
                      />
                    </FormControl>
                    {specialCharError.rol && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.rol}
                      </p>
                    )}
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
  
              {/* Descripcion */}
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4">
                    <FormLabel className="col-span-2 text-right">Descripción</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john_doe"
                        className="col-span-4"
                        {...field}
                        value={field.value}
                        onChange={handleInputChange("descripcion")}
                        onKeyDown={preventSpecialChars("descripcion")}
                      />
                    </FormControl>
                    {specialCharError.descripcion && (
                      <p className="text-red-500 col-span-4 col-start-3 text-sm">
                        {specialCharError.descripcion}
                      </p>
                    )}
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
                id_rol: "",
                rol: "",
                descripcion: "",
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