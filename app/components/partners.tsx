import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  partnersSectionQuery,
  PartnersSectionQueryResponse,
} from "@/sanity/lib/queries";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "partners" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const partners = await sanityFetch<PartnersSectionQueryResponse>({
    query: partnersSectionQuery,
    stega: false,
  });

  return {
    title: partners?.title,
    description: partners?.title,
    openGraph: {
      url: partners?.title,
    },
  } satisfies Metadata;
}

export default async function Partners({}: Props) {
  const partners = await sanityFetch<PartnersSectionQueryResponse>({
    query: partnersSectionQuery,
  });
  return <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl hidden md:block font-extrabold py-14">{partners.title}</h1>
        <div className="flex pt-10 md:pt-0 gap-16 overflow-x-auto justify-center">
          {partners.partnerImages.map((partner) => (
            <img src={partner.toString()}  alt="Logo" />
          ))}
        </div>
    </div>;
}
