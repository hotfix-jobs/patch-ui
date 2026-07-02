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
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "DatePicker", href: "/docs/components/date-picker" },
      { title: "EmptyState", href: "/docs/components/empty-state" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Form", href: "/docs/components/form" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Label", href: "/docs/components/label" },
      { title: "ListRow", href: "/docs/components/list-row" },
      { title: "LoadMore", href: "/docs/components/load-more" },
      { title: "Menu", href: "/docs/components/menu" },
      { title: "MiddleTruncate", href: "/docs/components/middle-truncate" },
      { title: "Modal", href: "/docs/components/modal" },
      { title: "NavigationMenu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Section", href: "/docs/components/section" },
      { title: "SegmentedToggle", href: "/docs/components/segmented-toggle" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "ThemeToggle", href: "/docs/components/theme-toggle" },
      { title: "TimeAgo", href: "/docs/components/time-ago" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "AppHeader", href: "/docs/blocks/app-header" },
      { title: "Dropzone", href: "/docs/blocks/dropzone" },
    ],
  },
];
