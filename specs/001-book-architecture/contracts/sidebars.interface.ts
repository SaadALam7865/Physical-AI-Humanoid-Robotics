/**
 * Sidebar configuration type definitions
 * Auto-imported from @docusaurus/plugin-content-docs
 */
import type { SidebarsConfig, SidebarItemCategoryWithLink } from '@docusaurus/plugin-content-docs';

/**
 * Tutorial sidebar structure for Physical AI textbook
 */
export interface TutorialSidebar extends Array<SidebarItemCategoryWithLink> {
  length: 4; // Exactly 4 modules
}

/**
 * Module category configuration
 */
export interface ModuleCategory extends SidebarItemCategoryWithLink {
  type: 'category';
  label: `Module ${1 | 2 | 3 | 4}: ${string}`; // Enforces "Module N: " prefix
  link: {
    type: 'doc';
    id: `module-${1 | 2 | 3 | 4}/index`; // Must point to module index
  };
  collapsible: true; // Always collapsible
  collapsed: boolean; // false for Module 1, true for others
  items: string[]; // Array of chapter IDs (validated separately)
}

/**
 * Main sidebars configuration export
 */
export interface PhysicalAISidebarsConfig extends SidebarsConfig {
  tutorialSidebar: TutorialSidebar;
}
