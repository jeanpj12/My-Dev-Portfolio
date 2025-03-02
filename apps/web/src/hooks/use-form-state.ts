import { FormEvent, useState, useTransition } from 'react';

interface FormState {
    sucess: boolean;
    message: string | null;
    errors: Record<string, string[]> | null;
}

export function useFormState(
    action: (data: FormData) => Promise<FormState>,
    initalState?: FormState
) {
    const [isPending, startTransition] = useTransition();

    const [formState, setFormState] = useState(
        initalState ?? {
            sucess: false,
            message: null,
            errors: null,
        }
    );

    async function handleAction(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        startTransition(async () => {
            const state = await action(data);

            setFormState(state);
        });
    }

    return [formState, handleAction, isPending] as const;
}
