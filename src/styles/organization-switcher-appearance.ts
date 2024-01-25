export const organizationSwitcherAppearance = {
  elements: {
    rootBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "red",
    },
    organizationPreviewTextContainer: {
      color: "hsl(var(--foreground))",
      opacity: 1,
    },
    organizationSwitcherTriggerIcon: {
      color: "hsl(var(--foreground))",
      opacity: 0.3,
    },
    organizationSwitcherPopoverCard: {
      background: "hsl(var(--primary-foreground))",
    },
    organizationSwitcherPopoverActionButtonText: {
      color: "hsl(var(--muted-foreground))",
    },
    organizationSwitcherPopoverActionButton: {
      "&:hover": {
        backgroundColor: "hsl(var(--muted))",
      },
      "&:first-child": {},
    },
    organizationSwitcherPopoverActionButtonIcon: {
      color: "hsl(var(--muted-foreground))",
    },
    organizationSwitcherPopoverFooter: {
      display: "none",
    },
    organizationPreviewSecondaryIdentifier: {
      color: "hsl(var(--foreground))",
    },
  },
}
