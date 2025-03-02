import ListiningPost from "@/components/ListiningPosts";
import { RevealFx } from "@/components/RevealFx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/http/get-posts";
import { HTTPError } from "ky";
import Image from "next/image";

export default async function Home() {
  const skills = [
    "NodeJs",
    "React",
    "Next",
    "TypeScript",
    "Postgre",
    "Docker",
    "Jwt",
    "SuperTest",
    "Jest",
    "Prisma",
    "Fastify",
    "Express",
    "Zod",
    "Github",
    "TailwindCSS",
    "Storybook",
    "Monólitos",
    "Microsserviços",
    "Multi-Tenant",
  ];

  const experiencies = [
    {
      enterprise: "Autônomo",
      role: "Full Stack Developer",
      monthFrom: "Jan",
      yearFrom: "2024",
      monthTo: " ",
      yearTo: "Atuando",
      description:
        "Atuo como desenvolvedor Full Stack, entregando sites mais completos, robustos e seguro. Além do desenvolvimentos de sistemas também para outras empresas.",
    },
    {
      enterprise: "Group Imobi",
      role: "Designer Pleno",
      monthFrom: "Jun",
      yearFrom: "2024",
      monthTo: "Out",
      yearTo: "2024",
      description:
        "Desenvolvimento de posts, landing pages e materiais impressos, com participação na criação de estratégias de marketing e otimização de processos. Responsável também pela orientação, treinamento e recrutamento de novos designers.",
    },

    {
      enterprise: "STZ Digital",
      role: "Sócio Proprietário",
      monthFrom: "Set",
      yearFrom: "2020",
      monthTo: "Mai",
      yearTo: "2024",
      description:
        "Como sócio proprietário, tinha participação em todos o setores, inteligência comercial, vendas, design, marketing, desenvolvimento web, e etc. Junto com mais um sócio que veio junto comigo nessa jornada.",
    },
    {
      enterprise: "Group Imobi",
      role: "Designer Junior",
      monthFrom: "Jun",
      yearFrom: "2023",
      monthTo: "Nov",
      yearTo: "2023",
      description:
        "Desenvolvimento de posts, landing pages e materiais impressos, além de colaboração em estratégias de marketing e otimização de processos.",
    },
  ];

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
      <main className="flex flex-col gap-12 items-center mx-auto md:max-w-[700px]">
        <div
          id="hero"
          className="flex gap-5 md:gap-10 mt-20 items-center box-border"
        >
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-3xl md:text-5xl font-bold">
              Olá, eu sou o jean 👋
            </h1>
            <span className="text-sm md:text-lg">
              Full Stack Developer. E esse é o meu blog pessoal, contando sobre
              minha jornada como dev.
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

        <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold">Sobre mim</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            praesentium est hic eaque consectetur ducimus repellendus porro
            minus illum culpa ratione quos provident unde, dicta vero excepturi
            dolores totam corrupti?
          </span>
        </div>

        <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex gap-1 flex-wrap">
            {skills.map((skill) => {
              return <Badge key={skill}>{skill}</Badge>;
            })}
          </div>
        </div>

        <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
          <h2 className="text-xl font-bold">Experiências</h2>

          <Accordion type="single" collapsible>
            {experiencies.map((experiencie, index) => {
              return (
                <AccordionItem value={index.toString()} key={index}>
                  <AccordionTrigger className="flex justify-between">
                    <div>
                      <h3 className="text-md">{experiencie.enterprise}</h3>
                      <span className="text-xs font-normal">
                        {experiencie.role}
                      </span>
                    </div>
                    <div className="font-normal text-sm">
                      <span>
                        {experiencie.monthFrom} {experiencie.yearFrom}
                      </span>
                      <span> - </span>
                      <span>
                        {experiencie.monthTo} {experiencie.yearTo}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>{experiencie.description}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {posts && (
          <div id="posts-wrapper" className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-bold">Últimas Publicações</h2>

            <ListiningPost posts={posts} />
          </div>
        )}
      </main>
    </RevealFx>
  );
}
