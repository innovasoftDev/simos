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

export default async function PantallasPage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <Main>
      <div >
        <Table>
          <TableCaption>
            {" "}
            <Button>Guardar</Button>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rol</TableHead>
              <TableHead>Dashboard</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Servidores</TableHead>
              <TableHead>Alertas</TableHead>
              <TableHead>Errores</TableHead>
              <TableHead>Usuarios</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Administrador</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Usuarios</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Auditor</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell>
                <Switch />
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Main>
  );
}
