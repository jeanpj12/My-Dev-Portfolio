import { api } from "./api-client";

interface GetProfileResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: "subscriber" | "author";
  };
}

export async function getProfile() {
  const response = await api.get("profile").json<GetProfileResponse>();

  return response;
}
