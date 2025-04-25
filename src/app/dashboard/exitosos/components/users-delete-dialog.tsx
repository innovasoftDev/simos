"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
//import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Exito } from "../data/schema";
import { toast } from "sonner";
import { DeleteRegistro } from "@/actions/dashboard/exitos/delete-registro";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Exito;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const handleDelete = async () => {
    if (value.trim() !== currentRow.Codigo_Exito) return;
    
    const result = await DeleteRegistro(currentRow.Id_Exito_Servicio);

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
      disabled={value.trim() !== currentRow.Codigo_Exito}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Eliminar Registro
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            ¿Estás seguro de que quieres eliminar este registro?
            <br />
            Esta acción eliminará permanentemente el registro{" "}
            <span className="font-bold">{currentRow.Codigo_Exito}</span> del
            sistema.
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Nombre del registro:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el nombre del registro para confirmar la eliminación."
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
