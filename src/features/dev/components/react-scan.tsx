import Script from "next/script"

export function ReactScan() {
  return <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
}
ReactScan.displayName = "ReactScan"
