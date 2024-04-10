import { Flex } from "@radix-ui/themes"
import { genUUID } from "electric-sql/util"
import { Electric } from "../generated/client"
import { useLocation } from "react-router-dom"
import { useElectricData } from "electric-query"
import { useElectric } from "../context"

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

export default function Index() {
  const { db } = useElectric()!
  const location = useLocation()
  const { events, subscriptions } = useElectricData(
    location.pathname + location.search
  )

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
              {sub.email}
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
