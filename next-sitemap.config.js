/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    const alternates = ["en", "ar"].map((l) => ({
      href: `${config.siteUrl}/${l}${path === "/" ? "" : path}`,
      hreflang: l,
    }));
    return {
      loc: path,
      changefreq: "daily",
      priority: path === "/" ? 0.8 : 0.7,
      alternateRefs: alternates,
    };
  },
};
