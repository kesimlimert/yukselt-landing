import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  headerSectionQuery,
  HeaderSectionQueryResponse,
} from "@/sanity/lib/queries";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "header" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const header = await sanityFetch<HeaderSectionQueryResponse>({
    query: headerSectionQuery,
    stega: false,
  });

  return {
    title: header?.title,
    description: header?.buttonText,
    openGraph: {
      url: header?.buttonUrl,
    },
  } satisfies Metadata;
}

export default async function Header({}: Props) {
  const header = await sanityFetch<HeaderSectionQueryResponse>({
    query: headerSectionQuery,
  });

  const logoUrl = header.logo.toString();
  
  if (!header?._id) {
    return notFound();
  }
  return (
    <div className="flex container pt-5 absolute top-0 justify-between">
      <Image src={logoUrl} width={234} height={134} className="pl-2 md:pl-0" alt="Logo" />
      <Link href={header.buttonUrl}>
        <button className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">
          {header.buttonText}
        </button>
      </Link>
    </div>
  );
}
