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
  MenuDivider,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  Toggle,
} from "@patchui/react";

const statusOptions = ["Active", "Paused"];
const ownerOptions = ["Ada Lovelace", "Alan Turing"];
const sortOptions = ["Recently updated", "Name", "Created date"];
const categoryOptions: FilterToolbarPickerOption[] = [
  { id: "design", value: "design", label: "Design", description: "8 items", icon: <SquaresFour /> },
  { id: "engineering", value: "engineering", label: "Engineering", description: "12 items", icon: <Folder /> },
  { id: "research", value: "research", label: "Research", description: "5 items", icon: <SquaresFour /> },
  { id: "operations", value: "operations", label: "Operations", description: "7 items", icon: <Folder /> },
];

export function FilterToolbarDemo() {
  const [status, setStatus] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
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
      Number(status != null) +
      Number(owner != null) +
      Number(categories.length > 0) +
      Number(tagged) +
      Number(visible),
    [status, owner, categories, tagged, visible],
  );

  const clearAll = () => {
    setStatus(null);
    setOwner(null);
    setCategories([]);
    setTagged(false);
    setVisible(false);
  };

  return (
    <div className="w-full py-2">
      <FilterToolbar
        activeCount={activeCount}
        onClearAll={clearAll}
        count={activeCount > 0 ? `${24 - activeCount * 3} results` : "24 results"}
        trailing={<SortControl value={sort} onChange={setSort} />}
      >
        <FilterMenu
          label="Status"
          value={status}
          icon={<Check />}
          options={statusOptions}
          onChange={setStatus}
        />
        <FilterMenu
          label="Owner"
          value={owner}
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
    </div>
  );
}

function FilterMenu({
  label,
  value,
  icon,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  icon?: React.ReactNode;
  options: string[];
  onChange: (value: string | null) => void;
}) {
  const active = value != null;

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
        {active && (
          <>
            <MenuDivider />
            <MenuItem onClick={() => onChange(null)}>Clear filter</MenuItem>
          </>
        )}
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
