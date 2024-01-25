import React from "react"
import { redirect } from "next/navigation"
import { auth, SignIn } from "@clerk/nextjs"

const SignInPage = async () => {
  const { userId, orgId } = auth()
  if (userId && orgId) redirect(`/organization/${orgId}`)
  return <SignIn />
}

export default SignInPage
