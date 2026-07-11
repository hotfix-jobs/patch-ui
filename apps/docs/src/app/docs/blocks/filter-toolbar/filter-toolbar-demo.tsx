"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Eye,
  Folder,
  SortAscending,
  SquaresFour,
  Tag,
  User,
} from "@phosphor-icons/react/dist/ssr";
import {
  FilterToolbar,
  FilterToolbarPicker,
  FilterToolbarTrigger,
  type FilterToolbarPickerOption,
} from "@patchui/react/blocks/filter-toolbar";
import {
  Button,
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  Toggle,
} from "@patchui/react";

const statusOptions = ["Any status", "Active", "Paused"];
const ownerOptions = ["Anyone", "Ada Lovelace", "Alan Turing"];
const sortOptions = ["Recently updated", "Name", "Created date"];
const categoryOptions: FilterToolbarPickerOption[] = [
  { id: "design", value: "design", label: "Design", description: "8 items", icon: <SquaresFour /> },
  { id: "engineering", value: "engineering", label: "Engineering", description: "12 items", icon: <Folder /> },
  { id: "research", value: "research", label: "Research", description: "5 items", icon: <SquaresFour /> },
  { id: "operations", value: "operations", label: "Operations", description: "7 items", icon: <Folder /> },
];

export function FilterToolbarDemo() {
  const [status, setStatus] = useState("Any status");
  const [owner, setOwner] = useState("Anyone");
  const [tagged, setTagged] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState("Recently updated");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryQuery, setCategoryQuery] = useState("");

  const visibleCategories = categoryOptions.filter((option) =>
    String(option.label).toLowerCase().includes(categoryQuery.toLowerCase()),
  );

  const activeCount = useMemo(
    () =>
      Number(status !== "Any status") +
      Number(owner !== "Anyone") +
      Number(categories.length > 0) +
      Number(tagged) +
      Number(visible),
    [status, owner, categories, tagged, visible],
  );

  const clearAll = () => {
    setStatus("Any status");
    setOwner("Anyone");
    setCategories([]);
    setTagged(false);
    setVisible(false);
  };

  return (
    <div className="flex flex-col gap-10 py-6">
      <FilterToolbar
        activeCount={activeCount}
        onClearAll={clearAll}
        count={activeCount > 0 ? `${24 - activeCount * 3} results` : "24 results"}
        trailing={<SortControl value={sort} onChange={setSort} />}
      >
        <FilterMenu
          label="Status"
          value={status}
          defaultValue="Any status"
          icon={<Check />}
          options={statusOptions}
          onChange={setStatus}
        />
        <FilterMenu
          label="Owner"
          value={owner}
          defaultValue="Anyone"
          icon={<User />}
          options={ownerOptions}
          onChange={setOwner}
        />
        <FilterToolbarPicker
          label="Category"
          icon={<SquaresFour />}
          selected={categories}
          onSelectionChange={setCategories}
          query={categoryQuery}
          onQueryChange={setCategoryQuery}
          sections={[
            {
              id: "categories",
              label: categoryQuery ? "Results" : "Categories",
              options: visibleCategories,
            },
          ]}
        />
        <Toggle
          variant="secondary"
          size="md"
          pressed={tagged}
          onPressedChange={setTagged}
        >
          <Tag aria-hidden />
          Tagged
        </Toggle>
        <Toggle
          variant="secondary"
          size="md"
          pressed={visible}
          onPressedChange={setVisible}
        >
          <Eye aria-hidden />
          Visible
        </Toggle>
      </FilterToolbar>

      <FilterToolbar
        overflow="wrap"
        activeCount={activeCount}
        onClearAll={clearAll}
        trailing={<SortControl value={sort} onChange={setSort} />}
      >
        <FilterMenu
          label="Status"
          value={status}
          defaultValue="Any status"
          options={statusOptions}
          onChange={setStatus}
        />
        <FilterMenu
          label="Owner"
          value={owner}
          defaultValue="Anyone"
          options={ownerOptions}
          onChange={setOwner}
        />
        <FilterToolbarPicker
          label="Category"
          selected={categories}
          onSelectionChange={setCategories}
          query={categoryQuery}
          onQueryChange={setCategoryQuery}
          sections={[{ id: "categories", options: visibleCategories }]}
        />
        <Toggle
          variant="secondary"
          size="md"
          pressed={tagged}
          onPressedChange={setTagged}
        >
          Tagged
        </Toggle>
      </FilterToolbar>
    </div>
  );
}

function FilterMenu({
  label,
  value,
  defaultValue,
  icon,
  options,
  onChange,
}: {
  label: string;
  value: string;
  defaultValue: string;
  icon?: React.ReactNode;
  options: string[];
  onChange: (value: string) => void;
}) {
  const active = value !== defaultValue;

  return (
    <Menu>
      <MenuTrigger
        render={
          <FilterToolbarTrigger
            label={label}
            value={active ? value : undefined}
            icon={icon}
          />
        }
      />
      <MenuPopup>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}

function SortControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="tertiary"
            size="md"
            aria-label={`Sort: ${value}`}
            icon={<SortAscending />}
          />
        }
      />
      <MenuPopup align="end">
        {sortOptions.map((option) => (
          <MenuItem
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}
