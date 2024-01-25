import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { organizationSwitcherAppearance } from "@/styles/organization-switcher-appearance"
import { userButtonAppearance } from "@/styles/user-button-appearance"

export const DashboardNavbar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm">
        {/* TODO: Mobile Dashboard Sidebar */}

        {/*  */}
        <div className="mx-auto flex w-full items-center justify-between gap-x-4 md:max-w-screen-2xl">
          <div className="hidden md:flex">
            <Logo />
          </div>
          <Button size="sm" className="h-auto rounded-sm px-2 py-1.5">
            <span className="hidden md:block">Create</span>
            <span className="md:hidden">
              <Icons.plus className="icon-sm" />
            </span>
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <ModeToggle />
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
            appearance={organizationSwitcherAppearance}
          />
          <UserButton afterSignOutUrl="/" appearance={userButtonAppearance} />
        </div>
      </nav>
      {/* A div with height equals to nav to push other components downwards. */}
      <div className="h-14" />
    </>
  )
}
