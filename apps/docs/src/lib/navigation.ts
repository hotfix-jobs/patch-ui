export interface NavItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/getting-started" },
      { title: "Theme", href: "/docs/theme" },
      { title: "Contrast", href: "/docs/contrast" },
    ],
  },
  {
    title: "Inputs",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Slider", href: "/docs/components/slider" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Field", href: "/docs/components/field" },
      { title: "Form", href: "/docs/components/form" },
    ],
  },
  {
    title: "Layout",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "ThemeToggle", href: "/docs/components/theme-toggle" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Command", href: "/docs/components/command" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Menu", href: "/docs/components/menu" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "NavigationMenu", href: "/docs/components/navigation-menu" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Pagination", href: "/docs/components/pagination" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Badge", href: "/docs/components/badge" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "EmptyState", href: "/docs/components/empty-state" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "SectionLabel", href: "/docs/components/section-label" },
      { title: "TimeAgo", href: "/docs/components/time-ago" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "AppHeader", href: "/docs/components/app-header" },
      { title: "DisplayHeading", href: "/docs/components/display-heading" },
    ],
  },
];
