import { z } from "zod"

import { UserAiProfileParamsSchema } from "@/features/user-ai-profile/schemas"

export type UserAiProfileParams = z.infer<typeof UserAiProfileParamsSchema>
