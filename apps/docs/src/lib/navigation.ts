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
      { title: "TagInput", href: "/docs/components/tag-input" },
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
      { title: "Separator", href: "/docs/components/separator" },
      { title: "ThemeToggle", href: "/docs/components/theme-toggle" },
      { title: "Wizard", href: "/docs/components/wizard" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Popover", href: "/docs/components/popover" },
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
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "EmptyState", href: "/docs/components/empty-state" },
    ],
  },
  {
    title: "Typography",
    items: [
      { title: "DisplayHeading", href: "/docs/components/display-heading" },
      { title: "SectionLabel", href: "/docs/components/section-label" },
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
