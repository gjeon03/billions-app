"use client";

import { Billions } from "@/app/(home)/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  billion: Billions;
}

export default function BillionItem({ billion }: Props) {
  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`/billion/${id}`);
  };

  return (
    <li
      className="flex flex-col gap-2 cursor-pointer"
      onClick={() => handleOnClick(billion.id)}
    >
      {billion.squareImage !== "https:undefined" && (
        <Image
          src={billion.squareImage}
          alt={billion.name}
          className="w-full aspect-square rounded-lg"
          width={300}
          height={300}
        />
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-bold">{billion.name}</h2>
        <div className="flex text-xs flex-wrap">
          <span className="text-nowrap">
            {Math.floor(billion.netWorth / 1000)} Billion&nbsp;/&nbsp;
          </span>

          <ul>
            {billion.industries.map((industrie, index) => (
              <li key={index} className="text-nowrap">
                {industrie}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
