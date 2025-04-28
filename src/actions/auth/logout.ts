"use server";
//import { redirect } from "next/navigation";
import { signOut } from "@/auth.config";

export const logout = async () => {
  await signOut();

  location.reload();
};
