'use server';
import { redirect } from "next/navigation";
import { signOut } from '@/auth.config';


export const logout = async() => {

  await signOut();

  redirect("/auth/login?returnTo=/perfil");

}