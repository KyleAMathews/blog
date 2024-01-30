import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { v4 as uuidv4 } from "uuid"
const { isFakeEmail } = require("fakefilter")
import pg from "pg"
const { Client } = pg
const { WebClient } = require("@slack/web-api")

const options = {}
const web = new WebClient(process.env.SLACK_TOKEN, options)

const sendSlackMessage = async (message: string) => {
  return new Promise(async (resolve, reject) => {
    const channelId = process.env.SLACK_CHANNEL_ID
    console.log(`sending`, { message, channelId })
    try {
      const resp = await web.chat.postMessage({
        channel: channelId,
        text: message
      })
      console.log({resp})
      return resolve(true)
    } catch (error) {
      console.log(error)
      return resolve(true)
    }
  })
}

interface SubscribeBody {
  email: string
}

export default async function handler(
  req: GatsbyFunctionRequest<SubscribeBody>,
  res: GatsbyFunctionResponse
) {
  const email = req.body.email
  if (isFakeEmail(email)) {
    return res
      .status(400)
      .send({ error: `email domain looks fake: "${email}"` })
  } else {
    const client = new Client({ connectionString: process.env.DATABASE_URL })
    await client.connect()

    const subscriptionInfo = await client.query(
      `SELECT state
    from subscribers where email = $1`,
      [email]
    )

    console.log(subscriptionInfo.rows)
    if (subscriptionInfo.rows[0]?.state === `needs_verification`) {
      return res.status(400).send({
        error: `You've already subscribed and are awaiting verification. Hold tight! If this seems wrong, email Kyle @ mathews.kyle@gmail.com`,
      })
    }
    if (subscriptionInfo.rows[0]?.state === `verified`) {
      return res.send({ ok: true })
    }

    try {
      await client.query("BEGIN")

      // Upsert into the subscribers table.
      // This lets a user re-subscribe.
      const upsertSubscriberText = `
      INSERT INTO subscribers(email, state, last_updated) 
      VALUES($1, $2, $3)
      ON CONFLICT (email) 
      DO UPDATE SET 
        state = EXCLUDED.state, 
        last_updated = EXCLUDED.last_updated`
      const upsertSubscriberValues = [email, "needs_verification", new Date()]
      await client.query(upsertSubscriberText, upsertSubscriberValues)

      // Insert into the events table
      const insertEventText =
        "INSERT INTO events(id, event_type, actor, target_email, attributes, created_at) VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5)"
      const insertEventValues = [
        "subscribed",
        "system",
        email,
        { email },
        new Date(),
      ]
      await client.query(insertEventText, insertEventValues)

      await client.query("COMMIT")
    } catch (e) {
      await client.query("ROLLBACK")
      throw e
    }

    sendSlackMessage(`new subscriber that needs verification! ${email}`)

    res.send({ ok: true })
  }
}
