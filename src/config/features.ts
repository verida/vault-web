import { commonConfig } from "@/config/common"

// Basic feature flags for now
// But likely to stay as a separate global variable like this
export const featureFlags = {
  assistant: {
    enabled: commonConfig.FEATURE_FLAG_AI_ASSISTANT_ENABLED,
  },
  dataConnections: {
    enabled: commonConfig.FEATURE_FLAG_DATA_CONNECTIONS_ENABLED,
    logs: {
      enabled: commonConfig.FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED,
    },
  },
}
