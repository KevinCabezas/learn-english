import Link from "next/link"
import { Icon } from "@iconify/react"
import { TPropsCard } from "@/app/types/syllabus"


export default function Card({ title, description, path, icon, level, color, hover }: TPropsCard) {

  return (

    <Link href={path} className={`group p-5 space-y-5 rounded-xl border border-gray-200 bg-white ${hover} transition-all duration-300`}>
      <div className="flex justify-between">
        <Icon icon={icon} className={`text-2xl ${color}`}></Icon>
        <span className={`text-xs py-0.5 px-2 font-semibold border ${color} rounded-lg `}>
          {level}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
      <div className="flex justify-end">
        <Icon icon={'ri-external-link-line'} className={`text-xl text-gray-400 ${hover} transition-all duration-300`}></Icon>
      </div>
    </Link>
  )
}