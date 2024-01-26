import { OrganizationProfile } from "@clerk/nextjs"

function OrganizationSettingsPage() {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              boxShadow: "none",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
            },
          },
        }}
        // appearance={{
        //   elements: {
        //     card: {
        //       backgroundColor: "hsl(var(--primary-foreground))",
        //       opacity: 1,
        //     },
        //     organizationPreview: {
        //       color: "hsl(var(--foreground))",
        //     },
        //     navbarButton: {
        //       color: "hsl(var(--foreground))",
        //       "&:hover": {
        //         backgroundColor: "hsl(var(--muted))",
        //       },
        //       "&.cl-active": {
        //         backgroundColor: "hsl(var(--muted))",
        //       },
        //     },
        //     headerTitle: {
        //       color: "hsl(var(--foreground))",
        //     },
        //     headerSubtitle: {
        //       color: "hsl(var(--muted-foreground))",
        //     },
        //     tabButton: {
        //       color: "hsl(var(--foreground))",
        //       "&:not([aria-selected=true])": {
        //         color: "hsl(var(--muted-foreground))",
        //       },
        //     },
        //     tableHead: {
        //       color: "hsl(var(--foreground))",
        //     },
        //     userPreviewMainIdentifier: {
        //       color: "hsl(var(--foreground))",
        //     },
        //     userPreviewSecondaryIdentifier: {
        //       color: "hsl(var(--muted-foreground))",
        //     },
        //     table: {},
        //     organizationSwitcherPopoverCard: {
        //       background: "hsl(var(--primary-foreground))",
        //     },
        //     organizationSwitcherPopoverActionButtonText: {
        //       color: "hsl(var(--muted-foreground))",
        //     },
        //     organizationSwitcherPopoverActionButton: {
        //       "&:hover": {
        //         backgroundColor: "hsl(var(--muted))",
        //       },
        //       "&:first-child": {},
        //     },
        //     organizationSwitcherPopoverActionButtonIcon: {
        //       color: "hsl(var(--muted-foreground))",
        //     },
        //     organizationSwitcherPopoverFooter: {
        //       display: "none",
        //     },
        //     organizationPreviewSecondaryIdentifier: {
        //       color: "hsl(var(--foreground))",
        //     },
        //   },
        // }}
      />
    </div>
  )
}
export default OrganizationSettingsPage
