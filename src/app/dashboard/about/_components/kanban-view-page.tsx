import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
/* import { KanbanBoard } from './kanban-board';
import NewTaskDialog from './new-task-dialog'; */
import { Card, CardContent, CardHeader } from '@/components/ui/card';



export default function KanbanViewPage() {
  const teamMembers = [
    {
      name: 'Gabriela Gissel Santos Cruz',
      email: 'ggsantos@unah.hn'
    },
    {
      name: 'Samuel Enrique Godoy Pineda',
      email: 'samuel.godoy@unah.hn'
    },
    {
      name: 'Diego Noé Espinal Ponce',
      email: 'diego.espinal@unah.hn'
    },
    {
      name: 'Luis Armando Cruz Sánchez',
      email: 'lacruzs@unah.hn'
    },
    {
      name: 'Allan Eduardo Suazo Alvarenga',
      email: 'aesuazoa@unah.hn'
    }
  ];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Acerca de`} description="Conoce más sobre nuestro equipo y nuestra misión." />
          {/* <NewTaskDialog /> */}
        </div>
        <Card className="w-full max-w-4xl rounded-lg bg-white shadow-lg">
          <CardHeader className="border-b p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Acerca de Nosotros
            </h1>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700">
                ¿Quienes Somos?
              </h2>
              <p className="mt-2 text-gray-600">
                Somos un equipo de estudiantes de la UNAH, En busca de
                desarrollar un Sistema de Monitoreo de Servidores o Servicios
                SIMOS
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-700">
                Nuestro Equipo
              </h2>
              <ul className="mt-4 space-y-4">
                {teamMembers.map((member) => (
                  <li
                    key={member.email}
                    className="flex flex-col items-start justify-between rounded-lg bg-gray-100 p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <span className="font-medium text-gray-800">
                      {member.name}
                    </span>
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-1 text-sm text-blue-600 hover:underline sm:mt-0 sm:text-base"
                    >
                      {member.email}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>
        {/* <KanbanBoard /> */}
      </div>
    </PageContainer>
  );
}
