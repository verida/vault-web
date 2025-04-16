import { createThirdwebClient } from "thirdweb"

import { commonConfig } from "@/config/common"

export const client = createThirdwebClient({
  clientId: commonConfig.THIRD_WEB_CLIENT_ID,
})
