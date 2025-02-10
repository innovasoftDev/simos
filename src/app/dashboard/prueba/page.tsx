import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <div>
      <Title title="Prueba" />

      <Button variant="secondary">Click me</Button>
      
    </div>
  );
}
