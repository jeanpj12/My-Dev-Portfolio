import { api } from "./api-client";

interface SignInPasswordRequest {
  email: string;
  password: string;
}

interface SignInPaswwordResponse {
  token: string;
}

export async function signInWithPassword({
  email,
  password,
}: SignInPasswordRequest) {
  const response = await api
    .post("sessions", {
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .json<SignInPaswwordResponse>();

  return response;
}
