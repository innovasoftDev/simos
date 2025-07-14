import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, forgetUrl } = await request.json();
    // Process the JSON body
    //console.log(email);
    //console.log(forgetUrl);

    const { data, error } = await resend.emails.send({
      from: "SIMOS <noreply@innovasoftdev.online>",
      to: [email],
      subject: "Restablecer Contraseña",
      react: EmailTemplate({ buttonUrl: forgetUrl }),
      text: "",
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
