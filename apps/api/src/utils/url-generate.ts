import { prisma } from "@/lib/prisma";

function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function generateUniqueSlug(title: string): Promise<string> {
    let url = slugify(title);
    let count = 1;
  
    let urlExist = await prisma.post.findFirst({
      where: { url },
    });
  
    while (urlExist) {
      url = `${slugify(title)}-${count}`;
      count++;
  
      urlExist = await prisma.post.findFirst({
        where: { url },
      });
    }
  
    return url;
  }
  