const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto w-full p-4 md:max-w-screen-2xl">
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:block">{/* Sidebar */}</div>

        {children}
      </div>
    </main>
  )
}
export default OrganizationLayout
