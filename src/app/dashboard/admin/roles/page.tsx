"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Tipo de permiso
interface Permission {
  id: number;
  role: string;
  screen: string;
}

export default function UsersPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setPermissions([
      { id: 1, role: "Administrador", screen: "Activo" },
      { id: 2, role: "Usuario", screen: "Activo" },
      { id: 3, role: "Administrador", screen: "Activo" },
      { id: 4, role: "Usuario", screen: "Inactivo" },
    ]);
  }, []);

  const deletePermission = (id: number) => {
    setPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  const openModal = (permission?: Permission) => {
    setCurrentPermission(permission || { id: 0, role: "", screen: "" });
    setErrorMessage(null);
    setModalOpen(true);
  };

  const savePermission = () => {
    if (!currentPermission || !currentPermission.role || !currentPermission.screen) {
      setErrorMessage("Los campos no pueden estar vacíos.");
      return;
    }

    setPermissions((prev) =>
      currentPermission.id
        ? prev.map((p) => (p.id === currentPermission.id ? { ...currentPermission } : p))
        : [...prev, { ...currentPermission, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 } ]
    );

    setModalOpen(false);
  };

  const cancelModal = () => {
    setModalOpen(false);
    setErrorMessage(null);
    setCurrentPermission(null);
  };

  return (
    <PageContainer scrollable>
      <Main>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">GESTIÓN DE ROLES</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Asignación de Roles.</p>
        <div className="flex justify-end">
          <Button className="bg-[#5D32F5] text-white mt-4" onClick={() => openModal()}>AGREGAR ROL</Button>
        </div>

        <table className="min-w-full border-gray-700 mt-4 text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-2">ROL</th>
              <th className="text-left p-2">ESTADO</th>
              <th className="text-center p-2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission, index) => (
              <tr key={permission.id} className={index === permissions.length - 1 ? "" : "border-b border-gray-600"}>
                <td className="text-left p-2">{permission.role}</td>
                <td className="text-left p-2">
                  <span className="border border-gray-600 px-3 py-1 font-bold text-sm inline-block rounded-md">
                    {permission.screen}
                  </span>
                </td>
                <td className="flex justify-center items-center p-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex justify-center items-center">
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openModal(permission)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deletePermission(permission.id)}>Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Más opciones</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPermission?.id ? "EDITAR ROL" : "EDITAR ROL"}</DialogTitle>
            </DialogHeader>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <div>
              <label>ROL</label>
              <select
                className="p-2 border rounded w-full"
                value={currentPermission?.role || ""}
                onChange={(e) => setCurrentPermission((prev) => prev ? { ...prev, role: e.target.value } : prev)}
              >
                <option value="">--SELECCIONAR ROL--</option>    
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
            <div>
              <label>ESTADO</label>
              <select
                className="p-2 border rounded w-full"
                value={currentPermission?.screen || ""}
                onChange={(e) => setCurrentPermission((prev) => prev ? { ...prev, screen: e.target.value } : prev)}
              >
                <option value="">--SELECCIONAR ESTADO--</option>
                {["Activo", "Inactivo"].map((screen) => (
                  <option key={screen} value={screen}>{screen}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="w-full" onClick={cancelModal}>CANCELAR</Button>
              <Button onClick={savePermission} className="w-full bg-blue-500">GUARDAR</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Main>
    </PageContainer>
  );
}
