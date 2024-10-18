/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "blog",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
      providers: {
        cloudflare: "5.41.0",
        aws: {
          profile: `kyle`,
          version: "6.56.1",
        },
      },
    }
  },
  async run() {
    new sst.aws.StaticSite(`blog`, {
      domain: {
        name: `bricolage.io`,
        redirects: [`www.bricolage.io`],
        dns: sst.cloudflare.dns(),
      },
      errorPage: "404.html",
      dev: {
        command: `gatsby develop`,
        title: `gatsby develop`,
        autostart: true,
      },
      build: {
        command: "gatsby build",
        output: "public",
      },
    })
  },
})
