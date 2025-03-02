import { api } from "./api-client";

interface PostRequest {
  slug: string;
}

interface GetPostResponse {
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

export async function getPost({ slug }: PostRequest) {
  const response = await api.get(`post/${slug}`).json<GetPostResponse>();

  return response;
}
