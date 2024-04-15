import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Img from "../public/howItWorks.svg";
import Rectangle from "../public/howItRect.svg";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { howItWorksQuery, HowItWorksQueryResponse } from "@/sanity/lib/queries";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "howItWorks" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const howItWorks = await sanityFetch<HowItWorksQueryResponse>({
    query: howItWorksQuery,
    stega: false,
  });

  return {
    title: howItWorks?.title,
    description: howItWorks?.paragraph,
    openGraph: {
      url: howItWorks?.title,
    },
  } satisfies Metadata;
}

export default async function HowItWorks({}: Props) {
  const howItWorks = await sanityFetch<HowItWorksQueryResponse>({
    query: howItWorksQuery,
  });
  if (!howItWorks?._id) {
    return notFound();
  }
  return (
    <div style={{ backgroundColor: "#FEF7F1" }}>
      <div className="container flex flex-col lg:flex-row justify-between px-10 lg:px-0 py-36 items-center mx-auto">
        <div className="relative order-2 pt-24 lg:pt-0">
          <Image className="relative z-10 w-60 h-60 lg:w-full lg:h-full" src={Img} alt="How It Works" />
          <Image
            style={{ height: "616px"}}
            className="absolute h-64 w-36 lg:-mt-16 lg:-mr-48 -mt-24 -mr-10 lg:w-full lg:h-full top-0 z-0 right-0"
            src={Rectangle}
            alt="Rectangle"
          />
        </div>
        <div className="max-w-2xl">
          <h1 style={{ lineHeight: "80px" }} className="font-semibold text-center lg:text-normal text-5xl">
            {howItWorks.title}
          </h1>
          <p className="pt-10 leading-9">{howItWorks.paragraph}</p>
          <Link href={howItWorks.buttonUrl}>
            <button className="bg-yellow-500 w-full lg:w-auto mt-10 py-3 px-10 rounded-md">
              <div className="flex items-center gap-2 justify-center">
                {howItWorks?.buttonText}
                <ArrowRightIcon className="w-5 h-5" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
