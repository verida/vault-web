import Link from "next/link";
import localFont from "next/font/local";
import { FolderArchive, Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Category } from "@/components/category/category";
import { FolderCredentials } from "@/components/icons/folder-credentials";
import { FolderTickets } from "@/components/icons/folder-tickets";
import { FolderQualifications } from "@/components/icons/folder-qualifications";
import { FolderNft } from "@/components/icons/folder-nft";
import { FolderLoyalty } from "@/components/icons/folder-loyalty";
import { FolderContacts } from "@/components/icons/folder-contacts";
import { FolderHealth } from "@/components/icons/folder-health";
import { FolderIdentity } from "@/components/icons/folder-identity";
import { FolderSocial } from "@/components/icons/folder-social";

const MarketingPage = () => {
  return (
    <div className="flex-col pt-10">
     <h1 className="text-2xl font-medium mb-6">Categories</h1>
     <div className="grid grid-cols-4 gap-6">
     <Category icon={<FolderCredentials/>} href="/data/credentials" title="Credentials" description="0 items" />
      <Category icon={<FolderTickets/>} href="/data/tickets" title="Tickets" description="0 items" />
      <Category icon={<FolderQualifications/>} href="/data/qualifications" title="Qualifications" description="0 items" />
      <Category icon={<FolderNft/>} href="/data/nfts" title="NFTs" description="0 items" />

      <Category icon={<FolderLoyalty/>} href="/data/loyalty" title="Loyalty" description="0 items" />
      <Category icon={<FolderContacts/>} href="/data/contacts" title="Contacts" description="0 items" />
      <Category icon={<FolderHealth/>} href="/data/health" title="Health" description="0 items" />
      <Category icon={<FolderIdentity/>} href="/data/identity" title="Identity" description="0 items" />

      <Category icon={<FolderSocial/>} href="/data/social" title="Social" description="0 items" />
    </div>
    </div>
    
  );
};

export default MarketingPage;
