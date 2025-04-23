"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Servicio } from "../data/schema";
import { toast } from "sonner";
import { DeleteServicio } from "@/actions/dashboard/servicios/delete-servicio";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Servicio;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const handleDelete = async () => {
    if (value.trim() !== currentRow.Nombre_Servicio) return;
    
    const result = await DeleteServicio(currentRow.Id_Servicio);

    if (result.ok) {
      location.reload();
    } else {
      toast.error(result.message);
    }
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.Nombre_Servicio}
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
            ¿Estás seguro de que quieres eliminar este servicio?
            <br />
            Esta acción eliminará permanentemente el servicio{" "}
            <span className="font-bold">{currentRow.Nombre_Servicio}</span> del
            sistema.
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Nombre del servicio:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el nombre de servicio para confirmar la eliminación."
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
