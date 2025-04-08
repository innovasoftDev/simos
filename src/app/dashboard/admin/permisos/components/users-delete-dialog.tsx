"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Pantalla } from "../data/schema";
import { toast } from "sonner";
import { DeletePermiso } from "@/actions/admin/permisos/delete-permiso";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Pantalla;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const handleDelete = async () => {
    if (value.trim() !== currentRow.TBL_USR_ROLES.rol) return;
    
    const result = await DeletePermiso(currentRow.Id_Permiso);

    onOpenChange(false);

    if (result.ok) {
      location.reload();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.TBL_USR_ROLES.rol}
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
            ¿Estás segura de que quieres eliminar este permiso?
            <br />
            Esta acción eliminará permanentemente el permiso para el rol {" "}
            <span className="font-bold">
              {currentRow.TBL_USR_ROLES.rol}
            </span>{" "}
            del sistema. 
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Rol del permiso:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el nombre del rol para confirmar la eliminación."
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
      confirmText="Eliminar"
      destructive
    />
  );
}
