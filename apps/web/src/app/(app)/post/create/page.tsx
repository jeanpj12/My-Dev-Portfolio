import { isAuthenticated } from "@/auth/auth";
import EditorClient from "@/components/editor/EditorClient";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  if (!(await isAuthenticated())) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="w-full">
      <EditorClient />
    </main>
  );
}
