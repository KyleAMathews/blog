import React from "react"
import typography from "../utils/typography"

const { rhythm } = typography

export default function Subscribe() {
  const [subscribeError, setSubscribeError] = React.useState()
  const [subscribeSuccess, setSubscribeSuccess] = React.useState()
  const [submitting, setSubmitting] = React.useState(false)
  return (
    <div>
      <p style={{ marginBottom: rhythm(0.25) }}>
        Subscribe to get updated on new posts!
      </p>

      <form
        action="/api/register"
        style={{ marginBottom: rhythm(1) }}
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.target
          const formData = Object.fromEntries(new FormData(form))
          setSubmitting(true)
          fetch(`/api/register`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: `POST`,
            body: JSON.stringify(formData),
          }).then(async (res) => {
            setSubmitting(false)
            if (!res.ok) {
              const body = await res.json()
              setSubscribeError(body.error)
            } else {
              setSubscribeError()
              setSubscribeSuccess(
                `Got your subscription request. Kyle will manually send an verification email soon.`
              )
              form.reset()
            }
          })
        }}
      >
        {subscribeError && (
          <p style={{ marginBottom: rhythm(0.5), color: `red` }}>
            {subscribeError}
          </p>
        )}
        {subscribeSuccess && (
          <p style={{ marginBottom: rhythm(0.5), color: `green` }}>
            {subscribeSuccess}
          </p>
        )}
        <input
          type="email"
          name="email"
          required
          style={{ marginRight: rhythm(0.25) }}
        />
        <button disabled={submitting} type="submit">
          Subscribe
        </button>
      </form>
    </div>
  )
}
