import React from "react"
import { redirect } from "next/navigation"
import { auth, SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  const { userId, orgId } = auth()
  if (userId && orgId) redirect(`/organization/${orgId}`)
  return <SignUp />
}

export default SignUpPage
