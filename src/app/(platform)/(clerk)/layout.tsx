import React from "react"

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}

export default AuthPageLayout
