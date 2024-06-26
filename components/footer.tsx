import Link from "next/link";

export const Footer = () => {
  return (
    <div className="lg:mx[108px] w-full bg-gray-50 p-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs text-gray-500">© 2024 Verida Vault</p>
          <Link href="/terms" className="text-xs text-gray-500">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};
