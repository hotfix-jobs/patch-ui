# Contrast

The automated readability contract for Patch UI’s text, surfaces, primary action, and semantic status colors.

Patch UI assigns a WCAG target to every readable token role and filled-label pair. The repository checks those exact relationships in both themes and fails CI when a token change breaks the contract.

## Contract

* Primary `ink` text clears AAA on the application canvas, layers, and neutral fills.
* Secondary `ink-muted` text clears AA on its supported surfaces.
* Placeholder and disabled tiers clear the large-text or nonessential 3:1 target on base.
* Primary Button labels clear AAA, while semantic status labels clear AA on their paired fills.

Run the same check locally after changing readable color tokens:

## Current matrix

The matrix reads active CSS variables from the page, so switching between light and dark mode updates the displayed values and ratios immediately.

## Choosing a text tier

* Use `ink` for headings, body copy, and information people must read precisely.
* Use `ink-muted` for secondary labels, metadata, and the default icon tone.
* Use `ink-subtle` for placeholders or missing-value copy on the base canvas.
* Use `ink-tertiary` for disabled hints and nonessential footnotes, not required instructions.

On lifted or filled surfaces, prefer `ink-muted` unless the intended token pair is explicitly covered by the contract.

## After customizing tokens

1. Change primary, ink, base, layer, or fill values in `patch-ui-tokens.css`.
2. Run the contrast command.
3. Review the affected components in both light and dark mode.
4. Test any additional consumer-defined combinations not represented by the shipped contract.

The checker parses the repository token file. It does not evaluate arbitrary opacity, gradients, imagery, browser extensions, or downstream CSS overrides.
