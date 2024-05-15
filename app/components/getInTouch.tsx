import React from "react";

import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { getInTouchQuery, GetInTouchQueryResponse } from "@/sanity/lib/queries";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "getInTouch" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const getInTouch = await sanityFetch<GetInTouchQueryResponse>({
    query: getInTouchQuery,
    stega: false,
  });

  return {
    title: getInTouch?.title,
    description: getInTouch?.paragraph,
    openGraph: {
      url: getInTouch?.title,
    },
  } satisfies Metadata;
}

export default async function GetInTouch() {
  const getInTouch = await sanityFetch<GetInTouchQueryResponse>({
    query: getInTouchQuery,
  });
  if (!getInTouch?._id) {
    return notFound();
  }
  return (
    <div style={{ backgroundColor: "#476CD4" }}>
      <div className="container flex justify-center px-10 md:px-0 pt-28 pb-16 items-center mx-auto">
        <div className="max-w-xl">
          <h2 className="font-semibold leading-10 text-center text-white text-3xl">
            {getInTouch.title}
          </h2>
          <p className="text-lg font-light leading-8 text-center text-white mt-6">{getInTouch.paragraph}</p>
          <div className="flex justify-center gap-5">
            <Link href={getInTouch.mainButtonUrl}>
              <button style={{color: "#476CD4"}} className="bg-white mt-10 py-3 px-7 rounded-md">
                <div className="flex items-center gap-2 justify-center">
                  {getInTouch?.mainButtonText}
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </button>
            </Link>
            <Link href={getInTouch.buttonUrl}>
              <button className="bg-transparent text-white border border-white  mt-10 py-3 px-10 rounded-md">
                <div className="flex items-center gap-2 justify-center">
                  {getInTouch?.buttonText}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
