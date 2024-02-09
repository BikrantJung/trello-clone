import { DashboardNavbar } from "./_components/dashboard-navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      {children}
    </div>
  )
}

export default DashboardLayout
