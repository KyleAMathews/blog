import * as React from "react"
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    console.log({ userId, isLoaded })
    if (isLoaded && !userId) {
      navigate(`/sign-in`)
    }
  }, [userId, isLoaded, navigate])

  if (!userId) return null

  return <Outlet />
}
