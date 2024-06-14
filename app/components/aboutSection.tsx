import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./aboutSection.module.css";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  aboutSectionQuery,
  AboutSectionQueryResponse,
} from "@/sanity/lib/queries";
import yellowCircle from "../public/yellowCircle.svg";
import blueCircle from "../public/blueCircle.svg";
import { UsersIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Pic from "../public/work.svg";
import Image from "next/image";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "aboutSection" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const aboutSection = await sanityFetch<AboutSectionQueryResponse>({
    query: aboutSectionQuery,
    stega: false,
  });

  return {
    title: aboutSection?.title,
    description: aboutSection?.title,
    openGraph: {
      url: aboutSection?.title,
    },
  } satisfies Metadata;
}

export default async function AboutSection({}: Props) {
  const aboutSection = await sanityFetch<AboutSectionQueryResponse>({
    query: aboutSectionQuery,
  });
  if (!aboutSection?._id) {
    return notFound();
  }
  return (
    <div className={`px-10 md:px-0 ${styles.wrapper}`} style={{ backgroundColor: "#FEF7F1" }}>
      <div className="container py-20 mx-auto">
        <div className="max-w-2xl">
          <h1 style={{ lineHeight: "80px" }} className="font-semibold text-center lg:text-nomal text-5xl">
            {aboutSection.title}
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex max-w-xl flex-col">
            {aboutSection?.subtitles.map((subtitle, index) => (
              <div className="flex gap-3 pt-5 flex-col" key={index}>
                <div className="flex items-center gap-5">
                  <UsersIcon className="w-5 h-5" />
                  <h2 className="text-xl font-medium">{subtitle}</h2>
                </div>
                {aboutSection?.paragraphs[index] && (
                  <p className="text-base font-light">
                    {String(aboutSection.paragraphs[index])}
                  </p>
                )}
              </div>
            ))}
            <Link href={aboutSection.buttonUrl}>
            <button className="bg-yellow-500 w-full lg:w-auto mt-10 py-3 px-10 rounded-md">
                <div className="flex items-center gap-2 justify-center">
                    {aboutSection?.buttonText}
                    <ArrowRightIcon className="w-5 h-5" />
                </div>
            </button>
            </Link>
          </div>
          <div className="relative pt-10 lg:pt-0">
            <Image src={Pic} className="z-20 mx-auto h-52 w-52 lg:h-auto lg:w-auto lg:mx-0 relative" alt="Work" />
            <Image src={yellowCircle} alt="Yellow Circle" style={{marginRight: "-4rem", height:"170px"}} className="absolute z-30 -bottom-14 lg:bottom-0 h-14 w-14 lg:h-auto lg:w-auto right-80 lg:right-0" />
            <Image src={blueCircle} alt="Blue Circle" style={{marginLeft: "-6rem", height:"380px"}} className="absolute lg:bottom-0 -bottom-32 h-44 w-28 left-80 lg:left-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
