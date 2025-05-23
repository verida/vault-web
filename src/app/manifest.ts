import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verida Vault",
    short_name: "Verida Vault",
    description:
      "Manage your crypto, encrypted personal data and zero knowledge credentials with the Verida Vault App.",
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: "favicon.ico",
        type: "image/png",
        sizes: "64x64",
      },
      {
        src: "logo64.png",
        type: "image/png",
        sizes: "64x64",
      },
      {
        src: "logo128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        src: "logo256.png",
        type: "image/png",
        sizes: "256x256",
      },
      {
        src: "logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  }
}
