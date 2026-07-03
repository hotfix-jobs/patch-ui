export { cn } from "./utils";
export { focusRing, controlSize, stateStepping, disabled, colorTransition } from "./recipes";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPrimitive,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionPanelProps,
} from "./components/accordion";
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export { Input, InputPrimitive, type InputProps } from "./components/input";
export { SearchInput, type SearchInputProps } from "./components/search-input";
export { Textarea, type TextareaProps } from "./components/textarea";
export { Label } from "./components/label";
export { Select, type SelectProps, type SelectSize } from "./components/select";
export { Switch, SwitchPrimitive } from "./components/switch";
export { Checkbox, CheckboxPrimitive } from "./components/checkbox";
export {
  Radio,
  RadioGroup,
  RadioPrimitive,
  RadioGroupPrimitive,
} from "./components/radio";
export { Slider, SliderValue, SliderPrimitive } from "./components/slider";
export { Card, type CardProps } from "./components/card";
export {
  Grid,
  GridCell,
  type GridProps,
  type GridCellProps,
} from "./components/grid";
export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionContent,
  SectionFooter,
  SectionFooterStatus,
  SectionFooterActions,
  type SectionFooterProps,
} from "./components/section";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export {
  Breadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItem,
} from "./components/breadcrumb";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarPrimitive,
  avatarVariants,
  type AvatarProps,
  type AvatarGroupProps,
} from "./components/avatar";
// AppHeader lives as a block under packages/react/src/blocks/app-header: consumers
// pull it via `npx shadcn add @patchui/app-header` and own the copy for
// per-app customization (brand, feature flags, auth wiring, etc.). Not
// exported from the package index.
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
} from "./components/sheet";
export type {
  SheetProps,
  SheetTriggerProps,
  SheetContentProps,
  SheetCloseProps,
  SheetFooterProps,
  SheetSide,
} from "./components/sheet";
export {
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalSubtitle,
  ModalInset,
  ModalActions,
  ModalAction,
  type ModalProps,
  type ModalSize,
  type ModalActionsProps,
  type ModalActionProps,
} from "./components/modal";
export {
  Menu,
  MenuPortal,
  MenuTrigger,
  MenuPopup,
  MenuGroup,
  MenuSection,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroupLabel,
  MenuDivider,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubPopup,
} from "./components/menu";
export type {
  MenuProps,
  MenuTriggerProps,
  MenuPopupProps,
  MenuItemProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSubTriggerProps,
} from "./components/menu";
export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./components/tooltip";
export {
  Toaster,
  toast,
  type ToasterProps,
  type ToastPosition,
  type ToastType,
  type ToastOptions,
  type ToastAction,
} from "./components/toast";
export { Spinner, type SpinnerProps } from "./components/spinner";
export { Skeleton, type SkeletonProps } from "./components/skeleton";
export {
  ListRow,
  ListRowContent,
  ListRowList,
  type ListRowProps,
  type ListRowContentProps,
  type ListRowListProps,
} from "./components/list-row";
export {
  MiddleTruncate,
  type MiddleTruncateProps,
} from "./components/middle-truncate";
export {
  Scroller,
  type ScrollerProps,
  type ScrollerOverflow,
} from "./components/scroller";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsPanelProps,
} from "./components/tabs";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPrimitive,
} from "./components/navigation-menu";
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandSection,
  CommandGroupLabel,
  CommandCollection,
  CommandSeparator,
  CommandDialog,
  AutocompletePrimitive,
  type CommandDialogProps,
} from "./components/command";
export { TimeAgo, type TimeAgoProps } from "./components/time-ago";
export { EmptyState, type EmptyStateProps } from "./components/empty-state";
export {
  Field,
  FieldLabel,
  FieldItem,
  FieldDescription,
  FieldError,
  FieldControl,
  FieldValidity,
  FieldPrimitive,
  Form,
  FormPrimitive,
} from "./components/field";
export {
  ThemeToggle,
  type ThemeToggleProps,
  type Theme,
  type ResolvedTheme,
} from "./components/theme-toggle";
export { Pagination, type PaginationProps } from "./components/pagination";
export { LoadMore, type LoadMoreProps } from "./components/load-more";
export {
  SegmentedToggle,
  SegmentedToggleItem,
  type SegmentedToggleProps,
  type SegmentedToggleItemProps,
} from "./components/segmented-toggle";
export {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxItem,
  type ComboboxProps,
  type ComboboxInputProps,
  type ComboboxPopupProps,
  type ComboboxItemProps,
} from "./components/combobox";
export { Progress, type ProgressProps } from "./components/progress";
export { Separator, type SeparatorProps } from "./components/separator";
export {
  SectionLabel,
  type SectionLabelProps,
} from "./components/section-label";
export {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
  type SidebarProviderProps,
  type SidebarProps,
  type SidebarInsetProps,
  type SidebarHeaderProps,
  type SidebarContentProps,
  type SidebarFooterProps,
  type SidebarGroupProps,
  type SidebarGroupLabelProps,
  type SidebarMenuProps,
  type SidebarMenuItemProps,
  type SidebarMenuButtonProps,
  type SidebarTriggerProps,
} from "./components/sidebar";
export { Kbd, type KbdProps } from "./components/kbd";
export { Toggle, toggleVariants, type ToggleProps } from "./components/toggle";
// Dropzone lives as a block under packages/react/src/blocks/dropzone.
// It composes Progress + Card + preview cards + delete X: apps
// customize the preview and validation, so it ships as copy-in via
// `npx shadcn add @patchui/dropzone`.
export {
  Calendar,
  type CalendarProps,
  type DateRange,
} from "./components/calendar";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  type TableProps,
  type TableSectionProps,
  type TableBodyProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from "./components/table";
