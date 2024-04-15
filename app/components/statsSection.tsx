import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  statsSectionQuery,
  StatsSectionQueryResponse,
} from "@/sanity/lib/queries";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "statsSection" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const statsSection = await sanityFetch<StatsSectionQueryResponse>({
    query: statsSectionQuery,
    stega: false,
  });

  return {
    title: statsSection?.title,
    description: statsSection?.title,
    openGraph: {
      url: statsSection?.title,
    },
  } satisfies Metadata;
}

export default async function StatsSection({}: Props) {
  const statsContent = await sanityFetch<StatsSectionQueryResponse>({
    query: statsSectionQuery,
  });
  if (!statsContent?._id) {
    return notFound();
  }
  return (
    <div style={{ backgroundColor: "#F4DBC5" }} className="py-20">
      <div className="container mx-auto">
        <h1 className="font-semibold text-center text-2xl">{statsContent.title}</h1>
        <div className="grid grid-cols-2 md:flex px-10 md:px-0 justify-center pt-10 gap-0 md:gap-10">
            {statsContent.stats.map((stat, index) => (
                <div style={{color:"#1E212DA6", borderColor: "rgba(105, 98, 98, 0.29)"}} className={`flex flex-col gap-3 md:border-none justify-center items-center ${index === 0 ? 'border-r border-b' : ''} ${index === 1 ? 'border-l border-b' : ''} ${index === 2 ? 'border-t border-r' : ''} ${index === 3 ? 'border-t border-l' : ''}`}>
                    <div className="flex">
                        <h1 className="text-3xl pt-3 md:pt-0 font-bold">{stat.value}</h1>
                        <h1 className="text-3xl">{stat.symbol}</h1>
                    </div>
                    <p className="text-sm pb-3 md:pb-0">{stat.name}</p>
                </div>
            
            ))}
        </div>
      </div>
    </div>
  );
}
