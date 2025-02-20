"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

// Tipo de permiso
interface Permission {
  id: number;
  role: string;
  screen: string;
  permissions: string[];
}

export default function UsersPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState<Permission>({
    id: 0,
    role: "",
    screen: "",
    permissions: ["INSERTAR"],
  });
  const [showNewPermissionForm, setShowNewPermissionForm] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para el mensaje de error
  const { theme } = useTheme();

  useEffect(() => {
    setPermissions([
      { id: 1, role: "Administrador", screen: "Dashboard", permissions: ["INSERTAR"] },
      { id: 2, role: "Usuario", screen: "Servicio", permissions: ["CONSULTAR"] },
    ]);
  }, []);

  // Agregar o editar permisos
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

  // Eliminar permiso
  const deletePermission = (id: number) => {
    setPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  // Editar permiso
  const editPermission = (id: number) => {
    setEditingPermission(permissions.find((p) => p.id === id) || null);
    setShowNewPermissionForm(true); // Mostrar el formulario para editar
  };

  // Guardar cambios de edición
  const saveEdit = () => {
    if (!editingPermission || !editingPermission.role || !editingPermission.screen || !editingPermission.permissions.length) {
      setErrorMessage("Los campos no pueden estar vacíos. Selecciona un rol, pantalla y al menos un permiso.");
      return;
    }
    setPermissions((prev) =>
      prev.map((p) => (p.id === editingPermission.id ? { ...editingPermission } : p))
    );
    setEditingPermission(null);
    setShowNewPermissionForm(false);
    setErrorMessage(null);
  };

  // Agregar nuevo permiso
  const addNewPermission = () => {
    if (!newPermission.role || !newPermission.screen || !newPermission.permissions.length) {
      setErrorMessage("Los campos no pueden estar vacíos. Selecciona un rol, pantalla y al menos un permiso.");
      return;
    }
    setPermissions((prev) => [
      ...prev,
      { ...newPermission, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 },
    ]);
    setShowNewPermissionForm(false);
    setNewPermission({ id: 0, role: "", screen: "", permissions: ["INSERTAR"] });
    setErrorMessage(null);
  };

  // Manejador de cambios
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: keyof Permission
  ) => {
    const value = e.target.value;
    if (editingPermission) {
      setEditingPermission((prev) => prev ? { ...prev, [field]: value } : prev);
    } else {
      setNewPermission((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Manejador de cambio de permisos
  const handlePermissionSwitch = (perm: string) => {
    if (editingPermission) {
      setEditingPermission((prev) => prev ? {
        ...prev,
        permissions: prev.permissions.includes(perm)
          ? prev.permissions.filter((item) => item !== perm)
          : [...prev.permissions, perm],
      } : prev);
    } else {
      setNewPermission((prev) => ({
        ...prev,
        permissions: prev.permissions.includes(perm)
          ? prev.permissions.filter((item) => item !== perm)
          : [...prev.permissions, perm],
      }));
    }
  };

  return (
    <PageContainer scrollable>
      <Main>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">GESTIÓN DE PERMISOS</h2>
        <Button className="bg-[#5D32F5] text-white mt-4" onClick={() => setShowNewPermissionForm(true)}>
          AGREGAR PERMISO
        </Button>
        <table className="min-w-full divide-y divide-gray-300 mt-4 text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">ROL</th>
              <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white">PANTALLA</th>
              {["INSERTAR", "ACTUALIZAR"].map((header) => (
                <th key={header} className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">
                  {header}
                </th>
              ))}
              {["ELIMINAR", "CONSULTAR"].map((header) => (
                <th key={header} className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">
                  {header}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td className="px-4 py-2">{permission.role}</td>
                <td className="px-4 py-2">{permission.screen}</td>
                {["INSERTAR", "ACTUALIZAR", "ELIMINAR", "CONSULTAR"].map((perm) => (
                  <td key={perm} className="px-4 py-2 text-center">
                    <Switch checked={permission.permissions.includes(perm)} onCheckedChange={() => togglePermission(permission.id, perm)} />
                  </td>
                ))}
                <td className="flex justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => editPermission(permission.id)}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deletePermission(permission.id)}>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Nuevo Permiso Form debajo de la tabla */}
        {showNewPermissionForm && (
          <div className="mt-4 p-4 border rounded-lg shadow-lg bg-white dark:bg-[#06040B] max-w-lg mx-auto">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-center mb-4">{editingPermission ? "EDITAR PERMISO" : "AGREGAR PERMISO"}</h3>
              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
              <div className="mb-4">
                <label>ROL</label>
                <select
                  className="p-2 border rounded w-full text-sm"
                  value={editingPermission ? editingPermission.role : newPermission.role}
                  onChange={(e) => handleInputChange(e, "role")}
                >
                  <option value="">SELECCIONAR ROL</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>
              <div className="mb-4">
                <label>PANTALLA</label>
                <select
                  className="p-2 border rounded w-full text-sm"
                  value={editingPermission ? editingPermission.screen : newPermission.screen}
                  onChange={(e) => handleInputChange(e, "screen")}
                >
                  <option value="">SELECCIONAR PANTALLA</option>
                  {["Dashboard", "Servicios", "Servidores", "Errores", "Alertas", "Usuarios", "Pantallas"].map((screen) => (
                    <option key={screen} value={screen}>
                      {screen}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {["INSERTAR", "ACTUALIZAR"].map((perm) => (
                  <div key={perm} className="flex items-center">
                    <Switch
                      checked={editingPermission ? editingPermission.permissions.includes(perm) : newPermission.permissions.includes(perm)}
                      onCheckedChange={() => handlePermissionSwitch(perm)}
                    />
                    <label className="ml-2 text-sm">{perm}</label>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {["ELIMINAR", "CONSULTAR"].map((perm) => (
                  <div key={perm} className="flex items-center">
                    <Switch
                      checked={editingPermission ? editingPermission.permissions.includes(perm) : newPermission.permissions.includes(perm)}
                      onCheckedChange={() => handlePermissionSwitch(perm)}
                    />
                    <label className="ml-2 text-sm">{perm}</label>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setShowNewPermissionForm(false)}>
                  CANCELAR
                </Button>
                <Button
                  className="bg-blue-500"
                  onClick={editingPermission ? saveEdit : addNewPermission}
                  disabled={!newPermission.role || !newPermission.screen || !newPermission.permissions.length}
                >
                  {editingPermission ? "GUARDAR CAMBIOS" : "GUARDAR"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Main>
    </PageContainer>
  );
}
