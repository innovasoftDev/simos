"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { columns } from "./components/users-columns";
import { BitacoraTable } from "./components/bitacora-table";
import UsersContextProvider, {
  type UsersDialogType,
} from "./context/users-context";
import { Bitacora } from "./data/schema";
import PageContainer from "@/components/layout/page-container";
import { getAllBitacora } from "@/actions/admin/Bitacora/getAllBitacora";


export default function BitacoraPage() {
  const [data, setData] = useState<Bitacora[]>([]);

  useEffect(() => {
    const fetchBitacora = async () => {
      const { ok, bitacora, message } = await getAllBitacora();

      if (ok && bitacora) {
        setData(bitacora as Bitacora[]);
      } else {
        console.error("Error al cargar la bitácora:", message || "Mensaje desconocido");
        setData([]);

      }
    };

    fetchBitacora();
  }, []);

  const [currentRow, setCurrentRow] = useState<Bitacora | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  return (
    <PageContainer scrollable>
      <UsersContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      >
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bitácora</h2>
              <p className="text-muted-foreground">
                Administra aquí su Bitácora.
              </p>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            {/* El componente BitacoraTable recibe los datos y las columnas */}
            <BitacoraTable data={data} columns={columns} />
          </div>
        </Main>
      </UsersContextProvider>
    </PageContainer>
  );
}