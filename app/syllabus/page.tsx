// 'use client';

import { Icon } from "@iconify/react"
import Card from "../components/syllabus/Card";
import { syllabusList } from "../data/syllabus";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // const post = await getPost(slug)


  return (
    <main className="p-5 mt-15 space-y-5 lg:mt-0 min-h-dvh">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">Temario</h1>
        <p className="mt-1 text-sm text-gray-400 font-semibold">Explora los temas y elige por donde quieres empezar.</p>
      </div>
      <div className="h-10 flex items-center gap-1">
        <input
          type="text" placeholder="Buscar lecciones o temas..."
          className="min-w-100 h-full px-3 rounded-xl focus:outline-none placeholder:font-semibold text-sm border border-gray-200 text-gray-700 bg-white  "
        />
        <button className="group h-full w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white">
          <Icon icon={'boxicons:search'} className="text-xl text-gray-400 group-hover:text-purple-400 transition-all duration-200"></Icon>
        </button>
      </div>
      <div className=" grid grid-cols-4 gap-5">
        {syllabusList.map((e, i) => (
          <Card
            key={i}
            title={e.title}
            description={e.description}
            icon={e.icon}
            path={e.path}
            level={e.level}
            color={e.color}
            hover={e.hover}
          />
        ))}
      </div>

    </main>
  )
}