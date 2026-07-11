"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Eye,
  SortAscending,
  Tag,
  User,
} from "@phosphor-icons/react/dist/ssr";
import {
  FilterToolbar,
  FilterToolbarTrigger,
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

export function FilterToolbarDemo() {
  const [status, setStatus] = useState("Any status");
  const [owner, setOwner] = useState("Anyone");
  const [tagged, setTagged] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sort, setSort] = useState("Recently updated");

  const activeCount = useMemo(
    () =>
      Number(status !== "Any status") +
      Number(owner !== "Anyone") +
      Number(tagged) +
      Number(visible),
    [status, owner, tagged, visible],
  );

  const clearAll = () => {
    setStatus("Any status");
    setOwner("Anyone");
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
