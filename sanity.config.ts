"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { locate } from "@/sanity/plugins/locate";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";
import author from "@/sanity/schemas/documents/author";
import hero from "./sanity/schemas/documents/hero";
import post from "@/sanity/schemas/documents/post";
import settings from "@/sanity/schemas/singletons/settings";
import header from "./sanity/schemas/documents/header";
import partners from "./sanity/schemas/documents/partners";
import firstContent from "./sanity/schemas/documents/firstContent";
import secondContent from "./sanity/schemas/documents/secondContent";
import thirdContent from "./sanity/schemas/documents/thirdContent";
import aboutSection from "./sanity/schemas/documents/aboutSection";
import statsSection from "./sanity/schemas/documents/statsSection";
import howItWorks from "./sanity/schemas/documents/howItWorks";
import getInTouch from "./sanity/schemas/documents/getInTouch";
import footer from "./sanity/schemas/documents/footer";

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      // Documents
      post,
      author,
      hero,
      header,
      partners,
      firstContent,
      secondContent,
      thirdContent,
      aboutSection,
      statsSection,
      howItWorks,
      getInTouch,
      footer,
    ],
  },
  plugins: [
    presentationTool({
      locate,
      previewUrl: { previewMode: { enable: "/api/draft" } },
    }),
    structureTool({ structure: pageStructure([settings]) }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});
