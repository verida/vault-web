import { Discord } from "@/components/icons/discord";
import { Twitter } from "@/components/icons/twitter";
import { Logo } from "@/components/logo";

import { Linkedin } from "../icons/linkedin";
import { Medium } from "../icons/medium";
import { Telegram } from "../icons/telegram";
import { Youtube } from "../icons/youtube";

export const Navbar = () => {
  return (
    <div className="lg:mx[108px] z-20 flex w-full items-center justify-between bg-background py-4 md:py-6">
      <Logo />

      <div className="flex items-center space-x-3">
        <Twitter className="h-5 w-5" />
        <Discord className="h-5 w-5" />
        <Telegram className="h-5 w-5" />
        <Medium className="h-5 w-5" />
        <Youtube className="h-5 w-5" />
        <Linkedin className="h-5 w-5" />
      </div>
    </div>
  );
};
