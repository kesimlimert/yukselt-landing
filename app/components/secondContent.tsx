import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  secondContentSectionQuery,
  SecondContentSectionQueryResponse,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Background from "../public/a1.svg";
import SmallPc from "../public/smallPc.svg";
import Pc from "../public/pc.svg";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import styles from "./secondContent.module.css";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "secondContent" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const secondContent = await sanityFetch<SecondContentSectionQueryResponse>({
    query: secondContentSectionQuery,
    stega: false,
  });

  return {
    title: secondContent?.title,
    description: secondContent?.paragraph1,
    openGraph: {
      url: secondContent?.title,
    },
  } satisfies Metadata;
}

export default async function SecondContent({}: Props) {
  const secondContent = await sanityFetch<SecondContentSectionQueryResponse>({
    query: secondContentSectionQuery,
  });
  if (!secondContent?._id) {
    return notFound();
  }
  return (
    <div
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className={`h-full px-10 md:px-0 relative ${styles.wrapper}`}
    >
      <div className="flex flex-col md:flex-row justify-between container mx-auto">
        <div className="max-w-3xl">
          <h1 className="font-semibold text-5xl">{secondContent.title}</h1>
          <p className="pt-10 leading-9">{secondContent.paragraph1}</p>
          <div className="flex items-center">
            <PlusCircleIcon className="h-10 w-10" />
            <p className="pt-5 pl-5 leading-9">{secondContent.paragraph2}</p>
          </div>
        </div>
        <Image src={Pc} style={{marginTop: "-8rem"}} className="hidden xl:block absolute right-0" alt="PC" />
        <Image src={SmallPc} width={650} height={550} className="block xl:hidden mx-auto pt-10 md:pt-0" alt="Small PC" />
      </div>
    </div>
  );
}
