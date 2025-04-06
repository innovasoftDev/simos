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
import { Badge } from '@/components/ui/badge';

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
                Gestión de las Pantallas
              </h2>
              <p className="text-muted-foreground">
                Administra las pantallas.
              </p>
            </div>
            <div className="flex gap-2">

            <Button className="space-x-1" onClick={() => setOpen("add")}>
                <span>Agregar Pantalla</span>
              </Button>
              
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Table>
           <TableCaption>
             {" "}
          
           </TableCaption>
           <TableHeader>
             <TableRow>
             <TableHead>Pantalla</TableHead>
             <TableHead>Descripción</TableHead>
             <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
             </TableRow>

             
           </TableHeader>
           <TableBody>
             <TableRow>
               <TableCell className="font-medium">Dashboard</TableCell>

               <TableCell className="font-medium">Es la pantalla principal del sistema de monitoreo, 
                proporcionando una visión general del estado de los servicios,
                 servidores y alertas</TableCell>
                
               
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>

               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>
             
             <TableRow>
               <TableCell className="font-medium">Servicios</TableCell>

               <TableCell className="font-medium">Indica métricas como tiempo de respuesta, latencia, uso de recursos y número de peticiones procesadas.</TableCell>
              
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Servidores</TableCell>

               <TableCell className="font-medium">Presenta información detallada sobre los servidores que ejecutan los servicios.</TableCell>
             
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Alertas</TableCell>

               <TableCell className="font-medium">Lista las alertas generadas por el sistema cuando se detectan problemas o anomalías.</TableCell>
              
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Errores</TableCell>

               <TableCell className="font-medium">Muestra registros de errores detectados en los servicios y servidores.</TableCell>
               
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
             </TableRow>

             <TableRow>
               <TableCell className="font-medium">Usuarios</TableCell>

               <TableCell className="font-medium">Permite la gestión de los usuarios del sistema de monitoreo.</TableCell>
              
              
               <TableCell className="font-medium"><Badge variant='outline' className=""> Activo</Badge></TableCell>
               <TableCell className="font-medium"><DataTableRowActions/></TableCell>
            
          
            
            </TableRow>
           </TableBody>
         </Table>
          </div>



                </Main>
                <ScreenssActionDialog 
                
                key="user-add"
                 open={open === "add"}
                 isEdit={open === "edit"}
                onOpenChange={() => setOpen("add")}/>
              </ScreensContextProvider>

     </PageContainer>

  );
}
