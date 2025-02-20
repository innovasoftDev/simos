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
  };

  // Guardar cambios de edición
  const saveEdit = () => {
    if (!editingPermission) return;
    setPermissions((prev) =>
      prev.map((p) => (p.id === editingPermission.id ? { ...editingPermission } : p))
    );
    setEditingPermission(null);
  };

  // Agregar nuevo permiso
  const addNewPermission = () => {
    setPermissions((prev) => [
      ...prev,
      { ...newPermission, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 },
    ]);
    setShowNewPermissionForm(false);
    setNewPermission({ id: 0, role: "", screen: "", permissions: ["INSERTAR"] });
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Permisos</h2>
        <Button className="bg-[#5D32F5] text-white mt-4" onClick={() => setShowNewPermissionForm(true)}>
          Nuevo Permiso
        </Button>
        <table className="min-w-full divide-y divide-gray-300 mt-4">
          <thead>
            <tr>
              {["Rol", "Pantalla", "Insertar", "Eliminar", "Actualizar", "Consultar", "Acciones"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.role}</td>
                <td>{permission.screen}</td>
                {["INSERTAR", "ELIMINAR", "ACTUALIZAR", "CONSULTAR"].map((perm) => (
                  <td key={perm}>
                    <Switch checked={permission.permissions.includes(perm)} onCheckedChange={() => togglePermission(permission.id, perm)} />
                  </td>
                ))}
                <td>
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
        {(showNewPermissionForm || editingPermission) && (
          <div className="mt-4 p-6 border rounded-lg shadow-lg bg-white dark:bg-[#06040B]">
            <h3 className="text-xl font-semibold">{editingPermission ? "Editar Permiso" : "Nuevo Permiso"}</h3>
            <label>Rol</label>
            <select
              className="p-2 border rounded"
              value={editingPermission?.role || newPermission.role}
              onChange={(e) => handleInputChange(e, "role")}
            >
              <option value="">Seleccionar rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
            <label>Pantalla</label>
            <select
              className="p-2 border rounded"
              value={editingPermission?.screen || newPermission.screen}
              onChange={(e) => handleInputChange(e, "screen")}
            >
              {["Dashboard", "Servicios", "Servidores", "Errores", "Alertas", "Usuarios", "Pantallas"].map((screen) => (
                <option key={screen} value={screen}>
                  {screen}
                </option>
              ))}
            </select>
            {["INSERTAR", "ELIMINAR", "ACTUALIZAR", "CONSULTAR"].map((perm) => (
              <div key={perm} className="flex items-center mt-2">
                <Switch
                  checked={(editingPermission || newPermission).permissions.includes(perm)}
                  onCheckedChange={() => handlePermissionSwitch(perm)}
                />
                <label className="ml-2 text-sm">{perm}</label>
              </div>
            ))}
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => { setShowNewPermissionForm(false); setEditingPermission(null); }}>
                Cancelar
              </Button>
              <Button
                className="bg-[#5D32F5] text-white"
                onClick={editingPermission ? saveEdit : addNewPermission}
              >
                {editingPermission ? "Guardar Cambios" : "Guardar Nuevo Permiso"}
              </Button>
            </div>
          </div>
        )}
      </Main>
    </PageContainer>
  );
}
