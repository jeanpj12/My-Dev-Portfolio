import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
  return (
    <>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post.url}`} key={post.id}>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.summary}</CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="text-xs">{post.createdAt.toString()}</span>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
