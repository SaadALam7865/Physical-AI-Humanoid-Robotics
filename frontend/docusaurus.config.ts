import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Physical AI & Humanoid Robotics",
  tagline: "Interactive Learning for ROS 2 and Robotics",
  favicon: "img/home.jpg",

  // Set the production url of your site here
  url: "https://uneezaismail.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/physical-ai-and-humanoid-robotics/",

  // GitHub pages deployment config.
  organizationName: "uneezaismail", // GitHub username
  projectName: "physical-ai-and-humanoid-robotics", // Repo name

  onBrokenLinks: "warn", // Temporarily warn instead of throw during development
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Remove blog from routing
          routeBasePath: "docs",
        },
        blog: false, // Disable blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // SEO metadata
    metadata: [
      {
        name: "description",
        content:
          "Comprehensive interactive textbook for learning Physical AI, ROS 2, and humanoid robotics with hands-on exercises and real-world examples.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Physical AI & Humanoid Robotics Interactive Textbook",
      },
      {
        property: "og:description",
        content:
          "Learn robotics from foundations to advanced simulation with structured modules, complete code examples, and practical exercises.",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "educational-level",
        content: "Beginner to Intermediate",
      },
      {
        name: "audience",
        content: "Students, Engineers, Robotics Enthusiasts",
      },
    ],

    // Color mode configuration
    colorMode: {
      respectPrefersColorScheme: true,
    },

    // Navbar configuration
    navbar: {
      title: "Physical AI & Humanoid Robotics ",
      logo: {
        alt: "Physical AI Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Textbook",
          "aria-label": "Navigate to textbook chapters",
        },
        {
          href: "https://github.com/uneezaismail/physical-ai-and-humanoid-robotics",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    // Footer configuration
    footer: {
      style: "dark",
      links: [
        {
          title: "Textbook",
          items: [
            {
              label: "Part I: Foundations & Lab",
              to: "/docs/part-1-foundations-lab/chapter-1-embodied-ai",
            },
            {
              label: "Chapter 1: Embodied Intelligence",
              to: "/docs/part-1-foundations-lab/chapter-1-embodied-ai",
            },
            {
              label: "Chapter 2: Hardware Setup",
              to: "/docs/part-1-foundations-lab/chapter-2-hardware-setup",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "ROS 2 Documentation",
              href: "https://docs.ros.org/en/humble/",
            },
            {
              label: "Gazebo Harmonic",
              href: "https://gazebosim.org/docs/harmonic/getstarted/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/uneezaismail/physical-ai-and-humanoid-robotics",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.`,
    },

    // Prism syntax highlighting configuration
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["python", "cpp", "bash", "yaml"],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
        },
      ],
    },

    // Mermaid configuration
    mermaid: {
      theme: { light: "neutral", dark: "forest" },
      options: {
        maxTextSize: 50000,
        fontFamily: "system-ui",
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
