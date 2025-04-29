"use server";

import { signIn } from "@/auth.config";
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2);

    const res = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    //console.log(res);

    return "Success";
  } catch (error) {
    if(error instanceof AuthError){
      //console.log(error.cause);
      console.error(error.cause);
      
    }
    
    return "CredentialsSignin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return {
      ok: true,
      message: "¡Ha iniciado sesión correctamente!",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
