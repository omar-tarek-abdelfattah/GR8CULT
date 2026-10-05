import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          ar: `${baseUrl}/?lang=ar`,
          "ar-EG": `${baseUrl}/?lang=ar`,
        },
      },
    },
    {
      url: `${baseUrl}/vault`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/vault`,
          ar: `${baseUrl}/vault?lang=ar`,
          "ar-EG": `${baseUrl}/vault?lang=ar`,
        },
      },
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/pricing`,
          ar: `${baseUrl}/pricing?lang=ar`,
          "ar-EG": `${baseUrl}/pricing?lang=ar`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          ar: `${baseUrl}/about?lang=ar`,
          "ar-EG": `${baseUrl}/about?lang=ar`,
        },
      },
    },
  ];
}
