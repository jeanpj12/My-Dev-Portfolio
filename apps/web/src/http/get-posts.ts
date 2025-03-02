import { api } from "./api-client";

interface GetPostsResponse {
  id: string;
  author: string;
  title: string;
  summary: string;
  content?: string;
  status: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
}

export async function getPosts() {
  const response = await api.get("post").json<GetPostsResponse[]>();

  return response;
}
