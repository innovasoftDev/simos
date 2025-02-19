"use client";
import { useState, useEffect } from "react";
import { Main } from "@/components/layout/main";
import PageContainer from "@/components/layout/page-container";

export default function UsersPage() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [name, setName] = useState("");
  const [permissionType, setPermissionType] = useState("INSERTAR");
  const userRole = "admin";

  useEffect(() => {
    setPermissions([
      { id: 1, name: "Luis Cruz", description: "INSERTAR" },
      { id: 2, name: "Samuel Godoy", description: "CONSULTAR" },
      { id: 3, name: "Diego Espinal", description: "ACTUALIZAR" },
      { id: 4, name: "Gabriela Santos", description: "ELIMINAR" },
    ]);
  }, []);

  const handleEdit = (id: number) => {
    const permission = permissions.find((perm) => perm.id === id);
    setSelectedPermission(permission);
    setName(permission.name);
    setPermissionType(permission.description);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const updatedPermissions = permissions.map((perm) =>
        perm.id === selectedPermission.id
          ? { ...perm, name, description: permissionType }
          : perm
      );
      setPermissions(updatedPermissions);
    } else {
      const newPermission = { id: permissions.length + 1, name, description: permissionType };
      setPermissions([...permissions, newPermission]);
    }
    setName("");
    setPermissionType("INSERTAR");
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <PageContainer scrollable>
      <Main>
        <div className="mb-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">Gestión de Permisos</h2>
        </div>

        <div className="overflow-hidden bg-[#06040B] shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#5D32F5] text-white px-4 py-2 rounded-md"
            >
              Nuevo Permiso
            </button>
          </div>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white">Usuario</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white">Permiso</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-[#06040B]">
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td className="px-6 py-4 text-sm text-white">{permission.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{permission.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {userRole === "admin" && (
                        <>
                          <button
                            onClick={() => handleEdit(permission.id)}
                            className="text-blue-400"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(permission.id)}
                            className="text-red-400 ml-2"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">Usuario</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-[#06040B] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="permission" className="block text-sm font-medium text-white">Permiso</label>
                <select
                  id="permission"
                  name="permission"
                  value={permissionType}
                  onChange={(e) => setPermissionType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-[#06040B] text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="INSERTAR">INSERTAR</option>
                  <option value="CONSULTAR">CONSULTAR</option>
                  <option value="ACTUALIZAR">ACTUALIZAR</option>
                  <option value="ELIMINAR">ELIMINAR</option>
                </select>
              </div>
              <button type="submit" className="bg-[#5D32F5] text-white px-4 py-2 rounded-md">
                {isEditing ? "Actualizar Permiso" : "Guardar Permiso"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </Main>
    </PageContainer>
  );
}
