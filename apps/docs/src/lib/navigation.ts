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
      { title: "Overview", href: "/docs/components" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "EmptyState", href: "/docs/components/empty-state" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Form", href: "/docs/components/form" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Menu", href: "/docs/components/menu" },
      { title: "Modal", href: "/docs/components/modal" },
      { title: "NavigationMenu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Scroller", href: "/docs/components/scroller" },
      { title: "Section", href: "/docs/components/section" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
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
      { title: "ToggleGroup", href: "/docs/components/toggle-group" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "AppHeader", href: "/docs/blocks/app-header" },
      { title: "Dropzone", href: "/docs/blocks/dropzone" },
      { title: "FilterToolbar", href: "/docs/blocks/filter-toolbar" },
      { title: "SearchSuggestions", href: "/docs/blocks/search-suggestions" },
    ],
  },
];
