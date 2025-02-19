"use client";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Main } from "@/components/layout/main";
import { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import PageContainer from "@/components/layout/page-container";
import ScreensContextProvider from '../context/screens-context';
import { ScreensDialogType } from '../context/screens-context';
import { Screens } from "../data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { ScreenssActionDialog } from "./screens-action-dialog";

export default function PantallasPage() {
  
  const [currentRow, setCurrentRow] = useState<Screens | null>(null);
  const [open, setOpen] = useDialogState<ScreensDialogType>(null);
  

  return (
     <PageContainer scrollable>
      <ScreensContextProvider
              value={{ open, setOpen, currentRow, setCurrentRow }}
        
              >
                <Main>
                <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Accesos a las Pantallas
              </h2>
              <p className="text-muted-foreground">
                Administra aquí el acceso a las pantallas.
              </p>
            </div>
            <div className="flex gap-2">

            <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Pantalla</span>
              </Button>
              
              {/* <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Usuario</span> <UserPlus size={18} />
              </Button> */}
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Table>
           <TableCaption>
             {" "}
             <Button>Guardar</Button>
           </TableCaption>
           <TableHeader>
             <TableRow>
             <TableHead>Pantalla</TableHead>
               <TableHead>Administrador</TableHead>
               <TableHead>Usuarios</TableHead>
               <TableHead>Auditor</TableHead>
               <TableHead>Acciones</TableHead>
              
             </TableRow>
           </TableHeader>
           <TableBody>
             <TableRow>
               <TableCell className="font-medium">Dashboard</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>
             
             <TableRow>
               <TableCell className="font-medium">Servicios</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Servidores</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Alertas</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Errores</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Usuarios</TableCell>

               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>
               <TableCell className="font-medium"><Switch /></TableCell>

               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
            
          
            
            </TableRow>
           </TableBody>
         </Table>
          </div>



                </Main>
                <ScreenssActionDialog 
                
                key="user-add"
                 open={open === "add"}
                onOpenChange={() => setOpen("add")}/>
              </ScreensContextProvider>

     </PageContainer>

  );
}
