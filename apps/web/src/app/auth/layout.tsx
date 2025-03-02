import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await isAuthenticated()) {
    redirect("/");
  }
  return (
    <main className="flex max-auto min-h-screen flex-col items-center justify-center px-4">
      <div className="w-md">{children}</div>
    </main>
  );
}
