"use client";

import { useState } from "react";
import { Editor } from "./Editor";
import { JSONContent } from "@tiptap/react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { createPost } from "@/http/create-post";
import { HTTPError } from "ky";

const EditorClient = () => {
  const [content, setContent] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState<string>("Title this post");
  const [summary, setSummary] = useState<string>("Summary this post");

  const handlePublish = async () => {
    if (!content) {
      alert("O conteúdo do post está vazio.");
      return;
    }

    try {
      await createPost({ title, summary, content, status: "published" });
    } catch (err) {
      if (err instanceof HTTPError) {
        const { message } = await err.response.json();
        return { sucess: false, message, errors: null };
      }

      console.error(err);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeSummary = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSummary(event.target.value);
  };

  return (
    <div className="flex flex-col gap-5 mt-5 min-w-full">
      <Editor setContent={setContent} />

      <div
        id="editorWrapper"
        className="flex flex-col gap-3 shadow-md rounded-md p-2"
      >
        <header className="p-5  flex justify-between items-center">
          <Label>{title}</Label>
          <Button
            onClick={handlePublish}
            variant={"outline"}
            className="cursor-pointer"
          >
            Publicar
          </Button>
        </header>
        <div className="flex flex-col gap-2">
          <div className="bg-accent p-4 rounded-md">
            <input
              type="text"
              value={title}
              id="title"
              name="title"
              className=" w-full text-xl outline-none p-2 rounded-md"
              onChange={handleChangeTitle}
            />
          </div>
          <div className="bg-accent p-4 rounded-md">
            <textarea
              value={summary}
              id="summary"
              name="summary"
              className="text-sm outline-none p-2 rounded-md w-full resize-none"
              onChange={handleChangeSummary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorClient;
