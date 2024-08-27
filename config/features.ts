import { clientEnvVars } from "@/config/client"

// Basic feature flags for now
// But likely to stay as a separate global variable like this
export const featureFlags = {
  assistant: {
    enabled:
      clientEnvVars.NEXT_PUBLIC_DEBUG_MODE &&
      clientEnvVars.NEXT_PUBLIC_FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  },
}
