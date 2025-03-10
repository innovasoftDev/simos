"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
//import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Service } from "../data/schema";
import { toast } from "sonner";
import { DeleteUser } from "@/actions/admin/users/delete-user";
import useSWR from 'swr'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Service;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  const { mutate } = useSWR("/dashboard/admin/users", fetch);

  const handleDelete = async () => {
    if (value.trim() !== currentRow.id_servicio) return;
    /* const result = await DeleteUser(value.trim());

    if (result.ok) {
      mutate();
      toast.error("Eliminar", {
        description: "¡Se ha eliminado el usuario!",
      });
    } else {
      toast.error("Eliminar", {
        description: "¡Ocurrió un error!",
      });
    } */

    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.id_servicio}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Eliminar Servicio
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            ¿Estás segura de que quieres eliminar este usuario?
            <br />
            Esta acción eliminará permanentemente al usuario {" "}
            <span className="font-bold">
              {currentRow.id_servicio}
            </span>{" "}
            del sistema. 
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Nombre de usuario:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el nombre de usuario para confirmar la eliminación."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>¡Advertencia!</AlertTitle>
            <AlertDescription>
              Tenga cuidado, esta operación no se puede revertir.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
