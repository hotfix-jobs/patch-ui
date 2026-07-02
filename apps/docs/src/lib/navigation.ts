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
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "SegmentedToggle", href: "/docs/components/segmented-toggle" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Dropzone", href: "/docs/components/dropzone" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "DatePicker", href: "/docs/components/date-picker" },
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
      { title: "AppHeader", href: "/docs/components/app-header" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Section", href: "/docs/components/section" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "ThemeToggle", href: "/docs/components/theme-toggle" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Modal", href: "/docs/components/modal" },
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
      { title: "LoadMore", href: "/docs/components/load-more" },
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
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "LoadingDots", href: "/docs/components/loading-dots" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "EmptyState", href: "/docs/components/empty-state" },
    ],
  },
  {
    title: "Typography",
    items: [
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "TimeAgo", href: "/docs/components/time-ago" },
    ],
  },
];
