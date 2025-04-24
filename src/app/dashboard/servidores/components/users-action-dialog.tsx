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
import { PasswordInput } from "@/components/password-input";
import { SelectDropdown } from "@/components/select-dropdown";
import { serverStatus, ServerGroups } from "../data/data";
import { Server } from "../data/schema";
import { AddOrUpdateServer } from "@/actions/dashboard/servidores/add-update-server";

const formSchema = z
  .object({
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
    Grup_ServidorId: z
      .string(),
    Grup_Servidor: z.object({
      Nombre_Grupo_Servidores: z
        .string()
        .min(1, { message: "Grupo Servidor es requerido." }),
    }),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, Nombre_Servidor }, ctx) => {
    if (!isEdit || (isEdit && Nombre_Servidor !== "")) {
      if (Nombre_Servidor === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nombre Servidor is required.",
          path: ["Nombre_Servidor"],
        });
      }

      if (Nombre_Servidor.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nombre Servidor must be at least 8 characters long.",
          path: ["Nombre_Servidor"],
        });
      }

      if (!Nombre_Servidor.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Nombre Servidor must contain at least one lowercase letter.",
          path: ["Nombre_Servidor"],
        });
      }

      if (!Nombre_Servidor.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nombre Servidor must contain at least one number.",
          path: ["Nombre_Servidor"],
        });
      }
    }
  });
type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Server;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const groupServers = ServerGroups();
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
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
        },
  });

  const onSubmit = async (values: UserForm) => {
    const result = await AddOrUpdateServer(values);

    if (result.ok) {
      location.reload();
    } else {
      toast.error(result.message);
    }
    form.reset();
    onOpenChange(false);
  };

  //const isPasswordTouched = !!form.formState.dirtyFields.password;

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
              ? "Actualiza el nuevo servidor aquí. "
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
                name="Nombre_Servidor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Servidor
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de servidor"
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
                        placeholder="Descripción de servidor"
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
                name="CPU"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">CPU</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nucleos en uso del servidor"
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
                name="Memoria"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Memoria
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Memoria que utiliza del servidor"
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
                name="Tipo_Sevidor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Tipo de Servidor
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tipo de servicio brinda el server"
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
                name="Nombre_AD"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Nombre Equipo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del servidor en el AD"
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
                name="URL"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL del servidor"
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
                      items={serverStatus.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Grup_Servidor.Nombre_Grupo_Servidores"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Grupo Servidor
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Seleccionar un grupo"
                      className="col-span-4"
                      items={groupServers.map(
                        ({ Nombre_Grupo_Servidores }) => ({
                          label: Nombre_Grupo_Servidores
                            ? Nombre_Grupo_Servidores
                            : "",
                          value: Nombre_Grupo_Servidores
                            ? Nombre_Grupo_Servidores
                            : "",
                        })
                      )}
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
