# Search Suggestions

A responsive multi-field search control with grouped suggestions and coordinated keyboard navigation.

Use Search Suggestions when people search across two or three related dimensions, such as content and workspace. Use Search Input for a single simple query.

## Installation

```bash
npx shadcn add @patchui/search-suggestions
```

The copied source is available in the [registry JSON](https://ui.hotfix.jobs/r/search-suggestions.json). The canonical implementation lives in [packages/react/src/blocks/search-suggestions/index.tsx](https://github.com/hotfix-jobs/patch-ui/blob/main/packages/react/src/blocks/search-suggestions/index.tsx).

## Usage

```tsx
<SearchSuggestions
  fields={fields}
  activeField={activeField}
  onActiveFieldChange={setActiveField}
  onFieldValueChange={updateField}
  onSuggestionSelect={selectSuggestion}
  onSubmit={submitSearch}
/>
```

The application owns field values, suggestion data, filtering, and submission. Search Suggestions coordinates focus, one shared results surface, selection, and responsive presentation.

## Data model

```text
SearchSuggestionsField
└── SearchSuggestionSection
    └── SearchSuggestion
```

Each field supplies an ID, visible label, current value, and suggestion sections. Suggestions need a stable ID, submitted value, and visible label, with optional description, icon, suffix, and disabled state.

Set `onAction`, `actionLabel`, and `actionIcon` to add a trailing action that does not select the suggestion. Running the action closes the suggestion surface. A separate `onRemove` control leaves the surface open so people can continue managing results.

## Loading and empty states

Set `loading` on the active field while its request is pending. Existing suggestions remain visible during a background refresh; the centered loading state appears only when no results are available yet.

Set `emptyContent` per field so an empty result explains the active search dimension. The block does not debounce requests or filter data.

## Responsive behavior

Desktop anchors one suggestion Popover to the complete search control. Mobile uses the shared centered Popover treatment and places the active field input inside the surface. Keep field counts small so labels and current values remain understandable in both layouts.

## API reference

| Prop                              | Type                                      | Default  | Description                                                                               |
| --------------------------------- | ----------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| fields                            | SearchSuggestionsField\[]                 | -        | Provides controlled values, presentation, state, and grouped suggestions for every field. |
| activeField / onActiveFieldChange | string / (fieldId: string) => void        | -        | Controls which field owns the shared results surface.                                     |
| open / onOpenChange               | boolean / (open: boolean) => void         | -        | Controls suggestion-surface visibility when application coordination is needed.           |
| onFieldValueChange                | (fieldId, value) => void                  | -        | Updates a field as someone types or clears it.                                            |
| onSuggestionSelect                | (fieldId, suggestion) => void             | -        | Handles a selected result without assuming whether selection submits.                     |
| onSubmit                          | (values: Record\<string, string>) => void | -        | Receives the current value of every field.                                                |
| submitLabel                       | string                                    | "Search" | Names the submit button.                                                                  |

The consumer decides whether choosing a suggestion submits immediately or only updates its field.

## Keyboard behavior

* Focusing or activating a field opens its suggestions.
* Up and Down move through enabled suggestions.
* Enter selects the active suggestion or submits current field values.
* Escape closes the suggestion surface.

## Accessibility

* Give each field a concise label that remains meaningful when announced independently.
* Use descriptions or suffixes to explain where suggestions lead.
* Give every trailing action and remove control a concise accessible label.
* Keep disabled suggestions rare and make their unavailable state understandable from context.
* Preserve useful empty text instead of presenting a silent blank surface.
