"use client";

import { useFormState } from "@/hooks/use-form-state";
import { signInWithEmailAndPassword } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  const [{ errors, message, sucess }, handleSignIn, isPending] = useFormState(
    signInWithEmailAndPassword
  );

  return (
    <div className="space-y-4">
      <form onSubmit={handleSignIn} className="space-y-4">
        {sucess === false && message && (
          <Alert
            variant="destructive"
            className="flex flex-col content-center space-x-2"
          >
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input type="text" name="email" id="email" />

          {errors?.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
          {errors?.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
