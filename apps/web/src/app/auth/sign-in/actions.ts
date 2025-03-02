"use server";

import { signInWithPassword } from "@/http/sign-in-password";
import { z } from "zod";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signInSchemma = z.object({
  email: z.string().email({ message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export async function signInWithEmailAndPassword(data: FormData) {
  const signInData = signInSchemma.safeParse(Object.fromEntries(data));

  if (!signInData.success) {
    const errors = signInData.error.flatten().fieldErrors;
    return { sucess: false, message: null, errors };
  }

  const { email, password } = signInData.data;

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    });

    const cookieStore = await cookies();

    await cookieStore.set("token", token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { sucess: false, message, errors: null };
    }

    console.error(err);

    return {
      sucess: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }

  redirect("/");
}
