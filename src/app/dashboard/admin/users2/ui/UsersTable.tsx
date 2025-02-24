"use client";

import { changeUserRole } from "@/actions/admin/users/change-user-role";
import PageContainer from "@/components/layout/page-container";
import type { User } from "@/interfaces";
import { Main } from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical } from "lucide-react";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  
  return (
    <PageContainer scrollable>
      <Main>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          LISTA DE USUARIOS
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Administra aquí a tus usuarios y sus roles.
        </p>
        <div className="flex justify-end">
          <Button className="bg-[#5D32F5] text-white mt-4">AGREGAR ROL</Button>
        </div>

        <table className="min-w-full border-gray-700 mt-4 text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">ESTADO</th>
              <th className="text-center p-2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id_user}
                className={
                  index === user.id_user.length - 1
                    ? ""
                    : "border-b border-gray-600"
                }
              >
                <td className="text-left p-2">{user.tbl_usr_roles_id_rol}</td>
                <td className="text-left p-2">
                  <span className="border border-gray-600 px-2 py-0.5 text-xs font-bold inline-block rounded-md">
                    {user.status}
                  </span>
                </td>
                <td className="flex justify-center items-center p-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex justify-center items-center"
                            >
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              /* onClick={() => openModal(user)} */
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              /* onClick={() => deletePermission(user.id_user)} */
                            >
                              Eliminar
                            </DropdownMenuItem>
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

        {/* <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPermission?.id ? "EDITAR USUARIO" : "EDITAR USUARIO"}</DialogTitle>
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
        </Dialog> */}
      </Main>
    </PageContainer>

    /* return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id_user}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <select
                value={user.tbl_usr_roles_id_rol}
                onChange={(e) => changeUserRole(user.id_user, e.target.value)}
                className="text-sm w-full p-2 text-gray-900"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ); */
  );
};
