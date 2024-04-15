import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  firstContentSectionQuery,
  FirstContentSectionQueryResponse,
} from "@/sanity/lib/queries";
import phone from "../public/firstContent.svg"
import Image from 'next/image';
import Background from "../public/1.svg"

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "firstContent" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const firstContent = await sanityFetch<FirstContentSectionQueryResponse>({
    query: firstContentSectionQuery,
    stega: false,
  });

  return {
    title: firstContent?.title,
    description: firstContent?.paragraph,
    openGraph: {
      url: firstContent?.title,
    },
  } satisfies Metadata;
}

export default async function FirstContent({}: Props) {
  const firstContent = await sanityFetch<FirstContentSectionQueryResponse>({
    query: firstContentSectionQuery,
  });
  if (!firstContent?._id) {
    return notFound();
  }
  return <div className="my-36 px-10 md:px-0"><div style={{ 
    backgroundImage: `url(${Background.src})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }} className="flex flex-col md:flex-row justify-center h-full container mx-auto">
    <Image className="order-2 md:order-1" src={phone} alt="Phone" />
    <div className="flex flex-col max-w-3xl justify-center">
        <h1 className="font-semibold text-center text-5xl">{firstContent.title}</h1>
        <p className="pt-10 leading-9">{firstContent.paragraph}</p>
    </div>
  </div></div>;
}
