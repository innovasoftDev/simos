import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { FaUserAlt, FaEnvelope, FaIdBadge, FaRegCheckCircle, FaRegTimesCircle, FaEdit } from "react-icons/fa";
import Image from 'next/image'

interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: string;
  id_user?: string;
  status?: boolean;
  image?: string;
}

const getInitials = (name: string | undefined): string => {
  if (!name) return "?";
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
  return initials;
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  }

  const user: UserProfile = session.user as UserProfile;

  return (
    <div className="max-w-3xl mx-auto p-7 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md rounded-lg mt-6 transition-all duration-300 font-inter">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-inter">
        PERFIL DE USUARIO
      </h2>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-inter">
        VISUALIZAR INFORMACIÓN DE USUARIO
      </p>

      <div className="flex flex-col items-center text-center mb-6 mt-6 font-inter">
        {user.image ? (
          <Image 
            src={user.image}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full shadow-lg mb-2 border-4 border-blue-500 transform transition duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full shadow-lg mb-2 border-4 border-blue-500 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white text-3xl font-bold transform transition duration-300 hover:scale-110">
            {getInitials(user.name)}
          </div>
        )}
        <div className="text-blue-500 flex items-center cursor-pointer mt-0 font-inter">
          <FaEdit className="mr-2" />
          <span>Editar foto de perfil</span>
        </div>
      </div>

      <div className="mt-4 p-5 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4 font-inter">
        <h3 className="text-xl font-semibold mb-4">Información del Usuario</h3>

        {user.id_user && (
          <div className="flex items-center transform transition duration-300 hover:scale-105">
            <FaIdBadge className="mr-2 text-blue-500" />
            <p><strong>ID Usuario:</strong> {user.id_user}</p>
          </div>
        )}

        <div className="flex items-center transform transition duration-300 hover:scale-105">
          <FaUserAlt className="mr-2 text-blue-500" />
          <p><strong>Nombre:</strong> {user.name}</p>
        </div>

        <div className="flex items-center transform transition duration-300 hover:scale-105">
          <FaEnvelope className="mr-2 text-blue-500" />
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        {user.status !== undefined && (
          <div className="flex items-center transform transition duration-300 hover:scale-105">
            {user.status ? (
              <FaRegCheckCircle className="mr-2 text-green-500" />
            ) : (
              <FaRegTimesCircle className="mr-2 text-red-500" />
            )}
            <p><strong>Estado:</strong> {user.status ? "Activo" : "Inactivo"}</p>
          </div>
        )}

        <div className="flex items-center transform transition duration-300 hover:scale-105">
          <FaUserAlt className="mr-2 text-blue-500" />
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}
