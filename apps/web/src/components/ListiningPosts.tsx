import Link from 'next/link';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';

interface PostsProps {
    posts: {
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
    }[];
}

export default function ListiningPost({ posts }: PostsProps) {
    function formattedDate(isoDate: Date) {
        const date = new Date(isoDate);

        const formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        return formattedDate;
    }

    return (
        <>
            {posts.map((post) => {
                return (
                    <Link href={`/post/${post.url}`} key={post.id}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>
                                    {post.summary}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <span className="text-xs">
                                    {formattedDate(post.createdAt)}
                                </span>
                            </CardFooter>
                        </Card>
                    </Link>
                );
            })}
        </>
    );
}
