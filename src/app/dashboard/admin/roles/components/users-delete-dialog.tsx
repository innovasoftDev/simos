"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
//import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Role } from "../data/schema";
import { toast } from "sonner";
import { DeleteUser } from "@/actions/admin/users/delete-user";
import useSWR from 'swr'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Role;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  const { mutate } = useSWR("/dashboard/admin/roles", fetch);

  const handleDelete = async () => {
    if (value.trim() !== currentRow.id_rol) return;
    const result = await DeleteUser(value.trim());

    if (result.ok) {
      mutate();
      toast.error("Eliminar", {
        description: "¡Se ha eliminado el Rol!",
      });
    } else {
      toast.error("Eliminar", {
        description: "¡Ocurrió un error!",
      });
    }

    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.id_rol}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Eliminar Rol
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            ¿Estás segura de que quieres eliminar este rol?
            <br />
            Esta acción eliminará permanentemente al rol {" "}
            <span className="font-bold">
              {currentRow.rol}
            </span>{" "}
            del sistema. 
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Nombre de rol:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el nombre de rol para confirmar la eliminación."
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
