"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Folder,
  Globe,
  MagnifyingGlass,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import {
  SearchSuggestions,
  type SearchSuggestion,
  type SearchSuggestionsField,
} from "@patchui/react/blocks/search-suggestions";

const contentSuggestions: SearchSuggestion[] = [
  {
    id: "project-settings",
    value: "Project settings",
    label: "Project settings",
    description: "Configuration and access",
    icon: <Folder />,
    suffix: "Project",
  },
  {
    id: "team-members",
    value: "Team members",
    label: "Team members",
    description: "People in your workspace",
    icon: <Users />,
    suffix: "People",
  },
  {
    id: "release-notes",
    value: "Release notes",
    label: "Release notes",
    description: "Recent product changes",
    icon: <FileText />,
    suffix: "Document",
  },
];

const workspaceSuggestions: SearchSuggestion[] = [
  {
    id: "all-workspaces",
    value: "All workspaces",
    label: "All workspaces",
    description: "Search everywhere you have access",
    icon: <Globe />,
  },
  {
    id: "product",
    value: "Product",
    label: "Product",
    description: "12 projects",
    icon: <Folder />,
  },
  {
    id: "operations",
    value: "Operations",
    label: "Operations",
    description: "8 projects",
    icon: <Folder />,
  },
];

export function SearchSuggestionsDemo() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All workspaces");
  const [activeField, setActiveField] = useState("query");

  const fields = useMemo<SearchSuggestionsField[]>(
    () => [
      {
        id: "query",
        label: "Search",
        placeholder: "Search projects, people, or files",
        value: query,
        icon: <MagnifyingGlass />,
        sections: [
          {
            id: "recent",
            label: query ? "Suggestions" : "Recent",
            suggestions: contentSuggestions.filter((suggestion) =>
              suggestion.value.toLowerCase().includes(query.toLowerCase()),
            ),
          },
        ],
        emptyContent: "No matching content.",
      },
      {
        id: "scope",
        label: "Scope",
        placeholder: "Choose a workspace",
        value: scope,
        icon: <Globe />,
        sections: [
          {
            id: "workspaces",
            label: "Workspaces",
            suggestions: workspaceSuggestions.filter((suggestion) =>
              suggestion.value.toLowerCase().includes(scope.toLowerCase()),
            ),
          },
        ],
        emptyContent: "No matching workspaces.",
      },
    ],
    [query, scope],
  );

  return (
    <div className="mx-auto w-full max-w-3xl py-8">
      <SearchSuggestions
        fields={fields}
        activeField={activeField}
        onActiveFieldChange={setActiveField}
        onFieldValueChange={(fieldId, value) => {
          if (fieldId === "query") setQuery(value);
          if (fieldId === "scope") setScope(value);
        }}
        onSuggestionSelect={(fieldId, suggestion) => {
          if (fieldId === "query") setQuery(suggestion.value);
          if (fieldId === "scope") setScope(suggestion.value);
        }}
        onSubmit={() => {}}
      />
    </div>
  );
}
