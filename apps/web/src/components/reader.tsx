"use client";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/agate.css";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);


interface ReaderProps {
  content: JSONContent;
}

export const Reader: React.FC<ReaderProps> = ({ content }) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
          lowlight,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent
        className="prose min-w-full rounded-md p-4"
        editor={editor}
      />
    </>
  );
};
