'use client'

import Link from "next/link";

import { ArrowLeft } from "@/components/icons/arrow-left";
import { CredentialItem } from "@/components/credential/credential-item";

const MarketingPage = () => {
  return (
    <div className="flex-col">
      <Link className="flex gap-5 text-sm font-medium items-center mb-4 h-16" href="/data"><ArrowLeft /> Back to all Data</Link>

      <h1 className="text-xl font-medium mb-6">Credentials</h1>

      <div className="flex flex-col gap-2" >
        <div className="flex p-4 flex-row items-center w-full">
          <p className="text-sm text-gray-500 w-1/4">Name</p>
          <p className="text-sm text-gray-500 w-1/4">Source</p>
          <p className="text-sm text-gray-500 w-1/4">Date</p>
          <p className="text-sm text-gray-500 w-1/4">Credential Status</p>
        </div>
        <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
        <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
        <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
        <CredentialItem logo='/logos/nsw-gov.png' href="#" title="Forklift Driver Licence" date={new Date().getTime()} source="Government of New South Wales" status="valid" />
      </div>
    </div>

  );
};

export default MarketingPage;
