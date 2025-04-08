"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Pantalla } from "../data/schema";
import { toast } from "sonner";
import { DeletePantalla } from "@/actions/admin/pantallas/delete-pantalla";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Pantalla;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  //const { mutate } = useSWR("/dashboard/admin/roles", fetch);

  const handleDelete = async () => {
    if (value.trim() !== currentRow.Nombre_Objeto) return;
    const result = await DeletePantalla(currentRow.Id_Objeto);

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
      disabled={value.trim() !== currentRow.Nombre_Objeto}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Eliminar Pantalla
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            ¿Estás segura de que quieres eliminar esta pantalla?
            <br />
            Esta acción eliminará permanentemente la pantalla {" "}
            <span className="font-bold">
              {currentRow.Nombre_Objeto}
            </span>{" "}
            del sistema. 
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            Nombre de pantalla:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca nombre de pantalla para confirmar la eliminación."
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
