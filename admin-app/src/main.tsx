import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./error-page"
import { ElectricalProvider } from "./context"
import { electricSqlLoader } from "electric-query"
import { Electric } from "./generated/client"
import { ClerkProvider, SignIn } from "@clerk/clerk-react"
import AuthedLayout from "./authed-layout"

import Root from "./routes/root"
import Index from "./routes/index"

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/sign-in`,
        element: <SignIn />,
      },
      {
        element: <AuthedLayout />,
        children: [
          {
            index: true,
            element: <Index />,

            loader: async (props) => {
              const url = new URL(props.request.url)
              const key = url.pathname + url.search
              console.log({ props })
              console.time(`sync`)
              await electricSqlLoader<Electric>({
                key,
                shapes: ({ db }) => [
                  {
                    shape: db.events.sync(),
                    isReady: async () =>
                      !!(await db.raw({
                        sql: `select id from events limit 1`,
                      })),
                  },
                  {
                    shape: db.subscribers.sync(),
                    isReady: async () =>
                      !!(await db.raw({
                        sql: `select id from subscribers limit 1`,
                      })),
                  },
                ],
                queries: ({ db }) =>
                  Index.queries({
                    db,
                  }),
              })
              console.timeEnd(`sync`)

              return null
            },
          },
        ],
      },
    ],
  },
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(`Missing Publishable Key`)
}

async function render() {
  ReactDOM.createRoot(document.getElementById(`root`)!).render(
    <React.StrictMode>
      <Theme>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ElectricalProvider>
            <RouterProvider router={router} />
          </ElectricalProvider>
        </ClerkProvider>
      </Theme>
    </React.StrictMode>
  )
}

render()
