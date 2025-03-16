export const metadata = {
  title: 'Dashboard : Acerca de'
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl w-full mx-auto py-6 px-10 bg-gray-100 text-gray-900 shadow-2xl rounded-3xl border border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700 relative overflow-hidden">
      {/* Efecto de luces de neón sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-10 blur-2xl"></div>

      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center dark:from-blue-400 dark:to-purple-500">
        📖 Acerca de Nosotros
      </h1>

      {/* Sección "¿Quiénes Somos?" con efectos de elevación y glow */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-blue-300 dark:bg-gray-800 dark:hover:ring-blue-500 dark:hover:bg-gray-700">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">¿Quiénes Somos?</h2>
        <p className="text-gray-700 mt-2 dark:text-gray-300">
          Somos un equipo de estudiantes de la UNAH comprometidos con el desarrollo de 
          <span className="font-bold text-blue-500 dark:text-blue-300"> SIMOS</span>,  
          un Sistema de Monitoreo de Servidores y Servicios diseñado para optimizar el rendimiento y la supervisión de infraestructuras tecnológicas.
        </p>
      </div>

      {/* Sección de equipo con tarjetas más anchas */}
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">Nuestro Equipo</h2>
        <ul className="mt-3 grid grid-cols-2 gap-4">
          {[
            { name: "Gabriela Gissel Santos Cruz", email: "ggsantos@unah.hn" },
            { name: "Samuel Enrique Godoy Pineda", email: "samuel.godoy@unah.hn" },
            { name: "Diego Noé Espinal Ponce", email: "diego.espinal@unah.hn" },
            { name: "Luis Armando Cruz Sánchez", email: "lacruzs@unah.hn" },
            { name: "Allan Eduardo Suazo Alvarenga", email: "aesuazoa@unah.hn" }
          ].map((member, index) => (
            <li 
              key={index} 
              className="p-3 bg-gray-200 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-purple-300 dark:bg-gray-700 dark:hover:ring-purple-500 dark:hover:bg-gray-600 flex items-center space-x-3"
            >
              <span className="text-xl">🖥️</span>
              <div>
                <span className="font-medium text-blue-600 dark:text-blue-300">{member.name}</span>
                <br />
                <span className="text-gray-600 dark:text-gray-400 text-sm">{member.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
