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
  FormDescription,
} from "@/components/ui/form";
//import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pantalla } from "../data/schema";
import { useState } from "react";
import { GetObjetos, UsersRoles } from "../data/data";
import { SelectDropdown } from "@/components/select-dropdown";
import { AddOrUpdatePermiso } from "@/actions/admin/permisos/add-update-permisos";
import { Switch } from "@/components/ui/switch";
//import { Label } from "@/components/ui/label";

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
  TBL_USR_ROLES: z.object({
    rol: z.string(),
  }),
  isEdit: z.boolean(),
});

type PermisosForm = z.infer<typeof formSchema>;

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
    TBL_USR_ROLES: {
      rol: "",
    },
  });

  const form = useForm<PermisosForm>({
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
          TBL_USR_ROLES: {
            rol: "",
          },
          isEdit,
        },
  });

  const onSubmit = async (values: PermisosForm) => {
    const result = await AddOrUpdatePermiso(values);

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
          TBL_USR_ROLES: {
            rol: "",
          },
        });
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? "Editar Permiso" : "Agregar Nuevo Permiso"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza los permisos aquí."
              : "Crea una nueva permiso aquí."}{" "}
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
                name="TBL_USR_ROLES.rol"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">Rol</FormLabel>
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
                name="Objeto.Nombre_Objeto"
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
              <FormItem className=" rounded-lg border p-2 text-center">
                <FormDescription>
                  Permisos que obtendra el Rol sobre la pantalla.
                </FormDescription>
              </FormItem>

              {/* Permiso_Consulta */}
              <FormField
                control={form.control}
                name="Permiso_Consulta"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-2">
                    <FormLabel className="col-span-2 text-right">
                      Consultar
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Permiso_Inserta */}
              <FormField
                control={form.control}
                name="Permiso_Inserta"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-2">
                    <FormLabel className="col-span-2 text-right">
                      Insertar
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Permiso_Actualiza */}
              <FormField
                control={form.control}
                name="Permiso_Actualiza"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-2">
                    <FormLabel className="col-span-2 text-right">
                      Actualizar
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Permiso_Elimina */}
              <FormField
                control={form.control}
                name="Permiso_Elimina"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-2">
                    <FormLabel className="col-span-2 text-right">
                      Eliminar
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    {/* <Label htmlFor="airplane-mode">{field.value? "ON" : "OFF"}</Label> */}
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
                TBL_USR_ROLES: {
                  rol: "",
                },
              });
            }}
            variant="outline" // Cambia el estilo si es necesario
          >
            Cancel
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
