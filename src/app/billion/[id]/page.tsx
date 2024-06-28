"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface FinancialAssets {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  exerciseOptionPrice?: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
}

interface BillionDetail {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAssets[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

export default function Billion({
  params: { id },
}: {
  params: { id: string };
}) {
  const [billion, setBillion] = useState<BillionDetail>();

  useEffect(() => {
    const getBillon = async (id: string) => {
      const res = await fetch(
        `https://billions-api.nomadcoders.workers.dev/person/${id}`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      return data;
    };

    getBillon(id).then((data) => {
      setBillion(data);
    });
  }, [id]);

  if (!billion) {
    return null;
  }

  return (
    <main className="flex flex-col gap-y-14 my-10 w-full max-w-[1000px] ">
      <div className="w-full bg-[#121B1F] rounded-xl flex flex-col p-10 text-sm text-gray-400 gap-y-2">
        <Image
          src={billion.squareImage}
          alt={billion.name}
          className="aspect-square rounded-lg"
          width={300}
          height={300}
        />
        <h1 className="text-3xl font-bold mt-3 text-white">{billion.name}</h1>
        <h2 className="font-semibold">
          Networth: {Math.floor(billion.netWorth / 1000)} Billion
        </h2>
        <h2 className="font-semibold">Country: {billion.country}</h2>
        <h2 className="font-semibold">Industry: {billion.industries}</h2>
        <p>{billion.bio.join(" ")}</p>
      </div>
      <div className="w-full bg-[#121B1F] rounded-xl flex flex-col p-10 text-sm text-gray-400 gap-y-2">
        <h1 className="text-3xl font-bold mt-3 text-white">Financial Assets</h1>
        <ul className="grid grid-cols-4 gap-3 mt-3">
          {billion.financialAssets.map((asset) => (
            <li
              key={asset.ticker}
              className="flex flex-col gap-2 p-2 bg-[#1F2D2F] rounded-lg"
            >
              <h2 className="font-semibold">Ticker : {asset.ticker}</h2>
              <h2 className="font-semibold">
                Shares : {asset.numberOfShares.toLocaleString()}
              </h2>
              {asset?.exerciseOptionPrice && (
                <h2 className="font-semibold">
                  Exercise Price: {asset.exerciseOptionPrice}
                </h2>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
