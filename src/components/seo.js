import React from "react"
import Helmet from "react-helmet"

export default function SEO({
  title,
  description,
  pathname,
  siteMetadata,
  type = "website",
  image,
  datePublished,
  tags = [],
  structuredData,
}) {
  const url = new URL(pathname, siteMetadata.siteUrl).toString()
  const imageUrl = image
    ? new URL(image, siteMetadata.siteUrl).toString()
    : undefined
  const isBlogPost = type === "article"

  const blogPostingData = isBlogPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        datePublished,
        author: {
          "@type": "Person",
          "@id": `${siteMetadata.siteUrl}/about/#person`,
          name: siteMetadata.author,
          url: `${siteMetadata.siteUrl}/about/`,
        },
        publisher: {
          "@type": "Organization",
          name: siteMetadata.title,
          url: siteMetadata.siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteMetadata.siteUrl}/logo.png`,
          },
        },
        ...(imageUrl && { image: imageUrl }),
        ...(tags.length > 0 && { keywords: tags }),
      }
    : undefined

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {(structuredData || blogPostingData) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData || blogPostingData)}
        </script>
      )}
    </Helmet>
  )
}
