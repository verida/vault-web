import { Logo } from '@/components/logo'

import { Twitter } from '@/components/icons/twitter'
import { Discord } from '@/components/icons/discord'
import { Telegram } from '../icons/telegram'
import { Medium } from '../icons/medium'
import { Youtube } from '../icons/youtube'
import { Linkedin } from '../icons/linkedin'

export const Navbar = () => {
  return (
    <div className="w-full py-4 md:py-6 lg:mx[108px] bg-white flex items-center z-20 justify-between">
      <Logo />

      <div className="flex items-center space-x-3">
        <Twitter className="w-5 h-5" />
        <Discord className="w-5 h-5" />
        <Telegram className="w-5 h-5" />
        <Medium className="w-5 h-5" />
        <Youtube className="w-5 h-5" />
        <Linkedin className="w-5 h-5" />
      </div>
    </div>
  )
}
