"use client";
import { HTMLAttributes, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ValidarCorreo } from "@/actions/auth/forgot-password";

type ForgotFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Por favor ingrese su correo electrónico." })
    .max(30, { message: "Máximo 30 caracteres." })
    .email({ message: "Dirección de correo electrónico no válida" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Correo inválido.",
    }),
});

async function getData(email: string) {
  const result = await ValidarCorreo(email);

  // Fetch data from your API here.
  return result;
}

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [charWarning, setCharWarning] = useState("");
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await getData(data.email);

    setIsLoading(true);
    //console.log(result + " " + data.email);

    if (result.ok) {
      try {
        const forgetUrl = `http://www.innovasoftdev.online/auth/change-password?email=${data.email}`;

        const dataBody = {
          email: data.email,
          forgetUrl: forgetUrl,
        };

        //Enviar correo
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        });
        const result = await res.json();
        //console.log(result);

        if (result.error == null) {
          toast.success("Se ha enviado correo a: " + data.email); 
        }else{
          toast.error("Error al enviar correo, revisar log");
          console.log(result);
        }        
      } catch (error) {
        toast.error("Error al enviar correo, revisar log");
        console.log(error);
      }
    } else {
      toast.error(result.message);
    }

    setTimeout(() => {
      setIsLoading(false);
      if (result.ok) {
        location.replace("/auth/login?returnTo=/perfil");
      }
    }, 2000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@gmail.com" {...field} />
                  </FormControl>
                  {charWarning && (
                    <p className="text-red-700 text-sm font-medium">
                      {charWarning}
                    </p>
                  )}
                  <FormMessage className="text-red-700 text-sm font-medium" />
                </FormItem>
              )}
            />
            <Button className="mt-4" disabled={isLoading}>
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
