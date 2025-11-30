import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Physical AI & Humanoid Robotics textbook sidebar
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Part I: Foundations & Lab',
      collapsible: true,
      collapsed: false, // Part I expanded by default (foundational content)
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Embodied Intelligence',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'part-1-foundations-lab/chapter-1-embodied-ai/chapter-1-embodied-ai',
          },
          items: [
            'part-1-foundations-lab/chapter-1-embodied-ai/embodied-intelligence-intro',
            'part-1-foundations-lab/chapter-1-embodied-ai/digital-vs-physical-ai',
            'part-1-foundations-lab/chapter-1-embodied-ai/brain-box-vs-body',
            'part-1-foundations-lab/chapter-1-embodied-ai/partner-economy',
            'part-1-foundations-lab/chapter-1-embodied-ai/why-humanoid-robots-now',
            'part-1-foundations-lab/chapter-1-embodied-ai/embodied-ai-exercises',
            'part-1-foundations-lab/chapter-1-embodied-ai/embodied-ai-summary',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Hardware Setup',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'doc',
            id: 'part-1-foundations-lab/chapter-2-hardware-setup/hardware-setup',
          },
          items: [
            'part-1-foundations-lab/chapter-2-hardware-setup/hardware-setup-intro',
            'part-1-foundations-lab/chapter-2-hardware-setup/hardware-mandate',
            'part-1-foundations-lab/chapter-2-hardware-setup/workstation-setup',
            'part-1-foundations-lab/chapter-2-hardware-setup/jetson-setup',
            'part-1-foundations-lab/chapter-2-hardware-setup/sensor-integration',
            'part-1-foundations-lab/chapter-2-hardware-setup/three-tier-verification',
            'part-1-foundations-lab/chapter-2-hardware-setup/hardware-chapter-summary',
          ],
        },
      ],
    },
    // Future parts (Part II-V) will be added here as content is developed
  ],
};

export default sidebars;
