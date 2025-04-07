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
import { GetObjetos, UsersRoles } from "../data/data";
import { SelectDropdown } from "@/components/select-dropdown";
import { AddOrUpdatePermiso } from "@/actions/admin/permisos/add-update-permisos";

const formSchema = z.object({
  Id_Permiso: z.string(),
  Permiso_Inserta: z.boolean(),
  Permiso_Actualiza: z.boolean(),
  Permiso_Elimina: z.boolean(),
  Permiso_Consulta: z.boolean(),
  ObjetoId: z.string(),
  TBL_USR_ROLESId: z.string(),
  Objeto: z.object({
    Nombre_Objeto: z.string(),
  }),
  rol: z.object({
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

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const userRoles = UsersRoles();
  const objetos = GetObjetos();

  const isEdit = !!currentRow;
  const [specialCharError, setSpecialCharError] = useState({
    Id_Permiso: "",
    Permiso_Inserta: false,
    Permiso_Actualiza: false,
    Permiso_Elimina: false,
    Permiso_Consulta: false,
    ObjetoId: "",
    TBL_USR_ROLESId: "",
    Objeto: {
      Nombre_Objeto: "",
    },
    rol: {
      rol: "",
    },
  });

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          Id_Permiso: "",
          Permiso_Inserta: false,
          Permiso_Actualiza: false,
          Permiso_Elimina: false,
          Permiso_Consulta: false,
          ObjetoId: "",
          TBL_USR_ROLESId: "",
          Objeto: {
            Nombre_Objeto: "",
          },
          rol: {
            rol: "",
          },
          isEdit,
        },
  });

  const onSubmit = async (values: UserForm) => {
    const result = await AddOrUpdatePermiso(values);

    /* if (result.ok) {      
      toast.success(isEdit ? "Pantalla editada" : "Pantalla creada");      
    } else {
      toast.error("¡Ya existe una pantalla con este mismo nombre, ingrese uno diferente!");
    }     */
    form.reset();
    onOpenChange(false);

    if (result.ok) {
      location.reload();
    } else {
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
          Id_Permiso: "",
          Permiso_Inserta: false,
          Permiso_Actualiza: false,
          Permiso_Elimina: false,
          Permiso_Consulta: false,
          ObjetoId: "",
          TBL_USR_ROLESId: "",
          Objeto: {
            Nombre_Objeto: "",
          },
          rol: {
            rol: "",
          },
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
              {/* Role */}
              <FormField
                control={form.control}
                name="Objeto.Nombre_Objeto"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar un rol"
                      className="col-span-4"
                      items={userRoles.map(({ rol }) => ({
                        label: rol ? rol : "",
                        value: rol ? rol : "",
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Pantalla */}
              <FormField
                control={form.control}
                name="rol.rol"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Pantalla
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar una pantalla"
                      className="col-span-4"
                      items={objetos.map(({ Nombre_Objeto }) => ({
                        label: Nombre_Objeto ? Nombre_Objeto : "",
                        value: Nombre_Objeto ? Nombre_Objeto : "",
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Tipo Objeto */}

              {/* Estado */}
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
                ObjetoId: "",
                TBL_USR_ROLESId: "",
                Objeto: {
                  Nombre_Objeto: "",
                },
                rol: {
                  rol: "",
                },
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
