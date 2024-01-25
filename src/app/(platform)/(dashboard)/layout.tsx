import { DashboardNavbar } from "./_components/dashboard-navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  )
}

export default DashboardLayout
