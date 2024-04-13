import { useState, useEffect } from "react"
import { makeElectricContext } from "electric-sql/react"
import { Electric, schema } from "../src/generated/client"
import { useAuth, useUser } from "@clerk/clerk-react"
import { initElectric, setLoggedOut } from "electric-query"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

const electricUrl =
  typeof import.meta.env.VITE_ELECTRIC_URL === `undefined`
    ? `ws://localhost:5133`
    : `wss://${import.meta.env.VITE_ELECTRIC_URL}`

export function ElectricalProvider({ children }) {
  const { getToken, isSignedIn } = useAuth()
  const { user } = useUser()
  const [db, setDb] = useState<Electric>()

  useEffect(() => {
    // declare the data fetching function
    const setupElectric = async () => {
      const token = await getToken()
      console.log({ token, user })
      if (token && user) {
        const config = {
          appName: `bricolage-admin-app`,
          schema,
          sqliteWasmPath: sqliteWasm,
          config: {
            debug: true, //DEBUG_MODE,
            url: electricUrl,
          },
        }
        console.log({ config })
        const electric = await initElectric(config)
        setDb(electric)
      }
    }

    if (isSignedIn === false) {
      setLoggedOut()
    }
    if (isSignedIn) {
      // call the function
      setupElectric()
        // make sure to catch any error
        .catch(console.error)
    }
  }, [getToken, isSignedIn, user])

  return <ElectricProvider db={db}>{children}</ElectricProvider>
}
