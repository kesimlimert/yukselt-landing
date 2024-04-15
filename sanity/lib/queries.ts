import { groq, type PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;
export interface SettingsQueryResponse {
  title?: string;
  description?: PortableTextBlock[];
  footer?: PortableTextBlock[];
  ogImage?: (Image & { alt?: string; metadataBase?: string }) | null;
}

export interface Author {
  name: string;
  picture?: (Image & { alt?: string | null }) | null;
}
export interface Post {
  _id: string;
  status: "draft" | "published";
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: (Image & { alt?: string }) | null;
  date: string;
  author?: Author | null;
}

export interface Header {
  _id: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  logo: {
    asset: {
      url: string;
    };
  };
}

export interface Experience {
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface ThirdContent {
  _id: string;
  title: string;
  paragraph: string;
  experiences: Experience[];
}

export interface Hero {
  _id: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
}

export interface Partner {
  _id: string;
  title: string;
  partnerImages: {
    asset: {
      url: string;
    };
  }[];
}

export interface SecondContent {
  _id: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export interface FirstContent {
  _id: string;
  title: string;
  paragraph: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface SocialMediaItem {
  icon: {
    asset: {
      url: string;
    };
  };
  link: string;
}

export interface BottomLink {
  linkText: string;
  linkUrl: string;
}

export interface Row {
  title: string;
  links: Link[];
}

export interface Footer {
  _id: string;
  logo: {
    asset: {
      url: string;
    };
  };
  bottomLinks: BottomLink[];
  socialMedia: SocialMediaItem[];
  rows: Row[];
}

export type AboutSection = {
  _id: string;
  title: string;
  subtitles: string[];
  paragraphs: PortableTextBlock[];
  buttonText: string;
  buttonUrl: string;
};

export type StatsSection = {
  _id: string;
  title: string;
  stats: {
    value: number;
    symbol: string;
    name: string;
  }[];
};

export type HowItWorks = {
  _id: string;
  title: string;
  paragraph: string;
  buttonText: string;
  buttonUrl: string;
  imageText: string;
};

export type GetInTouch = {
  _id: string;
  title: string;
  paragraph: string;
  mainButtonText: string;
  mainButtonUrl: string;
  buttonText: string;
  buttonUrl: string;
};

const firstContentFields = groq`
  _id,
  title,
  paragraph
`;

export const getInTouchFields = groq`
  _id,
  title,
  paragraph,
  mainButtonText,
  mainButtonUrl,
  buttonText,
  buttonUrl
`;

export const statsSectionFields = groq`
  _id,
  title,
  stats
`;

export const howItWorksFields = groq`
  _id,
  title,
  paragraph,
  buttonText,
  buttonUrl,
  imageText
`;

export const aboutSectionFields = groq`
  _id,
  title,
  subtitles,
  paragraphs,
  buttonText,
  buttonUrl
`;

const thirdContentFields = groq`
  _id,
  title,
  paragraph,
  experiences[]{
    name, 
    "image": image.asset->url
  }
`;

const heroFields = groq`
  _id,
  title,
  buttonText,
  buttonUrl
`;

const partnerFields = groq`
  _id,
  title,
  "partnerImages": partnerImages[].asset->url
`;

const headerFields = groq`
  _id,
  title,
  buttonText,
  buttonUrl,
  "logo": logo.asset->url
`;

const secondContentFields = groq`
  _id,
  title,
  paragraph1,
  paragraph2
`;
  
const footerFields = groq`
  _id,
  "logo": logo.asset->url,
  bottomLinks[]{
    linkText,
    linkUrl
  },
  socialMedia[]{
    "icon": icon.asset->url,
    link
  },
  rows[]{
    title,
    links[]{
      name,
      url
    }
  }
`;

const postFields = groq`
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroSectionQuery = groq`*[_type == "hero"] | order(_updatedAt desc) [0] {
  ${heroFields}
}`;

export const secondContentSectionQuery = groq`*[_type == "secondContent"] | order(_updatedAt desc) [0] {
  ${secondContentFields}
}`;

export const getInTouchQuery = groq`
  *[_type == "getInTouch"] | order(_updatedAt desc) [0] {
    ${getInTouchFields}
  }
`;

export const footerQuery = groq`
  *[_type == "footer"] | order(_updatedAt desc) [0] {
    ${footerFields}
  }
`;

export const aboutSectionQuery = groq`
  *[_type == "aboutSection"] | order(_updatedAt desc) [0] {
    ${aboutSectionFields}
  }
`;

export const howItWorksQuery = groq`
  *[_type == "howItWorks"] | order(_updatedAt desc) [0] {
    ${howItWorksFields}
  }
`;

export const thirdContentSectionQuery = groq`*[_type == "thirdContent"] | order(_updatedAt desc) [0] {
  ${thirdContentFields}
}`;

export const headerSectionQuery = groq`*[_type == "header"] | order(_updatedAt desc) [0] {
  ${headerFields}
}`;

export const partnersSectionQuery = groq`*[_type == "partners"] | order(_updatedAt desc) [0] {
  ${partnerFields}
}`;

export const firstContentSectionQuery = groq`*[_type == "firstContent"] | order(_updatedAt desc) [0] {
  ${firstContentFields}
}`;

export const statsSectionQuery = groq`
  *[_type == "statsSection"] | order(_updatedAt desc) [0] {
    ${statsSectionFields}
  }
`;

export type SecondContentSectionQueryResponse = SecondContent;

export type FooterQueryResponse = Footer;

export type StatsSectionQueryResponse = StatsSection;

export type FirstContentSectionQueryResponse = FirstContent;

export type HeroSectionQueryResponse = Hero;

export type HeaderSectionQueryResponse = Header;

export type PartnersSectionQueryResponse = Partner;

export type ThirdContentSectionQueryResponse = ThirdContent;

export type AboutSectionQueryResponse = AboutSection;

export type HowItWorksQueryResponse = HowItWorks;

export type GetInTouchQueryResponse = GetInTouch;

export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  content,
  ${postFields}
}`;
export type HeroQueryResponse =
  | (Post & {
      content?: PortableTextBlock[] | null;
    })
  | null;

export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${postFields}
}`;
export type MoreStoriesQueryResponse = Post[] | null;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  content,
  ${postFields}
}`;
export type PostQueryResponse =
  | (Post & {
      content?: PortableTextBlock[] | null;
    })
  | null;
