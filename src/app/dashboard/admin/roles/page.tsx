"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getAllRoles } from "@/actions/admin/roles/getAllRoles";
import { Role } from "./data/schema";

// Tipo de permiso
interface Permission {
  id: number;
  role: string;
  screen: string;
}

async function getData(): Promise<Role[]> {
  const { roles = [] } = await getAllRoles();

  // Fetch data from your API here.
  return roles;
}

export default function UsersPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Estado para el diálogo de confirmación de eliminación
  const [roleToDelete, setRoleToDelete] = useState<Permission | null>(null); // Rol que se va a eliminar
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  useEffect(() => {
    setPermissions([
      { id: 1, role: "Administrador", screen: "Activo" },
      { id: 2, role: "Usuario", screen: "Activo" },
    ]);
  }, []);

  const deletePermission = (id: number) => {
    setPermissions((prev) => prev.filter((p) => p.id !== id));
    setDeleteDialogOpen(false); // Cerrar el diálogo después de eliminar
  };

  const openModal = (permission?: Permission) => {
    setCurrentPermission(permission || { id: 0, role: "", screen: "Activo" });
    setErrorMessage(null);
    setWarningMessage(null);
    setModalOpen(true);
  };

  const savePermission = () => {
    if (!currentPermission || !currentPermission.role || !currentPermission.screen) {
      setErrorMessage("No se permiten caracteres especiales ni campos vacíos.");
      return;
    }

    // Verificar si el rol ya existe
    const roleExists = permissions.some((permission) => permission.role === currentPermission.role);
    if (roleExists) {
      setErrorMessage("El rol ya existe.");
      return;
    }

    setPermissions((prev) =>
      currentPermission.id
        ? prev.map((p) => (p.id === currentPermission.id ? { ...currentPermission } : p))
        : [...prev, { ...currentPermission, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 }]
    );

    setModalOpen(false);
  };

  const cancelModal = () => {
    setModalOpen(false);
    setErrorMessage(null);
    setWarningMessage(null);
    setCurrentPermission(null);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^[a-zA-Z0-9 ]*$/.test(value)) {
      setWarningMessage("No se permiten caracteres especiales.");
      return;
    }
    if (value.length > 30) {
      setWarningMessage("Máximo 30 caracteres permitidos.");
      return;
    }
    setWarningMessage(null);
    setCurrentPermission((prev) => prev ? { ...prev, role: value } : prev);
  };

  const confirmDelete = (permission: Permission) => {
    setRoleToDelete(permission); // Guardar el rol a eliminar
    setDeleteDialogOpen(true); // Abrir el diálogo de confirmación
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false); // Cerrar el diálogo sin eliminar
    setRoleToDelete(null);
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
                  <span className="border border-gray-600 px-2 py-0.5 text-xs font-bold inline-block rounded-md">
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
                            <DropdownMenuItem onClick={() => confirmDelete(permission)}>Eliminar</DropdownMenuItem>
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

        {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
            </DialogHeader>
            <div>
              <p>¿Estás seguro de que deseas eliminar este ROL? Esta acción no se puede revertir.</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="w-full" onClick={cancelDelete}>CANCELAR</Button>
              <Button onClick={() => roleToDelete && deletePermission(roleToDelete.id)} className="w-full bg-red-600">ELIMINAR</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* MODAL DE EDICIÓN */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPermission?.id ? "EDITAR ROL" : "EDITAR ROL"}</DialogTitle>
            </DialogHeader>
            <div>
              <label>ROL</label>
              <input
                type="text"
                className="p-2 border rounded w-full"
                value={currentPermission?.role || ""}
                onChange={handleRoleChange}
                placeholder="Ingrese el rol"
              />
              {warningMessage && <p className="text-[#F31260] text-sm font-bold mt-1">{warningMessage}</p>}
            </div>
            {errorMessage && <p className="text-[#F31260] text-sm font-bold mt-1">{errorMessage}</p>}
            <div>
              <label>ESTADO</label>
              <select
                className="p-2 border rounded w-full"
                value={currentPermission?.screen || "Activo"}
                onChange={(e) => setCurrentPermission((prev) => prev ? { ...prev, screen: e.target.value } : prev)}
              >
                {"Activo Inactivo".split(" ").map((screen) => (
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
