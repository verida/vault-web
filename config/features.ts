import { commonConfig } from "@/config/common"

// Basic feature flags for now
// But likely to stay as a separate global variable like this
export const featureFlags = {
  assistant: {
    enabled:
      commonConfig.DEBUG_MODE && commonConfig.FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  },
}
