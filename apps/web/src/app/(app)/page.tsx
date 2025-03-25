import ListiningPost from '@/components/ListiningPosts';
import { RevealFx } from '@/components/RevealFx';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { getPosts } from '@/http/get-posts';
import { HTTPError } from 'ky';
import Image from 'next/image';
import { experiencies, skills, works } from '@/content';

export default async function Home() {
    let posts;
    try {
        posts = await getPosts();
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json();
            console.log(message);
        }
    }

    return (
        <RevealFx speed="medium">
            <main className="mx-auto flex flex-col items-center gap-12 md:max-w-[700px]">
                <div
                    id="hero"
                    className="mt-20 box-border flex items-center gap-5 md:gap-10"
                >
                    <div className="flex w-full flex-col gap-4">
                        <h1 className="text-3xl font-bold md:text-5xl">
                            Olá, eu sou o jean 👋
                        </h1>
                        <span className="text-sm md:text-lg">
                            Full Stack Developer. E esse é o meu blog pessoal,
                            contando sobre minha jornada como dev.
                        </span>
                    </div>
                    <Image
                        src="/avatar.jpg"
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-full md:scale-[1.5]"
                    />
                </div>

                <div id="posts-wrapper" className="flex w-full flex-col gap-4">
                    <h2 className="text-xl font-bold">Sobre mim</h2>
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Enim praesentium est hic eaque consectetur ducimus
                        repellendus porro minus illum culpa ratione quos
                        provident unde, dicta vero excepturi dolores totam
                        corrupti?
                    </span>
                </div>

                <div id="posts-wrapper" className="flex w-full flex-col gap-4">
                    <h2 className="text-xl font-bold">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                        {skills.map((skill) => {
                            return <Badge key={skill}>{skill}</Badge>;
                        })}
                    </div>
                </div>

                <div id="posts-wrapper" className="flex w-full flex-col gap-4">
                    <h2 className="text-xl font-bold">Experiências</h2>

                    <Accordion type="single" collapsible>
                        {experiencies.map((experiencie, index) => {
                            return (
                                <AccordionItem
                                    value={index.toString()}
                                    key={index}
                                >
                                    <AccordionTrigger className="flex justify-between">
                                        <div>
                                            <h3 className="text-md">
                                                {experiencie.enterprise}
                                            </h3>
                                            <span className="text-xs font-normal">
                                                {experiencie.role}
                                            </span>
                                        </div>
                                        <div className="text-sm font-normal">
                                            <span>
                                                {experiencie.monthFrom}{' '}
                                                {experiencie.yearFrom}
                                            </span>
                                            <span> - </span>
                                            <span>
                                                {experiencie.monthTo}{' '}
                                                {experiencie.yearTo}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {experiencie.description}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
                {
                    ////// POSTS
                }
                {/* {posts && (
          <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-bold">Últimas Publicações</h2>

            <ListiningPost posts={posts} />
          </div>
        )} */}

                <div id="posts-wrapper" className="flex w-full flex-col gap-4">
                    <h2 className="text-xl font-bold">Trabalhos</h2>
                    <div className='flex flex-col gap-6'>
                        {works.length !== 0 &&
                            works.map((work, index) => {
                                return (
                                    <a key={index} href={work.link} target='_blank' className='border-b py-4'>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-md font-bold">
                                                {work.name}
                                            </h3>
                                            <span className="text-sm font-normal">
                                                {work.description}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {work.tags.map((tag, index) => {
                                                    return (
                                                        <Badge key={index}>
                                                            {tag}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                    </div>
                </div>
            </main>
        </RevealFx>
    );
}
