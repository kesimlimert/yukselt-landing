import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import { footerQuery, FooterQueryResponse } from "@/sanity/lib/queries";
import Image from "next/image";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "footer" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const footer = await sanityFetch<FooterQueryResponse>({
    query: footerQuery,
    stega: false,
  });

  return {
    title: footer?._id,
    description: footer?._id,
    openGraph: {
      url: footer?._id,
    },
  } satisfies Metadata;
}

export default async function Footer({}: Props) {
  const footer = await sanityFetch<FooterQueryResponse>({
    query: footerQuery,
  });
  if (!footer?._id) {
    return notFound();
  }
  return (
    <div style={{ backgroundColor: "#02164F" }}>
      <div className="px-10 md:px-32 flex flex-col md:py-36 pt-10 pb-36">
        <Image
          src={footer?.logo.toString()}
          width={200}
          height={25}
          alt="Logo"
          className="md:hidden block pb-10"
        />
        <div className="flex border-b md:border-solid border-none border-gray-200 pb-20 gap-32">
          {footer?.rows.map((row, index) => (
            <div key={index} className={`md:block ${index !== 0 ? "hidden" : ""}`}>
              <div
                className={`flex flex-col gap-4 ${index !== 0 ? "md:block" : ""}`}
              >
                <h1 className="text-white pb-2 text-base font-bold">
                  {row.title}
                </h1>
                {row.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-gray-400 text-base"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="block md:hidden">
            <div className="flex items-center justify-center gap-5">
              {footer?.socialMedia.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  className="text-white shrink-0 text-base"
                >
                  <Image
                    src={icon.icon.toString()}
                    width={50}
                    height={50}
                    alt="Social Media"
                    className="shrink-0"
                  />
                </a>
              ))}
            </div>
            <div className="flex pt-5 items-center gap-5">
              {footer?.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.linkUrl}
                  className="text-white text-base"
                >
                  {link.linkText}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-between w-full items-center pt-20">
            <Image
              src={footer?.logo.toString()}
              width={300}
              height={53}
              alt="Logo"
              className="hidden md:block"
            />
            <div className="flex items-center gap-5">
              {footer?.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.linkUrl}
                  className="text-white text-base"
                >
                  {link.linkText}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {footer?.socialMedia.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  className="text-white text-base"
                >
                  <Image
                    src={icon.icon.toString()}
                    width={50}
                    height={50}
                    alt="Social Media"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
