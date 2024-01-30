import { useState, useEffect } from "react"
import { Flex, Button, Heading, Text, Box, Em, Strong } from "@radix-ui/themes"
import { useLiveQuery } from "electric-sql/react"
import { genUUID } from "electric-sql/util"
import { Electric } from "../generated/client"
import { useLocation } from "react-router-dom"
import { useElectricData } from "electric-query"
import { Line } from "@ant-design/charts"
import { useElectric } from "../context"
import { useUser } from "@clerk/clerk-react"

const lambdaFunction = import.meta.env.PROD
  ? `https://7dr5i4gfxg.execute-api.us-east-1.amazonaws.com`
  : `https://owqae9qlal.execute-api.us-east-1.amazonaws.com`

const queries = ({ db }: { db: Electric[`db`] }) => {
  return {
    events: db.events.liveMany({
      orderBy: {
        created_at: `desc`,
      },
      take: 20,
    }),
    subscriptions: db.subscribers.liveMany({
      orderBy: {
        last_updated: `desc`,
      },
    }),
  }
}

Index.queries = queries

console.log({ useElectric })
export default function Index() {
  const { db } = useElectric()!
  const location = useLocation()
  const { events, subscriptions } = useElectricData(
    location.pathname + location.search
  )

  console.log({ events, subscriptions })

  return (
    <>
      <Flex direction="column" justify="between">
        <h2>Events</h2>
        {events.map((event) => {
          return (
            <div>
              {event.event_type} {`=>`} {event.target_email} by "{event.actor}"
              @ {JSON.stringify(event.created_at)}
            </div>
          )
        })}
        <h2>Subscribors</h2>
        {subscriptions.map((sub) => {
          return (
            <div>
              {sub.email} | {sub.state}
              {` `}
              {sub.state === `needs_verification` && (
                <button
                  onClick={async () => {
                    Promise.all([
                      db.events.create({
                        data: {
                          id: genUUID(),
                          actor: `mathews.kyle@gmail.com`,
                          created_at: new Date(),
                          event_type: `verified`,
                          target_email: sub.email,
                        },
                      }),
                      db.subscribers.update({
                        data: {
                          state: `verified`,
                          last_updated: new Date(),
                        },
                        where: {
                          email: sub.email,
                        },
                      }),
                    ])
                  }}
                >
                  Verify
                </button>
              )}
            </div>
          )
        })}
      </Flex>
    </>
  )
}
