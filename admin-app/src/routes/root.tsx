import { Outlet, NavLink, Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Flex, Box, Heading } from "@radix-ui/themes"
import { ConnectivityIcon } from "../components/connectivity-icon"

export default function Root() {
  return (
    <Flex direction="column" style={{ margin: `0 auto`, minHeight: `100%` }}>
      <Flex asChild align="center" p="3" justify="between">
        <header>
          <Flex align="center" gap="3">
            <ConnectivityIcon />
            <Heading size="2" weight="bold" trim="normal">
              <NavLink to="/" style={{ textDecoration: `none` }}>
                Primal Pulse
              </NavLink>
            </Heading>
          </Flex>
          <Flex>
            <SignedIn>
              <UserButton afterSignOutUrl="/sign-in" />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">Sign In</Link>
            </SignedOut>
          </Flex>
        </header>
      </Flex>
      <Box asChild p="3" width="100%">
        <main>
          <Outlet />
        </main>
      </Box>
    </Flex>
  )
}
