import { clientConfig } from "@/config/client"

// Basic feature flags for now
// But likely to stay as a separate global variable like this
export const featureFlags = {
  assistant: {
    enabled:
      clientConfig.DEBUG_MODE && clientConfig.FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  },
}
