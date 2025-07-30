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
import { SelectDropdown } from "@/components/select-dropdown";
import { servicioStatus, Servers } from "../data/data";
import { Servicio } from "../data/schema";
import { AddOrUpdateServicio } from "@/actions/dashboard/servicios/add-update-servicio";

const formSchema = z
  .object({
    Id_Servicio: z.string(),
    Nombre_Servicio: z
      .string()
      .min(1, { message: "Nombre del servidor es requerido." }),
    Descripcion: z.nullable(z.string()),
    Estado: z.string().min(1, { message: "Estado es requerido." }),
    Motivo_Desactivacion: z.string().nullable().optional(), // sigue opcional
    ServidorId: z.string(),
    Servidor: z.object({
      Nombre_Servidor: z
        .string()
        .min(1, { message: "Grupo Servidor es requerido." }),
    }),
    isEdit: z.boolean(),
  });

type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Servicio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const servidores = Servers();
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          Motivo_Desactivacion: (currentRow as any)?.Motivo_Desactivacion || "",
          isEdit,
        }
      : {
          Id_Servicio: "",
          Nombre_Servicio: "",
          Descripcion: "",
          Estado: "",
          Motivo_Desactivacion: "",
          ServidorId: "",
          Servidor: {
            Nombre_Servidor: "",
          },
          isEdit,
        },
  });

  const onSubmit = async (values: UserForm) => {
    const result = await AddOrUpdateServicio(values);

    if (result.ok) {
      location.reload();
    } else {
      toast.error(result.message);
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
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? "Editar Servidor" : "Agregar Nuevo Servicio"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Actualiza el nuevo servicio aquí. "
              : "Crea un nuevo servidor aquí. "}
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
              <FormField
                control={form.control}
                name="Nombre_Servicio"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Servicio
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de servicio"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Descripcion"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Descripción
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descripción de servicio"
                        className="col-span-4"
                        {...field}
                        value={field.value?.toString()}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

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
                      placeholder="Seleccionar un estado"
                      className="col-span-4"
                      items={servicioStatus.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              {/* Mostrar solo en edición */}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="Motivo_Desactivacion"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                      <FormLabel className="col-span-2 text-right">
                        Motivo Desactivación
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Obligatorio solo si el estado es Inactivo"
                          className="col-span-4"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 col-start-3" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="Servidor.Nombre_Servidor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Grupo Servicio
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar un grupo"
                      className="col-span-4"
                      items={servidores.map(({ Nombre_Servidor }) => ({
                        label: Nombre_Servidor ? Nombre_Servidor : "",
                        value: Nombre_Servidor ? Nombre_Servidor : "",
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
