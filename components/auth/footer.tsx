import Link from "next/link"

export const Footer = () => {
  return (
    <div className="lg:mx[108px] flex w-full items-center justify-between py-6">
      <p className="text-xs text-gray-500">© 2024 Verida Vault</p>
      <Link href="/terms" className="text-xs text-gray-500">
        Terms & Conditions
      </Link>
    </div>
  )
}
