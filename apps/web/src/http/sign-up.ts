import { api } from "./api-client";

interface SignUpRequest {
  email: string;
  password: string;
}

type SignUpResponse = void;

export async function signUp({
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post("users/create", {
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
