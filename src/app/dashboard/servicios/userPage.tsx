"use client";
import { useState } from "react";
import { HandPlatter } from "lucide-react";
import useDialogState from "@/hooks/use-dialog-state";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { UsersActionDialog } from "./components/users-action-dialog";
import { columns } from "./components/users-columns";
import { UsersDeleteDialog } from "./components/users-delete-dialog";
import { UsersTable } from "./components/users-table";
import ServiceContextProvider, {
  type ServiceDialogType,
} from "./context/services-context";
import {
  Service,
  serviceListSchema,
} from "./data/schema";
import { services } from "./data/services";
import PageContainer from "@/components/layout/page-container";

export default function UsersPage() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Service | null>(null);
  const [open, setOpen] = useDialogState<ServiceDialogType>(null);

  // Parse user list
  const serviceList = serviceListSchema.parse(services);

  return (
    <PageContainer scrollable>
      <ServiceContextProvider
        value={{ open, setOpen, currentRow, setCurrentRow }}
      >
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Servicios</h2>
              <p className="text-muted-foreground">
                Administra aquí tus servicios.
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Servicios</span> <HandPlatter size={18} />
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={serviceList} columns={columns} />
          </div>
        </Main>

        <UsersActionDialog
          key="user-add"
          open={open === "add"}
          onOpenChange={() => setOpen("add")}
        />

        {currentRow && (
          <>
            <UsersActionDialog
              key={`user-edit-${currentRow.id}`}
              open={open === "edit"}
              onOpenChange={() => {
                setOpen("edit");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />

            <UsersDeleteDialog
              key={`user-delete-${currentRow.id}`}
              open={open === "delete"}
              onOpenChange={() => {
                setOpen("delete");
                setTimeout(() => {
                  setCurrentRow(null);
                }, 500);
              }}
              currentRow={currentRow}
            />
          </>
        )}
      </ServiceContextProvider>
    </PageContainer>
  );
}
