"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Tipo de permiso
interface Permission {
  id: number;
  role: string;
  screen: string;
  permissions: string[];
}

export default function UsersPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Modal de confirmación de eliminación
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setPermissions([
      { id: 1, role: "Administrador", screen: "Dashboard", permissions: ["INSERTAR"] },
      { id: 2, role: "Usuario", screen: "Servicio", permissions: ["CONSULTAR"] },
    ]);
  }, []);

  const togglePermission = (id: number, perm: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              permissions: p.permissions.includes(perm)
                ? p.permissions.filter((item) => item !== perm)
                : [...p.permissions, perm],
            }
          : p
      )
    );
  };

  const deletePermission = (id: number) => {
    setPermissions((prev) => prev.filter((p) => p.id !== id));
    setDeleteModalOpen(false); // Cierra el modal después de eliminar
  };

  const openModal = (permission?: Permission) => {
    setCurrentPermission(permission || { id: 0, role: "", screen: "", permissions: ["INSERTAR"] });
    setErrorMessage(null);
    setModalOpen(true);
  };

  const openDeleteModal = (permission: Permission) => {
    setCurrentPermission(permission);
    setDeleteModalOpen(true);
  };

  const savePermission = () => {
    if (!currentPermission || !currentPermission.role || !currentPermission.screen || !currentPermission.permissions.length) {
      setErrorMessage("Los campos no pueden estar vacíos.");
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
    setCurrentPermission(null); // Limpia los datos del formulario al cancelar
  };

  const cancelDeleteModal = () => {
    setDeleteModalOpen(false); // Cierra el modal de eliminación sin hacer cambios
  };

  return (
    <PageContainer scrollable>
      <Main>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">GESTIÓN DE PERMISOS</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Asignación de permisos y acceso a pantallas.</p>
        <div className="flex justify-end">
          <Button className="bg-[#5D32F5] text-white mt-4" onClick={() => openModal()}>AGREGAR PERMISO</Button>
        </div>

        <table className="min-w-full divide-y divide-gray-700 mt-4 text-sm">
          <thead>
            <tr>
              <th className="text-left">ROL</th>
              <th className="text-left">PANTALLA</th>
              {["INSERTAR", "ACTUALIZAR", "ELIMINAR", "CONSULTAR"].map((perm) => (
                <th key={perm} className="text-center">{perm}</th>
              ))}
              <th className="text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission, index) => (
              <tr key={permission.id} className={index !== permissions.length - 1 ? "border-b border-gray-700" : ""}>
                <td className="text-left">{permission.role}</td>
                <td className="text-left">{permission.screen}</td>
                {["INSERTAR", "ACTUALIZAR", "ELIMINAR", "CONSULTAR"].map((perm) => (
                  <td key={perm} className="text-center">
                    <Switch checked={permission.permissions.includes(perm)} onCheckedChange={() => togglePermission(permission.id, perm)} />
                  </td>
                ))}
                <td className="flex justify-center items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex justify-center items-center">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openModal(permission)}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDeleteModal(permission)}>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL DE PERMISO */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPermission?.id ? "EDITAR PERMISO" : "AGREGAR PERMISO"}</DialogTitle>
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
              <label>PANTALLA</label>
              <select
                className="p-2 border rounded w-full"
                value={currentPermission?.screen || ""}
                onChange={(e) => setCurrentPermission((prev) => prev ? { ...prev, screen: e.target.value } : prev)}
              >
                <option value="">--SELECCIONAR PANTALLA--</option>
                {["Dashboard", "Servicios", "Servidores", "Pantallas", "Alertas", "Errores", "Usuarios"].map((screen) => (
                  <option key={screen} value={screen}>{screen}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label>PERMISOS</label>
              <div className="grid grid-cols-2 gap-4">
                {["INSERTAR", "ACTUALIZAR", "ELIMINAR", "CONSULTAR"].map((perm) => (
                  <div key={perm} className="flex items-center space-x-2">
                    <Switch 
                      checked={currentPermission?.permissions.includes(perm)} 
                      onCheckedChange={() => setCurrentPermission((prev) => 
                        prev ? {
                          ...prev,
                          permissions: prev.permissions.includes(perm)
                            ? prev.permissions.filter((p) => p !== perm)
                            : [...prev.permissions, perm]
                        } : prev
                      )}
                    />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="w-full" onClick={cancelModal}>CANCELAR</Button>
              <Button onClick={savePermission} className="w-full bg-blue-500">GUARDAR</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* MODAL DE CONFIRMACION DE ELIMINACION */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Estás seguro de eliminar los permisos de este ROL?</DialogTitle>
            </DialogHeader>
            <p>Esta acción no se puede revertir.</p>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" className="w-full" onClick={cancelDeleteModal}>CANCELAR</Button>
              <Button onClick={() => currentPermission && deletePermission(currentPermission.id)} className="w-full bg-red-600">ELIMINAR</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Main>
    </PageContainer>
  );
}
