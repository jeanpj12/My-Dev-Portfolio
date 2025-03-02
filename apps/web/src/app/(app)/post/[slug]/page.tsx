import ListiningPost from "@/components/ListiningPosts";
import { Reader } from "@/components/reader";
import { getPost } from "@/http/get-post";
import { getPosts } from "@/http/get-posts";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SinglePostPage() {
  const cookieStore = await cookies();
  const slug = await cookieStore.get("post")?.value;

  if (!slug) {
    notFound();
  }

  let post;

  try {
    post = await getPost({ slug });
  } catch {
    notFound();
  }

  const content = post.content ? JSON.parse(post.content) : null;

  let posts;

  try {
    posts = await getPosts();
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      console.log(message);
    }
  }

  const postsWithoutCurrentPost = posts
    ? posts.filter((post) => post.url !== slug)
    : [];

  console.log(postsWithoutCurrentPost);

  return (
    <div className="w-full mt-12 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <Reader content={content} />

      <div className="flex gap-2 py-2 px-4 rounded-md bg-accent ">
        <Image
          width={50}
          height={50}
          src="/avatar.jpg"
          alt=""
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-md font-bold">
            {post.user.firstName} {post.user.lastName}
          </span>
          <span className="text-sm">Author</span>
        </div>
      </div>

      {postsWithoutCurrentPost.length > 0 && (
        <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold">Outros Posts</h2>

          <ListiningPost posts={postsWithoutCurrentPost} />
        </div>
      )}
    </div>
  );
}
