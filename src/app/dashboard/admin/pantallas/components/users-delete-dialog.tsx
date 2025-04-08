"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
//import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Pantalla } from "../data/schema";
//import { toast } from "sonner";
import { DeletePantalla } from "@/actions/admin/pantallas/delete-pantalla";
//import useSWR from 'swr'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Pantalla;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");
  //const { mutate } = useSWR("/dashboard/admin/roles", fetch);

  const handleDelete = async () => {
    if (parseInt(value.trim()) !== currentRow.Id_Objeto) return;
    const result = await DeletePantalla(parseInt(value.trim()));

    /* if (result.ok) {
      //mutate();
      toast.error("Eliminar", {
        description: "¡Se ha eliminado el Rol!",
      });
    } else {
      toast.error("Eliminar", {
        description: "¡Ocurrió un error!",
      });
    } */

    onOpenChange(false);

    if (result.ok) {location.reload();}
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={parseInt(value.trim()) !== currentRow.Id_Objeto}
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
              {currentRow.Id_Objeto}
            </span>{" "}
            del sistema. 
            <br />
            Esto no se puede deshacer.
          </p>

          <Label className="my-2">
            ID de pantalla:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Introduzca el ID de pantalla para confirmar la eliminación."
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
