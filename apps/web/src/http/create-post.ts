import { api } from "./api-client";
import { JSONContent } from "@tiptap/react";

interface CreatePostRequest {
  title: string;
  summary: string;
  content: JSONContent;
  status: "published" | "draft";
}

export async function createPost({
  title,
  summary,
  content,
  status,
}: CreatePostRequest) {
  const response = await api
    .post("post", {
      body: JSON.stringify({
        title,
        summary,
        content,
        status,
      }),
    })
    .json();

  return response;
}
