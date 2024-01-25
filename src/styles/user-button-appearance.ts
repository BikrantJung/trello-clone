export const userButtonAppearance = {
  elements: {
    rootBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userButtonPopoverCard: {
      background: "hsl(var(--primary-foreground))",
    },
    userButtonPopoverActionButtonText: {
      color: "hsl(var(--muted-foreground))",
    },
    userButtonPopoverActionButton: {
      "&:hover": {
        backgroundColor: "hsl(var(--muted))",
      },
      "&:first-child": {},
    },
    userButtonPopoverActionButtonIcon: {
      color: "hsl(var(--muted-foreground))",
    },
    userButtonPopoverFooter: {
      display: "none",
    },
    userPreviewMainIdentifier: {
      color: "hsl(var(--foreground))",
    },
    userPreviewSecondaryIdentifier: {
      color: "hsl(var(--foreground))",
    },
    avatarBox: {
      height: 30,
      width: 30,
    },
  },
}
