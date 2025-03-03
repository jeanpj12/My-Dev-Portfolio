'use client';

import { useState } from 'react';
import { Editor } from './Editor';
import { JSONContent } from '@tiptap/react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { createPost } from '@/http/create-post';
import { HTTPError } from 'ky';
import { redirect, useRouter } from 'next/navigation';

const EditorClient = () => {
    const [content, setContent] = useState<JSONContent | null>(null);
    const [title, setTitle] = useState<string>('Title this post');
    const [summary, setSummary] = useState<string>('Summary this post');
    const router = useRouter();

    const handlePublish = async () => {
        if (!content) {
            alert('O conteúdo do post está vazio.');
            return;
        }

        try {
            await createPost({ title, summary, content, status: 'published' });
            router.push('/');
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
        <div className="mt-5 flex min-w-full flex-col gap-5">
            <Editor setContent={setContent} />

            <div
                id="editorWrapper"
                className="flex flex-col gap-3 rounded-md p-2 shadow-md"
            >
                <header className="flex items-center justify-between p-5">
                    <Label>{title}</Label>
                    <Button
                        onClick={handlePublish}
                        variant={'outline'}
                        className="cursor-pointer"
                    >
                        Publicar
                    </Button>
                </header>
                <div className="flex flex-col gap-2">
                    <div className="bg-accent rounded-md p-4">
                        <input
                            type="text"
                            value={title}
                            id="title"
                            name="title"
                            className="w-full rounded-md p-2 text-xl outline-none"
                            onChange={handleChangeTitle}
                        />
                    </div>
                    <div className="bg-accent rounded-md p-4">
                        <textarea
                            value={summary}
                            id="summary"
                            name="summary"
                            className="w-full resize-none rounded-md p-2 text-sm outline-none"
                            onChange={handleChangeSummary}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorClient;
