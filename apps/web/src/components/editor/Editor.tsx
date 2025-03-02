"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  JSONContent,
} from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/agate.css";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxListBullet,
  RxTextAlignLeft,
  RxTextAlignRight,
  RxTextAlignCenter,
  RxTextAlignJustify,
} from "react-icons/rx";
import { HiMiniH1, HiMiniH2, HiMiniH3 } from "react-icons/hi2";
import { GoListOrdered } from "react-icons/go";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { initialContent } from "./initialContent";


interface EditorProps {
  setContent: (content: JSONContent) => void;
}

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const Editor: React.FC<EditorProps> = ({ setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
  });

  const applyCommand = (callback: () => void) => {
    editor
      ?.chain()
      .focus()
      .deleteRange({
        from: editor.state.selection.from - 1,
        to: editor.state.selection.from,
      })
      .run();
    callback();
  };

  return (
    <>
      <EditorContent className="prose min-w-full bg-accent rounded-md order-2 md:order-1 p-4" editor={editor} />
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            const currentLineText = $from.nodeBefore?.textContent;
            return currentLineText === "/";
          }}
        >
          <Command className="shadow-xl">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Format">
                <CommandItem
                  onClickCapture={() =>
                    applyCommand(() =>
                      editor.chain().focus().setHeading({ level: 1 }).run()
                    )
                  }
                  data-active={editor.isActive("heading", { level: 1 })}
                >
                  <HiMiniH1 size={18} />
                  Heading 1
                </CommandItem>
                <CommandItem
                  onClickCapture={() =>
                    applyCommand(() =>
                      editor.chain().focus().setHeading({ level: 2 }).run()
                    )
                  }
                  data-active={editor.isActive("heading", { level: 2 })}
                >
                  <HiMiniH2 size={18} />
                  Heading 2
                </CommandItem>
                <CommandItem
                  onClickCapture={() =>
                    applyCommand(() =>
                      editor.chain().focus().setHeading({ level: 3 }).run()
                    )
                  }
                  data-active={editor.isActive("heading", { level: 3 })}
                >
                  <HiMiniH3 size={18} />
                  Heading 3
                </CommandItem>

                <CommandItem
                  onClickCapture={() =>
                    applyCommand(() =>
                      editor
                        .chain()
                        .focus()
                        .toggleList("bulletList", "bulletList")
                        .run()
                    )
                  }
                  data-active={editor.isActive("bulletList")}
                >
                  <RxListBullet size={18} />
                  Bullet List
                </CommandItem>

                <CommandItem
                  onClickCapture={() =>
                    applyCommand(() =>
                      editor
                        .chain()
                        .focus()
                        .toggleList("orderedList", "orderedList")
                        .run()
                    )
                  }
                  data-active={editor.isActive("orderedList")}
                >
                  <GoListOrdered size={18} />
                  Ordered List
                </CommandItem>
                <CommandItem
                  onClickCapture={() =>
                    editor.chain().focus().setCodeBlock().run()
                  }
                  data-active={editor.isActive("codeBlock")}
                >
                  <RxCode size={18} />
                  Code Block
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          className="bg-white p-1 rounded-sm shadow-xl flex divide-x"
          editor={editor}
        >
          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="text-left"
              aria-label="Toggle text to left"
              data-state={editor.isActive({ textAlign: "left" }) ? "on" : "off"}
              aria-pressed={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <RxTextAlignLeft />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="text-center"
              aria-label="Toggle text to center"
              data-state={
                editor.isActive({ textAlign: "center" }) ? "on" : "off"
              }
              aria-pressed={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <RxTextAlignCenter />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="text-right"
              aria-label="Toggle text to right"
              data-state={
                editor.isActive({ textAlign: "right" }) ? "on" : "off"
              }
              aria-pressed={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <RxTextAlignRight />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="text-justify"
              aria-label="Toggle text to justify"
              data-state={
                editor.isActive({ textAlign: "justify" }) ? "on" : "off"
              }
              aria-pressed={editor.isActive({ textAlign: "justify" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <RxTextAlignJustify />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="multiple">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle Bold"
              data-state={editor.isActive("bold") ? "on" : "off"}
              aria-pressed={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <RxFontBold />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="italic"
              data-state={editor.isActive("italic") ? "on" : "off"}
              aria-pressed={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <RxFontItalic />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="strike"
              data-state={editor.isActive("strike") ? "on" : "off"}
              aria-pressed={editor.isActive("strike")}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <RxStrikethrough />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="code"
              data-state={editor.isActive("code") ? "on" : "off"}
              aria-pressed={editor.isActive("code")}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <RxCode />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
    </>
  );
};
