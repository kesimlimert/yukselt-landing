import type { Metadata, ResolvingMetadata } from "next";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { useRef } from "react";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
  heroSectionQuery,
  HeroSectionQueryResponse,
} from "@/sanity/lib/queries";
import * as demo from "@/sanity/lib/demo";
import firstImage from "../public/phone.svg";
import secondImage from "../public/animation2nd.svg";
import thirdImage from "../public/five.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";
import Background from "../public/Background.svg";
import Header from "./header";
import fourthImage from "../public/wepik-export-20240214133349joEk 1.svg";

type Props = {};

export async function generateStaticParams() {
  return sanityFetch<{ slug: string }[]>({
    query: groq`*[_type == "hero" && defined(slug.current)]{"slug": slug.current}`,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const hero = await sanityFetch<HeroSectionQueryResponse>({
    query: heroSectionQuery,
    stega: false,
  });

  return {
    title: hero?.title,
    description: hero?.buttonText,
    openGraph: {
      url: hero?.buttonUrl,
    },
  } satisfies Metadata;
}

const images = [firstImage, secondImage, thirdImage, fourthImage];

export default async function Hero() {
  const hero = await sanityFetch<HeroSectionQueryResponse>({
    query: heroSectionQuery,
  });

  if (!hero?._id) {
    return notFound();
  }

  return (
    <div className={styles.hero}>
      <Image
        src={Background}
        layout="fill"
        objectFit="cover"
        alt="Background"
      />
      <div
        className={`flex flex-col md:flex-row container py-36 mx-auto justify-center md:justify-between items-center ${styles.heroBackground}`}
      >
        <Header />
        <div className="flex flex-col max-w-2xl">
          <div
            style={{
              width: "100%",
              height: "100%",
              visibility: "hidden",
              position: "relative",
            }}
          >
            <Image
              src={Background}
              layout="fill"
              objectFit="contain"
              alt="Background"
            />
          </div>
          <h1 className="font-spartan md:text-8xl text-6xl text-center md:text-left font-extrabold leading-none tracking-tighter">
            {hero?.title}
          </h1>
          <Link href={hero?.buttonUrl}>
            <button
              type="button"
              className="text-white hidden md:block w-56 mt-8 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
            >
              {hero?.buttonText}
            </button>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          {images.map((image, index) => {
            if (index === 3) {
              return (
                <div key={index} className={`${styles.image} flex flex-col`}>
                  <Image
                    key={index}
                    src={image}
                    className={`pt-5 md:pt-0`}
                    alt="phone"
                  />
                  <p className="text-orange-500 text-center font-semibold text-2xl">
                    Oda Yükseltme Başarılı !
                  </p>
                </div>
              );
            } else {
              return (
                <Image
                  key={index}
                  src={image}
                  className={`${styles.image} pt-5 md:pt-0`}
                  alt="phone"
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
