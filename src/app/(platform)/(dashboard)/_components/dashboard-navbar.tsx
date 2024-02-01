import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { CreateBoardButton } from "@/components/boards/create-board.button"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { organizationSwitcherAppearance } from "@/styles/organization-switcher-appearance"
import { userButtonAppearance } from "@/styles/user-button-appearance"

import MobileSidebar from "./mobile-sidebar"

export const DashboardNavbar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-background px-4 shadow-sm">
        {/* TODO: Mobile Dashboard Sidebar */}
        <MobileSidebar />
        {/*  */}
        <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
          <div className="hidden md:flex">
            <Logo />
          </div>
          <CreateBoardButton />
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
