import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  thirdContentSectionQuery,
  ThirdContentSectionQueryResponse,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Rectangle from "../public/Rectangle.svg";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "thirdContent" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const thirdContent = await sanityFetch<ThirdContentSectionQueryResponse>({
    query: thirdContentSectionQuery,
    stega: false,
  });

  return {
    title: thirdContent?.title,
    description: thirdContent?.paragraph,
    openGraph: {
      url: thirdContent?.title,
    },
  } satisfies Metadata;
}

export default async function ThirdContent({}: Props) {
  const thirdContent = await sanityFetch<ThirdContentSectionQueryResponse>({
    query: thirdContentSectionQuery,
  });
  if (!thirdContent?._id) {
    return notFound();
  }
  return (
    <div>
      <div className="h-full my-36 mx-10 md:mx-0">
        <div className="flex justify-center lg:justify-normal container mx-auto">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {thirdContent?.experiences.map((experience, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 pt-10 ${
                  index === 2 ? "col-start-3 row-span-2 relative" : ""
                }`}
              >
                {index === 2 && (
                  <div
                    style={{
                      backgroundImage: `url(${Rectangle.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      marginLeft: "50px",
                    }}
                    className="md:w-full md:h-full w-20 h-60 absolute rounded-tr-3xl rounded-bl-3xl"
                  ></div>
                )}
                {experience?.image ? (
                  <div
                    className={`rounded-lg flex justify-center items-center ${
                      index === 2 ? "md:w-40 w-24 h-full z-30" : "md:w-40 w-20 h-20 md:h-40"
                    }`}
                    style={{
                      backgroundImage: `url(${experience?.image.toString()})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h1 className="font-normal text-white text-xl">
                      {experience?.name}
                    </h1>
                  </div>
                ) : (
                  <div
                    className={`md:w-40 w-20 h-20 md:h-40 flex justify-center text-center items-center ${index === 4 ? "rounded-3xl bg-purple-300" : "bg-cyan-600 rounded-tr-3xl rounded-bl-3xl"}`}
                  >
                    {" "}
                    <h1 className="font-normal text-white text-xl">
                      {experience?.name}
                    </h1>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex pl-36 hidden lg:block flex-col max-w-2xl">
            <h1 style={{lineHeight:"80px"}} className="font-semibold text-5xl">{thirdContent.title}</h1>
            <p className="pt-10 leading-9">{thirdContent.paragraph}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
